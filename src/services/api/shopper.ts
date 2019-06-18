import HTTP from '../http';

export const fetchShoppers = (startRange?: string, endRange?: string, outletName?: string) => {
  startRange = '2017-05-24';
  endRange = '2019-06-30';  
  outletName = '1 TO SEVEN PLUS';
  return HTTP.get('shoppers?startRange=' + startRange + '&endRange=' + endRange + '&outletName=' + outletName);
};
