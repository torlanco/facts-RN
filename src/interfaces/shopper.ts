export namespace IShopper {

    export interface IShopperData {
        objectId?: string;
        date: string;
        features: number;
        itemUrl: string;
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        econoList: IShopperData[] | undefined;
    }
    
    export interface DispatchFromProps {
    
    }

}
  