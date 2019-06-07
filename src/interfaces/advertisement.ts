export namespace IAdvertisement {

    export interface IAdvertisementData {
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
        econoList: IAdvertisementData[] | undefined;
    }
    
    export interface DispatchFromProps {
    
    }

}
  