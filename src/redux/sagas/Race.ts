import { call, take, race, select } from 'redux-saga/effects';

// interfaces
import { Types } from '@types';
import { IReduxState } from '@interfaces/reduxState';
import { handleLogin } from './User';

export function* startRace(action) {
  try {
    const { isOnline } = yield select((state: IReduxState) => {
      return state.online;
    });
    // check to see if we are online
    // if we are not wait until we resume online
    // then continue making the request
    if (!isOnline) {
      yield take(Types.ONLINE);
    }
    let request;
    switch (action.type) {
      case Types.USER_LOGIN:
        request = handleLogin;
        break;
      default:
        break;
    }
    // We set up set up a race everytime we make a get request
    // If the other actions happen before finishing the current request
    // we cancel the request
    // Additionally, logout and app deselect will reset the state
    // Going offline will wait for a ONLINE flag and retry the request
    const { offline } = yield race({
      request: call(request, action),
      offline: take(Types.OFFLINE)
    });
    if (offline) {
      // wait for online flag then try request again
      yield take(Types.ONLINE);
      yield call(startRace, action);
    }
  } catch (err) {
    console.log(err);
  }
}
