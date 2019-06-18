export namespace IOutlet {

  export interface IOutletData {
    outlet?: string,
    shopperCount?: number,
    channelName?: string,
    tag?: string,
    outletImage?: string,
    latestStartDate?: string,
    latestEndDate?: string,
  }

  export interface StateToProps {
    error: string | boolean;
    loading: boolean;
    outlets: IOutletData[] | undefined;
  }
  export interface DispatchFromProps {
    fetchOutlets(): Function;
  }
}
