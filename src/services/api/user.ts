import HTTP from '../http';
import { IUser } from '@interfaces/user';
import { formatPhone, CONSTANTS } from '@utils';

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
}

export const fetchUserInfo = (token: string) => {
  return HTTP.get('me', { headers: { Authorization: `Bearer ${token}` } });
};

export const updateUserInfo = (token: string, userData: IUser.IUserData) => {
  if (userData.phone && userData.phone != CONSTANTS.COUNTRY_CODE) {
    userData.phone = formatPhone(userData.phone)
  } else {
    delete userData.phone;
  }
  return HTTP.put('users', userData, { headers: { Authorization: `Bearer ${token}` }});
};

export const changePassword = (token?: string, currentPassword?: string, newPassword?: string, confirmPassword?: string) => {
  return HTTP.put('auth/update-password', {
      currentPassword,
	    newPassword,
	    confirmPassword
  }, { headers: { Authorization: `Bearer ${token}` }});
};

export const requestLoginOtp = (emailOrPhone?: string) => {
  return HTTP.post('auth/send-signin-otp', {
      phone: emailOrPhone
  });
};

export const loginUsingOtp = (emailOrPhone?: string, otp?: string) => {
  return HTTP.post('auth/signin-using-otp', {
      phone: emailOrPhone,
      otp
  });
};
