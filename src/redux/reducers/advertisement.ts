import { Types } from '@types';
import { IAdvertisement } from '@interfaces/advertisement';
import { AnyAction } from 'redux';
import { CONSTANTS } from '@utils';

const initialState: IAdvertisement.StateToProps = {
  error: false,
  loading: false,
  advertisements: undefined,
  categories: undefined,
  advertisementsForReview: undefined,
  categoriesForReview: undefined,
  brands: undefined,
  featuresByBrands: undefined,
  trendingFeatures: undefined,
  homeCategories: undefined,
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
        ...state,
        error: false,
        loading: false,
        advertisements: action.payload.advertisements,
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
        loading: true,
        error: false,
      };
    case Types.FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload.brands,
        loading: false,
        error: false,
      };
    case Types.FETCH_BRANDS_FAILED:
      return {
        ...state,
        brands: [],
        loading: false,
        error: action.payload.message || true,
      };  
      
    // FETCH ADVERTISEMENTS BY BRANDS
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS_SUCCESS:
      return {
        ...state,
        featuresByBrands: createMultiListWithOutlet(action.payload.features),
        loading: false,
        error: false,
      };
    case Types.FETCH_ADVERTISEMENTS_BY_BRANDS_FAILED:
      return {
        ...state,
        featuresByBrands: [],
        loading: false,
        error: action.payload.message || true,
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
   
    // FETCH CATEGORIES FOR HOME
    case Types.FETCH_CATEGORIES_FOR_HOME:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.FETCH_CATEGORIES_FOR_HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        homeCategories: action.payload.categories.map((item: any) => item.category) 
      };
    case Types.FETCH_CATEGORIES_FOR_HOME_FAILED:
      return {
        ...state,
        loading: false,
        error: false,
        homeCategories: [],
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

function createMultiListWithOutlet(advertisements: IAdvertisement.IAdvertisementData[]) {
  const featuresWithOutetMap: any = {};
  advertisements.forEach((feature: IAdvertisement.IAdvertisementData) => {
    if (!featuresWithOutetMap[feature.outlet]) {
      featuresWithOutetMap[feature.outlet] = [];
    }
    featuresWithOutetMap[feature.outlet].push(feature);
  });
  const featuresWithOutletList: any = [];
  for (let key in featuresWithOutetMap) {
    featuresWithOutletList.push({
      outlet: key,
      features: featuresWithOutetMap[key]
    })
  }
  return featuresWithOutletList;
}
