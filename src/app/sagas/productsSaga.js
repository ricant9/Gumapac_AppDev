import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from '../reducers/productsReducer';
import { fetchProducts } from '../api/products';

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProducts);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export function* watchProducts() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}
