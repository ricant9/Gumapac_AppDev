import { takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from '../reducers/ordersReducer';
import { CLEAR_CART } from '../reducers/cartReducer';
import { fetchOrders, createOrder } from '../api/orders';

function* fetchOrdersSaga() {
  try {
    const orders = yield call(fetchOrders);
    yield put({ type: FETCH_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    yield put({ type: FETCH_ORDERS_FAILURE, payload: error.message });
  }
}

function* createOrderSaga(action) {
  try {
    const order = yield call(createOrder, action.payload);
    yield put({ type: CREATE_ORDER_SUCCESS, payload: order });
    yield put({ type: CLEAR_CART });
    Alert.alert('Success', 'Your order has been placed!');
  } catch (error) {
    yield put({ type: CREATE_ORDER_FAILURE, payload: error.message });
    Alert.alert('Error', error.message || 'Failed to create order');
  }
}

export function* watchOrders() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga);
  yield takeLatest(CREATE_ORDER_REQUEST, createOrderSaga);
}
