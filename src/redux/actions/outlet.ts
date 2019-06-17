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
        console.log('coming here');
        const response =  await fetchOutlets();
        dispatch({
          type: Types.FETCH_OUTLETS_SUCCESS,
          payload: response.data
        });
        return response;
      } catch(e) {
        dispatch({
          type: Types.FETCH_OUTLETS_FAILED,
        });
        return null;
      }
    };
  }
};

export { IOutletAction as mapDispatchToProps}
