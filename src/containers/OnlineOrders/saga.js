/* eslint-disable no-console */
import { call, put, takeLatest, select } from "@redux-saga/core/effects";

import request from "../../../utils/request";
import { BUSINESS_ORDERS_API } from "../../../utils/api";
const { ipcRenderer } = require("electron");
import { setFoodAdminOrders } from "./actions";
import { GET_FOOD_ADMIN_ORDERS, ADMIN_ORDERS_PAGE_SIZE } from "./constants";
import { makeSelectSubDomain } from "../App/selectors";
import { startProgressLoading, stopProgressLoading } from "../App/actions";

export function* getFoodAdminOrdersFunc(action) {
  try {
    yield put(startProgressLoading());
    const domain = yield select(makeSelectSubDomain());
    const page = action.data || 1;
    const {
      response: { data, pagination },
    } = yield call(
      request,
      BUSINESS_ORDERS_API("shopping"),
      { page_size: ADMIN_ORDERS_PAGE_SIZE, domain, page },
      "GET"
    );
    const pagesCount = Math.ceil(pagination.count / ADMIN_ORDERS_PAGE_SIZE);

    if (data) {
      data.map((order) => {
        ipcRenderer.send("insertOrder", order);
      });
      yield put(setFoodAdminOrders(data, { ...pagination, pagesCount }));
    }
    yield put(stopProgressLoading());
  } catch (err) {
    yield put(stopProgressLoading());
    console.log(err);
  }
}

export default function* adminPanelAppSaga() {
  yield takeLatest(GET_FOOD_ADMIN_ORDERS, getFoodAdminOrdersFunc);
}
