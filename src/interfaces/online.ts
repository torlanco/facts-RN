import { Action } from 'redux';

export namespace IOnline {
  export interface StateToProps {
    isOnline: boolean;
  }

  export interface DispatchFromProps {
    offline(): Action;
    online(): Action;
  }
}
