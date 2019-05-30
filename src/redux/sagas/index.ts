import {Types} from '@types';
import {all, takeLatest} from 'redux-saga/effects';
import {startRace} from './Race';

export default function* rootSaga() {
  return yield all([
    yield takeLatest(Types.USER_LOGIN, startRace),
  ]);
}
