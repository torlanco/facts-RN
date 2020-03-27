import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { login, register, forgotPassword, resetPassword, requestResetPasswordOtp,
    verifyResetPasswordOtp, fetchUserInfo, updateUserInfo, changePassword, requestLoginOtp, loginUsingOtp } from '@services';
import { LocalStorageService } from '@services';

const localstorageService = LocalStorageService.getService();

const IUserAction: IUser.DispatchFromProps = {
  isLoggedIn: () => {
    return async function (dispatch: any) {
      let token = undefined;
      try {
        let asyncToken = await localstorageService.getAccessToken();
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
        await localstorageService.setAccessToken(response.data.data.token);
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.LOGIN_FAILED,
          payload: e.response.data.result,
        });
        return e.response.data.result;
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
  resetPassword: (password?: string, confirmPassword?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.RESET_PASSWORD,
      });
      try {
        const response =  await resetPassword(password, confirmPassword);
        dispatch({
          type: Types.RESET_PASSWORD_SUCCESS,
        });
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.RESET_PASSWORD_FAILED,
        });
        return e.response.data.result;
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
          payload: response.data.data,
        });
        await localstorageService.setAccessToken(response.data.data.token);
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.REGISTER_FAILED,
          payload: e.response.data.result,
        });
        return e.response.data.result;
      }
    };
  },
  requestResetPasswordOtp: (phone?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.REQUEST_RESET_PASSWORD_OTP,
      });
      try {
        const response =  await requestResetPasswordOtp(phone);
        dispatch({
          type: Types.REQUEST_RESET_PASSWORD_OTP_SUCCESS,
        });
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.REQUEST_RESET_PASSWORD_OTP_FAILED,
        });
        return e.response.data.result;
      }
    };
  },
  verifyResetPasswordOtp: (phone?: string, otp?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.VERIFY_RESET_PASSWORD_OTP,
      });
      try {
        const response =  await verifyResetPasswordOtp(phone, otp);
        dispatch({
          type: Types.VERIFY_RESET_PASSWORD_OTP_SUCCESS,
        });
        return response.data.data;
      } catch(e) {
        dispatch({
          type: Types.VERIFY_RESET_PASSWORD_OTP_FAILED,
        });
        return e.response.data.result;
      }
    };
  },
  logout: () => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.LOGOUT,
      });
      try {
        await localstorageService.clearAccessToken();
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
  },
  fetchUserInfo: (doInBackground?: boolean) => {
    return async function (dispatch: any) {
      if (!doInBackground) {
        dispatch({
          type: Types.FETCH_USER_PROFILE,
        });
      }
      try {
        const response =  await fetchUserInfo();
        dispatch({
          type: Types.FETCH_USER_PROFILE_SUCCESS,
          payload: response.data.data,
        });
        return response.data.data;
      } catch(e) {
        dispatch({
          type: Types.FETCH_USER_PROFILE_FAILED,
        });
        return e.response.data.result;
      }
    };
  },
  updateUserInfo: (userData: IUser.IUserData) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.UPDATE_USER_PROFILE,
      });
      try {
        const response =  await updateUserInfo(userData);
        dispatch({
          type: Types.UPDATE_USER_PROFILE_SUCCESS,
          payload: response.data,
        });
        console.log(response);
        return response.data;
      } catch(e) {
        console.log(e.response.data)
        dispatch({
          type: Types.UPDATE_USER_PROFILE_FAILED,
          payload: e.response.data.result,
        });
        return e.response.data.result;
      }
    };
  },
  changePassword: (currentPassword?: string, newPassword?: string, confirmPassword?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.CHANGE_PASSWORD,
      });
      try {
        const response =  await changePassword(currentPassword, newPassword, confirmPassword);
        dispatch({
          type: Types.CHANGE_PASSWORD_SUCCESS,
        });
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.CHANGE_PASSWORD_FAILED,
        });
        return e.response.data;
      }
    };
  },
  requestLoginOtp: (emailOrPhone?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.REQUEST_LOGIN_OTP,
      });
      try {
        const response =  await requestLoginOtp(emailOrPhone);
        dispatch({
          type: Types.REQUEST_LOGIN_OTP_SUCCESS,
        });
        console.log(response);
        return response.data;
      } catch(e) {
        dispatch({
          type: Types.REQUEST_LOGIN_OTP_FAILED,
        });
        console.log(e);
        return e.response.data;
      }
    };
  },
  loginUsingOtp: (emailOrPhone?: string, otp?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.LOGIN,
      });
      try {
        const response =  await loginUsingOtp(emailOrPhone, otp);
        dispatch({
          type: Types.LOGIN_SUCCESS,
          payload: response.data.data,
        });
        await localstorageService.setAccessToken(response.data.data.token);
        return response.data.data;
      } catch(e) {
        dispatch({
          type: Types.LOGIN_FAILED,
          payload: e.response.data,
        });
        return e.response.data;
      }
    };
  },
};

export { IUserAction as mapDispatchToProps}
