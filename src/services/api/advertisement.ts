import HTTP from '../http';
import { IAdvertisement } from '@interfaces/advertisement';

export const fetchAdvertisements = (shopperId?: string) => {
    return HTTP.get('https://facts-cloud.herokuapp.com/features?shopperId=' + shopperId);
};

export const fetchCategoriesForReview = () => {
    return HTTP.get('https://facts-cloud.herokuapp.com/categories/review');
};

export const fetchAdvertisementsForReview = (category: string, page: number, limit: number) => {
    return HTTP.get(`https://facts-cloud.herokuapp.com/features/pending-review?page=${page}&limit=${limit}&category=${category}`);
};

export const updateAdvertisementsForReview = (advertisement: IAdvertisement.IAdvertisementData) => {
    return HTTP.put(`https://facts-cloud.herokuapp.com/features/${advertisement.id}`, advertisement);
};
