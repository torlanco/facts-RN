import { IOnline } from './online';
import { IUser } from './user';

export interface IReduxState {
  online: IOnline.StateToProps;
  user: IUser.StateToProps;
}
