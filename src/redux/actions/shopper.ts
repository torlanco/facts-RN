import { Types } from '@types';
import { IShopper } from '@interfaces/shopper';
import { fetchShoppers } from '@services';

const IShopperAction: IShopper.DispatchFromProps = {
  fetchShoppers: (startRange?: string, endRange?: string, outletName?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_SHOPPERS,
      });
      try {
        const response =  await fetchShoppers(startRange, endRange, outletName);
        dispatch({
          type: Types.FETCH_SHOPPERS_SUCCESS,
          payload: response.data.data,
        });
        return response.data.data.shoppers;
      } catch(e) {
        dispatch({
          type: Types.FETCH_SHOPPERS_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IShopperAction as mapDispatchToProps}
