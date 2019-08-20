import HTTP from '../http';
import { IUser } from '@interfaces/user';

export const login = (username?: string, password?: string) => {
  return HTTP.post('auth/signin', {
    username: username,
    password: password
  });
};

export const forgotPassword = (username?: string) => {
    return HTTP.post('auth/forgot-password', {
      username: username
    });
};

export const resetPassword = (token?: string, password?: string, confirmPassword?: string) => {
  return HTTP.post('auth/forgot-password', {
    token: token,
    password: password,
    confirmPassword: confirmPassword
  });
};

export const register = (userData: IUser.IUserData) => {
    return HTTP.post('auth/signup', userData);
};