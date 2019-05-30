import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { AnyAction } from 'redux';

const initialState: IUser.StateToProps = {
  error: false,
  loading: false,
  user: undefined
};

export function user(
  state: IUser.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    //login feature
    case Types.USER_LOGIN:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.USER_LOGIN_SUCCESS:
      return {
        error: false,
        loading: false,
        user: action.payload.data
      };
    case Types.USER_LOGIN_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        user: undefined
      };

    //logout feature
    case Types.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
