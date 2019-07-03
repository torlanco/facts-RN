import HTTP from '../http';

export const fetchShoppers = (startRange?: string, endRange?: string, outletName?: string) => {
  return HTTP.get('shoppers?startRange=' + startRange + '&endRange=' + endRange + '&outletName=' + outletName);
};
