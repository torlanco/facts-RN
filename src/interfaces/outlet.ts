import { IShopper } from '@interfaces/shopper';

export namespace IOutlet {

    export interface IOutletData {
    objectId?: string;
    name?: string;
    imageUrl?: string;
    category?: string;
    date?: string;
    shoppers?: IShopper.IShopperData[];
    isNew?: boolean;
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
