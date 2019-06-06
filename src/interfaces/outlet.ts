export namespace IOutlet {

  export interface IOutletData {
    objectId?: string;
    name?: string;
  }

  export interface StateToProps {
    error: string | boolean;
    loading: boolean;
    outlets: IOutletData[] | undefined;
  }
  export interface DispatchFromProps {
    fetchOutlets(): void;
  }
}
