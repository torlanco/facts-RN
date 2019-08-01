import { Types } from '@types';
import { IOnline } from '@interfaces/online';

export const Creators: IOnline.DispatchFromProps = {
  offline: () => ({ type: Types.OFFLINE }),
  online: () => ({ type: Types.ONLINE })
};
