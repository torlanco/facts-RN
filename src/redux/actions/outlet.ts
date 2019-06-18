import { Types } from '@types';
import { IOutlet } from '@interfaces/outlet';
import { fetchOutlets } from '@services';

const IOutletAction: IOutlet.DispatchFromProps = {
  fetchOutlets: () => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_OUTLETS,
      });
      try {
        const response =  await fetchOutlets();
        dispatch({
          type: Types.FETCH_OUTLETS_SUCCESS,
          payload: response.data.data,
        });
        return response.data.data.outlets;
      } catch(e) {
        dispatch({
          type: Types.FETCH_OUTLETS_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IOutletAction as mapDispatchToProps}
