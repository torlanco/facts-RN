import EventEmitter from 'events';

export interface IEvent {
  listener: string;
  name: string;
  wildcard?: string;
  args: any[];
}

/**
 * Extends the [NodeJS EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) to add listeners
 * synchronously (using Promises).
 *
 * @example Promise
 * ```typescript
 * GlobalEvents.on("test", (data: IEvent) => { ... });
 * ```
 *
 * @example Async/Await
 * ```typescript
 * async function asyncCall() {
 *   const data: IEvent = await GlobalEvents.on("test");
 *   ...
 * }
 * ```
 * <br>
 * The convention is to use colons to namespace the events and also provide a way to listen to wildcard events.
 *
 * @example Listen to every event
 * ```typescript
 * GlobalEvents.addListener("*", ({ name, wildcard, args }) => { ... });
 * ```
 * @example Listen to every change event in the Config
 * ```typescript
 * GlobalEvents.addListener("Config:change:*", ({ name, wildcard, args: [key, value] }) => { ... });
 * ```
 */
export class PromisifiedEventEmitter extends EventEmitter {
  /**
   * Adds a one-time listener function for the event named eventName.
   * The next time eventName is triggered, this listener is removed and then invoked.
   */
  public onceSync(eventName: string | symbol): Promise<IEvent> {
    return new Promise<IEvent>((resolve: (...args: any[]) => void) => {
      super.once(eventName, resolve);
    });
  }

  /**
   * Emit an array of events.
   */
  public emitMultiple(events: IEvent[]): boolean {
    events.forEach(e => super.emit(e.listener, e));
    return true;
  }

  /**
   * Helper to parse the event and build the wildcard events implementing the IEvent interface.
   *
   * @param event The Original event name.
   * @param source If sending a global event, specify the source for namespace purposes.
   */
  protected eventsBuilder(
    event: string,
    source?: string,
    ...args: any[]
  ): IEvent[] {
    const events: Array<string> = event.split(/\:/);
    args = args.length === 1 ? args[0] : args;

    if (source) {
      events.unshift(source);
      event = events.join(':');
    }

    const _events: Array<string> = Array.from(events);
    const globalEvents: Array<string> = [event];
    const result: IEvent[] = [];

    while (_events.pop()) {
      const e: Array<string> = Array.from(_events);
      e.push('*');
      globalEvents.push(e.join(':'));
    }

    for (const globalEvent of globalEvents) {
      const wildcards: number = +!!globalEvent.match(/\:\*/g);
      let len: number = globalEvent.replace(/\*/, '').split(':').length - 1;

      if (wildcards > 0) {
        result.push({
          listener: globalEvent,
          name: event,
          wildcard: events.slice(len).join(':'),
          args: args
        });
      } else if (globalEvent !== '*') {
        result.push({ listener: globalEvent, name: event, args: args });
      }
    }

    result.push({ listener: '*', name: event, wildcard: event, args: args });

    return result;
  }
}

/**
 * Global Event Emitter.
 */
export class GlobalEmitter extends PromisifiedEventEmitter {
  public emit(event: string, ...args: any[]): boolean {
    const events: IEvent[] = super.eventsBuilder(event, undefined, ...args);
    return super.emitMultiple(events);
  }
}

const globalEventsInstance = new GlobalEmitter();
/**
 * Global Event Emitter instance
 */
export { globalEventsInstance as GlobalEvents };

/**
 * Event Emitter that will emit Global events (use the Class Name as namespace).
 */
export class Emitter extends PromisifiedEventEmitter {
  public emit(event: string, ...args: any[]): boolean {
    const events: IEvent[] = super.eventsBuilder(event, undefined, ...args);
    const globalEvents: IEvent[] = super.eventsBuilder(
      event,
      this.constructor.name,
      ...args
    );

    globalEventsInstance.emitMultiple(globalEvents);
    return super.emitMultiple(events);
  }

  protected emitChange(key: string, value: any) {
    this.emit(`change:${key}`, value);
    this.emit(`change`, key, value);
  }
}
