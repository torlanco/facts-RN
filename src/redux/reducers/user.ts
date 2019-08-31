import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { AnyAction } from 'redux';

const initialState: IUser.StateToProps = {
  error: false,
  loading: false,
  token: undefined
};

export function user(
  state: IUser.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // LOGIN
    case Types.LOGIN:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        token: action.payload.token,
      };
    case Types.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.message || true,
        loading: false,
        token: undefined,
      };

    // FORGET PASSWORD
    case Types.FORGET_PASSWORD:
        return {
          ...state,
          error: false,
          loading: true
        };
    case Types.FORGET_PASSWORD_SUCCESS:
        return {
          ...state,  
          error: false,
          loading: false,
        };
    case Types.FORGET_PASSWORD_FAILED:
        return {
          ...state,  
          error: action.payload.message || true,
          loading: false,
        };

    // RESET PASSWORD
    case Types.RESET_PASSWORD:
        return {
          ...state,
          error: false,
          loading: true
        };
    case Types.RESET_PASSWORD_SUCCESS:
        return {
          ...state,  
          error: false,
          loading: false,
        };
    case Types.RESET_PASSWORD_FAILED:
        return {
          ...state,  
          error: action.payload.message || true,
          loading: false,
        };    

    // REGISTER
    case Types.REGISTER:
        return {
          ...state,
          error: false,
          loading: true
        };
    case Types.REGISTER_SUCCESS:
        return {
            ...state,
            error: false,
            loading: false,
        };
    case Types.REGISTER_FAILED:
        return {
            ...state,
            error: action.payload.message || true,
            loading: false,
        };

    // LOGOUT
    case Types.LOGOUT:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        token: undefined
      };
    case Types.LOGOUT_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
      };
  
    default:
        return state;
  }
}