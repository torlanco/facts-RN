import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { AnyAction } from 'redux';
import { CONSTANTS } from '@utils';

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

function getAdvertisementCountByCategory(advertisements: IAdvertisement.IAdvertisementData[], category: string) {
  return advertisements.filter((advertisement) => {
    return advertisement.category == category;
  }).length;
}

function fetchCategories(advertisements: IAdvertisement.IAdvertisementData[]) {
  const categories = [...new Set<string>(advertisements.
    map((advertisement: any) => `${advertisement.category} (${getAdvertisementCountByCategory(advertisements, advertisement.category)})`))].sort();
  categories.splice(0, 0, `${CONSTANTS.SHOW_ALL} (${advertisements.length})`);
  return categories;
}