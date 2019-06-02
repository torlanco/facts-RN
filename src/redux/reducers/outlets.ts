import { Types } from '@types';
import { IOutlets } from '@interfaces/outlets';
import { AnyAction } from 'redux';

const initialState: IOutlets.StateToProps = {
  error: false,
  loading: false,
  outlets: undefined
};

export function outlets(
  state: IOutlets.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH OUTLETS
    case Types.FETCH_OUTLETS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_OUTLETS_SUCCESS:
      return {
        error: false,
        loading: false,
        outlets: action.payload.data
      };
    case Types.FETCH_OUTLETS_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        outlets: []
      };
    default:
      return state;
  }
}
