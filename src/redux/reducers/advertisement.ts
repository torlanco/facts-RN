import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { AnyAction } from 'redux';
import { CONSTANTS } from '@utils';

const initialState: IAdvertisement.StateToProps = {
  error: false,
  loading: false,
  advertisements: [],
  categories: undefined,
  advertisementsForReview: undefined,
  categoriesForReview: undefined,
  brands: undefined,
  featuresByBrands: undefined,
  trendingFeatures: undefined,
  topCategories: undefined,
  promotions: undefined,
  favoriteFeatures: [],
  totalFavorites: -1
};

export function advertisement(
  state: IAdvertisement.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH Advertisement
    case Types.FETCH_ADVERTISEMENTS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_ADVERTISEMENTS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        advertisements:  action.payload.advertisements,
        categories: fetchCategories(action.payload.advertisements)
      };
    case Types.FETCH_ADVERTISEMENTS_FAILED:
      return {
        ...state,
        error: action.payload.message || true,
        loading: false,
        advertisements: [],
        categories: [],
      };

    // FETCH CATEGORIES PENDING FOR REVIEW
    case Types.FETCH_CATEGORIES_FOR_REVIEW:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_CATEGORIES_FOR_REVIEW_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        categoriesForReview: action.payload.categories,
      };
    case Types.FETCH_CATEGORIES_FOR_REVIEW_FAILED:
      return {
        ...state,
        error: action.payload.message || true,
        loading: false,
        categoriesForReview: [],
      };

    // FETCH ADVERTISEMENTS PENDING FOR REVIEW
    case Types.FETCH_ADVERTISEMENTS_FOR_REVIEW:
      return {
        ...state,
        error: false,
        loading: action.payload.isBackground ? false : true
      };
    case Types.FETCH_ADVERTISEMENTS_FOR_REVIEW_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        advertisementsForReview: action.payload.advertisements,
      };
    case Types.FETCH_ADVERTISEMENTS_FOR_REVIEW_FAILED:
      return {
        ...state,
        error: action.payload.message || true,
        loading: false,
        advertisementsForReview: [],
      };

    // UPDATE ADVERTISEMENT PENDING FOR REVIEW
    case Types.UPDATE_ADVERTISEMENT_FOR_REVIEW:
      return {
        ...state
      };
    case Types.UPDATE_ADVERTISEMENT_FOR_REVIEW_FAILED:
      return {
        ...state
      };
    case Types.UPDATE_ADVERTISEMENT_FOR_REVIEW_SUCCESS:
      return {
        ...state,
        error: action.payload.message || true
      };

    // FETCH BRANDS
    case Types.FETCH_BRANDS:
      return {
        ...state,
        error: false,
      };
    case Types.FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload.brands,
        error: false,
      };
    case Types.FETCH_BRANDS_FAILED:
      return {
        ...state,
        brands: [],
        error: action.payload.message || true,
      };

    // FETCH ADVERTISEMENTS BY BRANDS
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS:
      return {
        ...state,
        loading: true,
        error: false,
        featuresByBrands: []
      };
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        featuresByBrands: action.payload.features
      };
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message || true,
      };

    // CLEAR ADVERTISEMENTS BY BRANDS
      case Types.CLEAR_ADVERTISEMENTS_BY_BRANDS:
        return {
          ...state,
          featuresByBrands: undefined
        };

    // FETCH TRENDING FEATURES
    case Types.FETCH_TRENDING_FEATURES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_TRENDING_FEATURES_SUCCESS:
      return {
        ...state,
        trendingFeatures: action.payload.features,
        loading: false,
        error: false,
      };
    case Types.FETCH_TRENDING_FEATURES_FAILED:
      return {
        ...state,
        trendingFeatures: [],
        loading: false,
        error: false,
      };

    // INCREMENT FEATURE VIEW COUNT
    case Types.FEATURE_INCREMENT_VIEW_COUNT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FEATURE_INCREMENT_VIEW_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case Types.FEATURE_INCREMENT_VIEW_COUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: false,
      };

    // FETCH TOP CATEGORIES
    case Types.FETCH_TOP_CATEGORIES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_TOP_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        topCategories: action.payload.topCategories
      };
    case Types.FETCH_TOP_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: false,
        topCategories: [],
      };

    // FETCH PROMOTIONS
    case Types.FETCH_PROMOTIONS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_PROMOTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        promotions: action.payload.promotions
      };
    case Types.FETCH_PROMOTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: false,
        promotions: [],
      };

    // FETCH FAVORITES
    case Types.FETCH_FAVORITE_FEATURES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_FAVORITE_FEATURES_SUCCESS:
      state.favoriteFeatures.concat(action.payload.favorites)
      return {
        ...state,
        loading: false,
        error: false,
        favoriteFeatures: action.payload.initialFetch ? action.payload.favorites : state.favoriteFeatures.concat(action.payload.favorites),
        totalFavorites: action.payload.total
      };
    case Types.FETCH_FAVORITE_FEATURES_FAILED:
      return {
        ...state,
        loading: false,
        error: false,
        favoriteFeatures: [],
        totalFavorites: -1
      };

    // TOGGLE FAVORITE
    case Types.TOGGLE_FAVORITE_FEATURE_SUCCESS:
      if (action.payload.isFavorite === false) {
          const index = state.favoriteFeatures.findIndex((feature) => feature.id === action.payload.featureId);
          if (index !== -1) {
            state.favoriteFeatures.splice(index, 1);
            state.totalFavorites--;
          }
      }
      if (state.advertisements) {
        state.advertisements.map((feature) => {
            if (feature.id === action.payload.featureId) {
              feature.isFavorite = action.payload.isFavorite
            }
            return feature;
        });
      }
      if (state.featuresByBrands) {
        state.featuresByBrands.map((feature) => {
            if (feature.id === action.payload.featureId) {
              feature.isFavorite = action.payload.isFavorite
            }
            return feature;
        });
      }
      if (state.trendingFeatures) {
        state.trendingFeatures.map((feature) => {
            if (feature.id === action.payload.featureId) {
              feature.isFavorite = action.payload.isFavorite
            }
            return feature;
        });
      }
      return {
        ...state,
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
