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
        units?: string;
        size?: string;
        measure?: string;
        capacity?: string;
        createdAt?: string;
        keywords?: string;  
        outlet?: string;
        startDate?: string;
        endDate?: string;      
    }   

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        advertisements: IAdvertisementData[] | undefined;
        categories: string[] | undefined;
        advertisementsForReview: IAdvertisementData[] | undefined;
        categoriesForReview: string[] | undefined;
        brands: string[] | undefined;
        featuresByBrands: IAdvertisementData[] | undefined;
    }
    
    export interface DispatchFromProps {
        fetchAdvertisements(shopperId?: string): Function;
        fetchCategoriesForReview(): Function;
        fetchAdvertisementsForReview(category: string, page: number, limit?: number, isBackground?: boolean): Function;
        updateAdvertisementsForReview(advertisement: IAdvertisement.IAdvertisementData): Function;
        fetchBrands(value?: string): Function;
        fetchFeaturesByBrand(brand?: string): Function;
    }

}
  