import { Action } from 'redux';

export namespace IUser {
  export interface IUserData {
    objectId?: string;
    username?: string;
    full_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    emailNotifications?: boolean;
    profilePicture?: {
      __type?: string;
      name?: string;
      url?: string;
    };
    sessionToken?: string;
  }
  export interface IUserRegisterParams {
    full_name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
  }

  export interface IUserLoginParams {
    username?: string;
    password?: string;
  }
  export interface IUserUpdateParams {
    objectId?: string;
    email?: string;
    username?: string;
    full_name?: string;
    phone?: string;
    profilePicture?: {
      __type?: string;
      name?: string;
      url?: string;
    };
  }
  export interface IUserNotificationParams {
    objectId?: string;
    deviceToken: string;
  }

  export interface StateToProps {
    error: string | boolean;
    loading: boolean;
    user: IUserData | undefined;
  }
  export interface DispatchFromProps {
    register(params: IUserRegisterParams): Action;
    login(params: IUserLoginParams): Action;
    logout(): Action;
    userUpdate(params: IUserUpdateParams): Action;
  }
}
