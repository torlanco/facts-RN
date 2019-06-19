import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { AnyAction } from 'redux';

const initialState: IAdvertisement.StateToProps = {
  error: false,
  loading: false,
  advertisements: undefined,
  categories: undefined
};

export function advertisement(
  state: IAdvertisement.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH OUTLETS
    case Types.FETCH_ADVERTISEMENTS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_ADVERTISEMENTS_SUCCESS:
      return {
        error: false,
        loading: false,
        advertisements: action.payload.advertisements,
        categories: fetchCategories(action.payload.advertisements)
      };
    case Types.FETCH_ADVERTISEMENTS_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        advertisements: [],
        categories: [],
      };
    default:
      return state;
  }
}

function fetchCategories(advertisements: IAdvertisement.IAdvertisementData[]) {
  return [...new Set<string>(advertisements.map((x: any) => x.category))];
}