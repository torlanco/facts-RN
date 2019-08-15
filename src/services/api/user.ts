import HTTP from '../http';

export const login = (email?: string, password?: string) => {
  return HTTP.get('categories/review');
};

export const forgetPassword = (email?: string) => {
    return HTTP.get('categories/review');
};

export const register = (name?: string, email?: string, password?: string) => {
    return HTTP.get('categories/review');
};