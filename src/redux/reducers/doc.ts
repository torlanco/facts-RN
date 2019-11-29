import { Types } from '@types';
import { IDoc } from '@interfaces/doc';
import { AnyAction } from 'redux';

const initialState: IDoc.StateToProps = {
  error: false,
  loading: false,
  docs: []
};

export function doc(
  state: IDoc.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH RECEIPTS
    case Types.FETCH_RECEIPTS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_RECEIPTS_SUCCESS:
      return {
        error: false,
        loading: false,
        docs: action.payload.outlets,
      };
    case Types.FETCH_RECEIPTS_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        docs: []
    };

    // SAVE RECEIPTS
    case Types.SAVE_RECEIPTS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.SAVE_RECEIPTS_SUCCESS:
      return {
        error: false,
        loading: false,
      };
    case Types.SAVE_RECEIPTS_FAILED:
      return {
        error: true,
        loading: false,
    };

    // UPLOAD FILE 
    case Types.UPLOAD_FILE:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.UPLOAD_FILE_SUCCESS:
      return {
        error: false,
        loading: false,
      };
    case Types.UPLOAD_FILE_FAILED:
      return {
        error: true,
        loading: false,
    };
    default:
      return state;
  }
}