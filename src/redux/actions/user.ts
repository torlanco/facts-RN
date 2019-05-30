import { Types } from '@types';
import { IUser } from '@interfaces/user';

export const Creators: IUser.DispatchFromProps = {
  login: (params: IUser.IUserLoginParams) => ({
    type: Types.USER_LOGIN,
    payload: { data: params }
  }),
  logout: () => ({
    type: Types.USER_LOGOUT
  }),
};
