import { IOnline } from './online';
import { IOutlet } from './outlet';
import { IShoppers } from './shopper';

export interface IReduxState {
  online: IOnline.StateToProps;
  outlets: IOutlet.StateToProps;
  shoppers: IShoppers.StateToProps;
}
