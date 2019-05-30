import { PARSE_CONFIG, HTTP } from '../http';
import qs from 'qs';

// interfaces
import { IUser } from '@interfaces/user';

// USERS
export const login = (params: IUser.IUserLoginParams) => {
  return HTTP.get(`login?${qs.stringify(params)}`);
};