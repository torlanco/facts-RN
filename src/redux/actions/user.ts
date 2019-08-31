import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { login, register, forgotPassword, resetPassword } from '@services';
import { AsyncStorage } from 'react-native';
import { CONSTANTS } from '@utils';

const IUserAction: IUser.DispatchFromProps = {
  isLoggedIn: () => {
    return async function (dispatch: any) {
      let token = undefined;
      try {
        let asyncToken = await AsyncStorage.getItem(CONSTANTS.FACTS_RN_AUTH_TOKEN);
        if (asyncToken) 
          token = asyncToken;
        dispatch({
          type: Types.LOGIN_SUCCESS,
          payload: {token},
        });
        return token;
      } catch(e) {
        return null;
      }
    };
  },
  login: (username?: string, password?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.LOGIN,
      });
      try {
        const response =  await login(username, password);
        dispatch({
          type: Types.LOGIN_SUCCESS,
          payload: response.data.data,
        });
        AsyncStorage.setItem(CONSTANTS.FACTS_RN_AUTH_TOKEN, response.data.data.token);
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.LOGIN_FAILED,
          payload: e.response.data,
        });
        return e.response.data;
      }
    };
  },
  forgotPassword: (username?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FORGET_PASSWORD,
      });
      try {
        const response =  await forgotPassword(username);
        dispatch({
          type: Types.FORGET_PASSWORD_SUCCESS,
        });
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.FORGET_PASSWORD_FAILED,
          payload: e.response.data,
        });
        return e.response.data;
      }
    };
  },
  resetPassword: (token?: string, password?: string, confirmPassword?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.RESET_PASSWORD,
      });
      try {
        const response =  await resetPassword(token, password, confirmPassword);
        dispatch({
          type: Types.RESET_PASSWORD_SUCCESS,
        });
      } catch(e) {
        dispatch({
          type: Types.RESET_PASSWORD_FAILED,
          payload: e.response.data,
        });
        return e.response.data;
      }
    };
  },
  register: (userData: IUser.IUserData) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.REGISTER,
      });
      try {
        const response =  await register(userData);
        dispatch({
          type: Types.REGISTER_SUCCESS,
        });
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.REGISTER_FAILED,
          payload: e.response.data,
        });
        return e.response.data;
      }
    };
  },
  logout: () => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.LOGOUT,
      });
      try {
        await AsyncStorage.removeItem(CONSTANTS.FACTS_RN_AUTH_TOKEN);
        dispatch({
          type: Types.LOGOUT_SUCCESS,
        });
        return true;
      } catch(e) {
        dispatch({
          type: Types.LOGOUT_FAILED,
          payload: e.response.data,
        });
        return false;
      }
    };
  }
};

export { IUserAction as mapDispatchToProps}