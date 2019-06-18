export namespace IShopper {

    export interface IShopperData {
        id?: string;
        outlet?: string;
        startDate?: string;
        endDate?: string;
        pathThumb?: number;
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
        fetchShoppers(): Function;
    }

}
  