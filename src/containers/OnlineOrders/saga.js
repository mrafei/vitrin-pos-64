/* eslint-disable no-console */
import { call, put, takeLatest, select } from '@redux-saga/core/effects';
import {stopLoading } from './actions';

import request from '../../../utils/request';
import {
  BUSINESS_ORDERS_API,
  USER_ORDERS_ITEMS_API,
} from '../../../utils/api';
import {
  setFoodAdminOrders,
  setFoodAdminOrder,
  getFoodAdminOrders
} from './actions';
import {
  GET_FOOD_ADMIN_ORDERS,
  GET_FOOD_ADMIN_ORDER,
} from './constants';
import { makeSelectSubDomain } from '../App/selectors';

export function* getFoodAdminOrdersFunc(action) {
  try {
    const domain = yield select(makeSelectSubDomain());
    const page = action.data || 1;
    const {
      response: { data, pagination }
    } = yield call(
      request,
      BUSINESS_ORDERS_API('food', page),
      { domain },
      'PATCH'
    );

    if (data) {
      yield put(setFoodAdminOrders(data, pagination));
    }
  } catch (err) {
    console.log(err);
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

export default function* adminPanelAppSaga() {
  yield takeLatest(GET_FOOD_ADMIN_ORDERS, getFoodAdminOrdersFunc);
  yield takeLatest(GET_FOOD_ADMIN_ORDER, getFoodAdminOrder);
}
