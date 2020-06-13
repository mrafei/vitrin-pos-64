/* eslint-disable no-console */
import { call, put, takeLatest, select } from '@redux-saga/core/effects';
import { startLoading, stopLoading } from './actions';

import request from '../../../utils/request';
import {
  BUSINESS_ORDERS_API,
  USER_ORDERS_ITEMS_API,
  ORDER_STATUS_PROGRESS_API,
  ORDER_STATUS_CANCELLED_API
} from '../../../utils/api';
import {
  setFoodAdminOrders,
  setFoodAdminOrder,
  getFoodAdminOrders
} from './actions';
import {
  GET_FOOD_ADMIN_ORDERS,
  GET_FOOD_ADMIN_ORDER,
  ACCEPT_FOOD_ORDER,
  CANCEL_FOOD_ORDER
} from './constants';
import {
  makeSelectBusinessSiteDomain
} from '../../../stores/business/selector';
import { setSnackBarMessage } from '../../../stores/ui/actions';

export function* getFoodAdminOrdersFunc() {
  try {
    const domain = yield select(makeSelectBusinessSiteDomain());
    const {
      response: { data }
    } = yield call(
      request,
      BUSINESS_ORDERS_API('food'),
      { domain },
      'PATCH'
    );

    if (data) {
      yield put(setFoodAdminOrders(data));
    }
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getFoodAdminOrder(action) {
  try {
    const {
      response: { data }
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, 'food'),
      {},
      'GET'
    );
    if (data) yield put(setFoodAdminOrder(data));
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* acceptFoodOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data }
    } = yield call(
      request,
      ORDER_STATUS_PROGRESS_API(action.data.id, 'food'),
      {},
      'PATCH'
    );
    if (data) {
      yield put(setSnackBarMessage('سفارش مورد نظر تایید شد.', 'success'));
      yield put(setFoodAdminOrder(data));
      yield put(getFoodAdminOrders());
    } else
      yield put(
        setSnackBarMessage('در تایید سفارش خطایی رخ داده است!', 'fail')
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('در تایید سفارش خطایی رخ داده است!', 'fail'));
    yield put(stopLoading());
  }
}


export function* cancelFoodOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data }
    } = yield call(
      request,
      ORDER_STATUS_CANCELLED_API(action.data.id, 'food'),
      {},
      'PATCH'
    );
    if (data) {
      yield put(setSnackBarMessage('سفارش مورد نظر لغو شد.', 'success'));
      yield put(setFoodAdminOrder(data));
      yield put(getFoodAdminOrders());
    } else
      yield put(setSnackBarMessage('در لغو سفارش خطایی رخ داده است!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export default function* adminPanelAppSaga() {
  yield takeLatest(GET_FOOD_ADMIN_ORDERS, getFoodAdminOrdersFunc);
  yield takeLatest(GET_FOOD_ADMIN_ORDER, getFoodAdminOrder);
  yield takeLatest(ACCEPT_FOOD_ORDER, acceptFoodOrder);
  yield takeLatest(CANCEL_FOOD_ORDER, cancelFoodOrder);
}
