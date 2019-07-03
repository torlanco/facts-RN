import HTTP from '../http';

export const fetchAdvertisements = (shopperId?: string) => {
    return HTTP.get('https://facts-cloud.herokuapp.com/features?shopperId=' + shopperId);
};
