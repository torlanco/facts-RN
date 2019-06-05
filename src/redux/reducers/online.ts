import { Types } from '@types';
import { IOnline } from '@interfaces/online';
import { AnyAction } from 'redux';

const initialState: IOnline.StateToProps = {
  isOnline: false
};

export function online(
  state: IOnline.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case Types.OFFLINE:
      return { isOnline: false };
    case Types.ONLINE:
      return { isOnline: true };
    default:
      return state;
  }
}
