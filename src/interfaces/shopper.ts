export namespace IShopper {

    export interface IShopperData {
        objectId?: string;
        startDate: string;
        endDate: string;
        features: number;
        imageUrl?: string;
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        econoList: IShopperData[] | undefined;
    }
    
    export interface DispatchFromProps {
    
    }

}
  