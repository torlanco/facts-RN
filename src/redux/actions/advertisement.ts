import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { fetchAdvertisements } from '@services';

const IAdvertisementAction: IAdvertisement.DispatchFromProps = {
  fetchAdvertisements: (shopperId?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_ADVERTISEMENTS,
      });
      try {
        const response =  await fetchAdvertisements(shopperId);
        dispatch({
          type: Types.FETCH_ADVERTISEMENTS_SUCCESS,
          payload: {
            advertisements: response.data.data.features,
          }
        });
        return response.data.data.features;
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
