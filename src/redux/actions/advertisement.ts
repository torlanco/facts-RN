import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { fetchAdvertisements } from '@services';

const IAdvertisementAction: IAdvertisement.DispatchFromProps = {
  fetchAdvertisements: () => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_ADVERTISEMENTS,
      });
      try {
        const response =  await fetchAdvertisements();
        dispatch({
          type: Types.FETCH_ADVERTISEMENTS_SUCCESS,
          payload: response.data.data,
        });
        return response.data.data.advertisements;
      } catch(e) {
        dispatch({
          type: Types.FETCH_ADVERTISEMENTS_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IAdvertisementAction as mapDispatchToProps}
