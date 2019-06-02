export namespace IOutlets {

  export interface IOutlet {
    objectId?: string;
    name?: string;
  }

  export interface StateToProps {
    error: string | boolean;
    loading: boolean;
    outlets: IOutlet[] | undefined;
  }
  export interface DispatchFromProps {
    fetchOutlets(): void;
  }
}
