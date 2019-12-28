import HTTP from '../http';
import { IUser } from '@interfaces/user';
import { CONSTANTS } from '@utils';

export const login = (username?: string, password?: string) => {
  return HTTP.post('auth/signin', {
    username,
    password
  });
};

export const forgotPassword = (username?: string) => {
  return HTTP.post('auth/forgot-password', {
    username
  });
};

export const resetPassword = (token?: string, password?: string, confirmPassword?: string) => {
  return HTTP.post('auth/reset-password', {
    token,
    password,
    confirmPassword
  });
};

export const register = (userData: IUser.IUserData) => {
  return HTTP.post('auth/signup', userData);
};

export const requestResetPasswordOtp = (phone?: string) => {
  return HTTP.post('auth/send-reset-password-otp', {
    phone
  });
};

export const verifyResetPasswordOtp = (phone?: string, otp?: string) => {
  return HTTP.post('auth/verify-reset-password-otp', {
    phone,
    otp
  });
};