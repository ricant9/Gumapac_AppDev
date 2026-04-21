import { all, fork } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchProducts } from './productsSaga';
import { watchOrders } from './ordersSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchProducts),
    fork(watchOrders),
  ]);
}
