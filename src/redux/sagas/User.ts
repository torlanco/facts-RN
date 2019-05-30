import { call, put } from 'redux-saga/effects';
import { login } from '@services';
// interfaces
import { Types } from '@types';

export function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload.data);
    const { data } = response;
    yield put({
      type: Types.USER_LOGIN_SUCCESS,
      payload: { data }
    });
  } catch (response) {
    const { data } = response;
    yield put({
      type: Types.USER_LOGIN_FAILED,
      payload: { message: data.error }
    });
  }
}