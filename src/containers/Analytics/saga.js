/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { call, put, takeLatest, select } from '@redux-saga/core/effects';
import request from '../../../utils/request';
import { GET_ANALYTICS_DATA } from './constants';
import { startLoading, stopLoading } from '../App/actions';
import { makeSelectBusinessId } from '../../../stores/business/selector';
import { ORDER_ANALYTICS_DATA_API } from '../../../utils/api';
import { setAnalyticsData } from './actions';
export function* getFoodAnalyticsData() {
  try {
    yield put(startLoading());
    const id = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(request, ORDER_ANALYTICS_DATA_API('food'), { id }, 'PATCH');
    if (data) yield put(setAnalyticsData(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export default function* adminPanelAppSaga() {
  yield takeLatest(GET_ANALYTICS_DATA, getFoodAnalyticsData);
}
