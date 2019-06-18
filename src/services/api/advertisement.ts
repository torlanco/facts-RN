import HTTP from '../http';

export const fetchAdvertisements = (shopperId?: string) => {
    shopperId = 'a6fa4a02fdb1c853cf3165545407a147';
    return HTTP.get('https://facts-cloud.herokuapp.com/features?shopperId=' + shopperId);
};
