import { Types } from '@types';
import { IOutlet } from '@interfaces/outlet';
import { fetchOutlets } from '@services';

export const Creators: IOutlet.DispatchFromProps = {
  fetchOutlets: () => {
    return dispatch => {
      dispatch({
        type: Types.FETCH_OUTLETS,
      });    
      fetchOutlets()
        .then(res => {
          dispatch({
            type: Types.FETCH_OUTLETS_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => {
          dispatch({
            type: Types.FETCH_OUTLETS_FAILED,
          });
        });
    };
  }
};
