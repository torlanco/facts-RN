import { RefObject } from "react";

export namespace IOutlet {

  export interface IOutletData {
    outlet?: string,
    shopperCount?: number,
    channelName?: string,
    tag?: string,
    outletImage?: string,
    earliestStartDate?: string,
    latestEndDate?: string,
  }

  export interface IChannelProps {
    listRef: RefObject<any>;
    channels: string[];
    selectedTab: string;
    onChannelSelect: (buttonText: string) => void;
  }
  
  export interface StateToProps {
    error?: string | boolean;
    loading?: boolean;
    outlets?: IOutletData[] | undefined;
    channels?: string[] | undefined;
    outletNames?: string[] | undefined;
  }
  export interface DispatchFromProps {
    fetchOutlets(): Function;
  }
}
