export namespace IAdvertisement {

    export interface IAdvertisementData {
        id?: number;
        copypage?: number;
        category?: string;
        type?: string;
        brand?: string;
        sprice?: string;
        rprice?: string;
        position?: string;
        sizeMeasure?: string;
        image?: string;
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        advertisements: IAdvertisementData[] | undefined;
    }
    
    export interface DispatchFromProps {
        fetchAdvertisements(shopperId?: string): Function;
    }

}
  