import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { fetchAdvertisements, fetchCategoriesForReview, fetchAdvertisementsForReview, updateAdvertisementsForReview } from '@services';

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
  },
  fetchCategoriesForReview: () => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_CATEGORIES_FOR_REVIEW,
      });
      try {
        const response = await fetchCategoriesForReview();
        dispatch({
          type: Types.FETCH_CATEGORIES_FOR_REVIEW_SUCCESS,
          payload: {
            categories: response.data.data.categories,
          }
        });
        return response.data.data.categories;
      } catch(e) {
        dispatch({
          type: Types.FETCH_CATEGORIES_FOR_REVIEW_FAILED,
          payload: e,
        });
        return [];
      }
    };
  },
  fetchAdvertisementsForReview: (category: string, page: number, limit?: number, isBackground?: boolean) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_ADVERTISEMENTS_FOR_REVIEW, 
        payload: {
          isBackground: isBackground,
        }
      });
      try {
        const response = await fetchAdvertisementsForReview(category, page, limit ? limit : 5);
        dispatch({
          type: Types.FETCH_ADVERTISEMENTS_FOR_REVIEW_SUCCESS,
          payload: {
            advertisements: response.data.data.features,
          }
        });
        return response.data.data;
      } catch(e) {
        dispatch({
          type: Types.FETCH_ADVERTISEMENTS_FOR_REVIEW_FAILED,
          payload: e,
        });
        return [];
      }
    };
  },
  updateAdvertisementsForReview: (advertisement: IAdvertisement.IAdvertisementData) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.UPDATE_ADVERTISEMENT_FOR_REVIEW,
      });
      try {
        await updateAdvertisementsForReview(advertisement);
        dispatch({
          type: Types.UPDATE_ADVERTISEMENT_FOR_REVIEW_SUCCESS,
          payload: { }
        });
      } catch(e) {
        dispatch({
          type: Types.UPDATE_ADVERTISEMENT_FOR_REVIEW_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IAdvertisementAction as mapDispatchToProps}
