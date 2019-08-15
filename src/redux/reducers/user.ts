import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { AnyAction } from 'redux';

const initialState: IUser.StateToProps = {
  error: false,
  loading: false,
  user: undefined,
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
        error: false,
        loading: false,
        user: action.payload.user,
      };
    case Types.LOGIN_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        user: undefined,
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
 
    default:
        return state;
  }
}