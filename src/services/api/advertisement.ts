import HTTP from '../http';
import { IAdvertisement } from '@interfaces/advertisement';

export const fetchAdvertisements = (shopperId?: string) => {
    return HTTP.get('features?shopperId=' + shopperId);
};

export const fetchCategoriesForReview = () => {
    return HTTP.get('categories/review');
};

export const fetchAdvertisementsForReview = (category: string, page: number, limit: number) => {
    return HTTP.get(`features/pending-review?page=${page}&limit=${limit}&category=${category}`);
};

export const updateAdvertisementsForReview = (advertisement: IAdvertisement.IAdvertisementData) => {
    return HTTP.put(`features/${advertisement.id}`, advertisement);
};

export const fetchBrands = (value?: string) => {
    return HTTP.get('brands/search?term=' + value);
};

export const fetchFeaturesByBrand = (brand?: string) => {
    return HTTP.get('features/' + brand);
};

export const fetchTrendingFeatures = () => {
    return HTTP.get('features/top-10');
};

export const incrementFeatureViewCount = (id?: string) => {
    return HTTP.put(`features/${id}/viewed`);
};

export const fetchCategoriesForHome = () => {
    return HTTP.get('categories');
};