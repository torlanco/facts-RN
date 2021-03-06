export namespace IAdvertisement {

    export interface IAdvertisementData {
        id?: string;
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
        outletImage?: string;
        isFavorite?: boolean;

        dummyId?: string;
        opacity?: number;
    }

    export interface StateToProps {
        error?: string | boolean;
        loading?: boolean;
        advertisements?: IAdvertisementData[] | undefined;
        categories?: string[] | undefined;
        advertisementsForReview?: IAdvertisementData[] | undefined;
        categoriesForReview?: string[] | undefined;
        brands?: string[] | undefined;
        featuresByBrands?: any[] | undefined;
        trendingFeatures?: IAdvertisementData[] | undefined;
        topCategories: any[] | undefined;
        promotions: any[] | undefined;
        favoriteFeatures: IAdvertisementData[];
        totalFavorites: number;
    }

    export interface DispatchFromProps {
        fetchAdvertisements(shopperId?: string): Function;
        fetchCategoriesForReview(): Function;
        fetchAdvertisementsForReview(category: string, page: number, limit?: number, isBackground?: boolean): Function;
        updateAdvertisementsForReview(advertisement: IAdvertisement.IAdvertisementData): Function;
        fetchBrands(value?: string): Function;
        fetchFeaturesByBrand(brand?: string): Function;
        fetchTrendingFeatures(): Function;
        incrementFeaturesViewCount(id?: string): Function;
        fetchTopCategories(): Function;
        fetchPromotions(): Function;
        fetchFavoriteFeatures(page: number, initialFetch?: boolean): Function;
        toggleFavoriteFeature(featureId?: any): Function;

        // clearing the store
        clearFeaturesByBrand(): Function;
    }
}
