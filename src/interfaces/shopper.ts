export namespace IShopper {

    export interface IShopperData {
        objectId?: string;
        type: string;
        name: string;
        piecePerKg?: string;
        price: string;
        originalPrice?: string;
        minQuantity?: string;
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
  