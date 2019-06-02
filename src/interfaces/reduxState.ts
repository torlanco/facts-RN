import { IOnline } from './online';
import { IOutlets } from './outlets';

export interface IReduxState {
  online: IOnline.StateToProps;
  outlets: IOutlets.StateToProps;
}
