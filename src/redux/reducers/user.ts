import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { AnyAction } from 'redux';

const initialState: IUser.StateToProps = {
  error: false,
  loading: false,
  token: undefined,
  loggedInUser: undefined,
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
          error: true,
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
          error: true,
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

    // FETCH USER INFO
    case Types.FETCH_USER_PROFILE:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        loggedInUser: action.payload
      };
    case Types.FETCH_USER_PROFILE_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
        loggedInUser: undefined
      };

    // UPDATE USER INFO
    case Types.UPDATE_USER_PROFILE:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        loggedInUser: undefined
      };
    case Types.UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
      };

    // REQUEST OTP
    case Types.REQUEST_RESET_PASSWORD_OTP:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.REQUEST_RESET_PASSWORD_OTP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.REQUEST_RESET_PASSWORD_OTP_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
      };

    // Verify OTP
    case Types.VERIFY_RESET_PASSWORD_OTP:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.VERIFY_RESET_PASSWORD_OTP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.VERIFY_RESET_PASSWORD_OTP_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
      };

    // Change password
    case Types.CHANGE_PASSWORD:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        error: false,
        loading: false,
      };

    default:
        return state;
  }
}
