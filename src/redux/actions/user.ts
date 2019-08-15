import { Types } from '@types';
import { IUser } from '@interfaces/user';
import { login, register, forgetPassword } from '@services';

const IUserAction: IUser.DispatchFromProps = {
  login: (email?: string, password?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.LOGIN,
      });
      try {
        const response =  await login(email, password);
        dispatch({
          type: Types.LOGIN_SUCCESS,
          payload: response.data.data,
        });
        return response.data.data.user;
      } catch(e) {
        dispatch({
          type: Types.LOGIN_FAILED,
          payload: e,
        });
        return [];
      }
    };
  },
  forgetPassword: (email?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FORGET_PASSWORD,
      });
      try {
        const response =  await forgetPassword(email);
        dispatch({
          type: Types.FORGET_PASSWORD_SUCCESS,
          payload: response.data.data,
        });
      } catch(e) {
        dispatch({
          type: Types.FORGET_PASSWORD_FAILED,
          payload: e,
        });
        return [];
      }
    };
  },
  register: (name?: string, email?: string, password?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.REGISTER,
      });
      try {
        const response =  await register(name, email, password);
        dispatch({
          type: Types.REGISTER_SUCCESS,
          payload: response.data.data,
        });
      } catch(e) {
        dispatch({
          type: Types.REGISTER_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IUserAction as mapDispatchToProps}
