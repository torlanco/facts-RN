export namespace IShopper {

    export interface IShopperData {
        id?: string;
        outlet?: string;
        startDate?: string;
        endDate?: string;
        pathThumb?: string;
        path?: string;
        count?: number,
        pages?: string
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        shoppers: IShopperData[] | undefined;
    }
    
    export interface DispatchFromProps {
        fetchShoppers(startRange?: string, endRange?: string, outletName?: string): Function;
    }

}
  