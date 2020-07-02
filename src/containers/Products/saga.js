/* eslint-disable no-console */
import { call, put, takeLatest } from "@redux-saga/core/effects";

import request from "../../../utils/request";
import { CHANGE_CATEGORY_ORDER } from "./constants";
import { CATEGORIES_ITEMS_CHANGE_ORDER_API } from "../../../utils/api";
import { startLoading, stopLoading } from "../App/actions";

export function* changeCategoryOrderFunc({ data: { id, newIndex } }) {
  try {
    yield put(startLoading());
    yield call(
      request,
      CATEGORIES_ITEMS_CHANGE_ORDER_API(id),
      {
        order: newIndex,
      },
      "PATCH"
    );
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export default function* adminPanelAppSaga() {
  yield takeLatest(CHANGE_CATEGORY_ORDER, changeCategoryOrderFunc);
}
