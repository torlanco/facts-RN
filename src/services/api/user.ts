import HTTP from '../http';
import { IUser } from '@interfaces/user';

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
  userData.phone = "+91" + userData.phone;
  return HTTP.post('auth/signup', userData);
};

export const requestResetPasswordOtp = (phone?: string) => {
  phone = "+91" + phone;
  return HTTP.post('auth/send-reset-password-otp', {
    phone
  });
};

export const verifyResetPasswordOtp = (phone?: string, otp?: string) => {
  phone = "+91" + phone;
  return HTTP.post('auth/verify-reset-password-otp', {
    phone,
    otp
  });
};