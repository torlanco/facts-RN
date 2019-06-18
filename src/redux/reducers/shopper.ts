import { Types } from '@types';
import { IShopper } from '@interfaces/shopper';
import { AnyAction } from 'redux';

const initialState: IShopper.StateToProps = {
  error: false,
  loading: false,
  shoppers: undefined
};

export function shopper(
  state: IShopper.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH OUTLETS
    case Types.FETCH_SHOPPERS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_SHOPPERS_SUCCESS:
      return {
        error: false,
        loading: false,
        shoppers: action.payload.shoppers
      };
    case Types.FETCH_SHOPPERS_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        shoppers: []
      };
    default:
      return state;
  }
}
