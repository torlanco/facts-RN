import { Types } from '@types';
import { IOutlets } from '@interfaces/outlets';
import { fetchOutlets } from '@services';

export const Creators: IOutlets.DispatchFromProps = {
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
