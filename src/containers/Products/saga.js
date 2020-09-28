/* eslint-disable no-console */
import { call, put, takeLatest } from "@redux-saga/core/effects";

import request from "../../../utils/request";
import {
  CHANGE_CATEGORY_ORDER,
  SET_GROUP_DISCOUNT,
  SET_GROUP_PACKAGING_PRICE,
} from "./constants";
import {
  CATEGORIES_ITEMS_CHANGE_ORDER_API,
  GROUP_DISCOUNT_ON_DEALS,
  GROUP_PACKAGING_PRICE_ON_DEALS_API,
} from "../../../utils/api";
import { startLoading, stopLoading } from "../App/actions";
import { setSnackBarMessage } from "../../../stores/ui/actions";
import { getBusinessData } from "../../../stores/business/saga";

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
export function* setGroupDiscountFunc({ data: { percent, id } }) {
  try {
    yield put(startLoading());
    yield call(
      request,
      GROUP_DISCOUNT_ON_DEALS(id),
      {
        percent: +percent,
      },
      "PATCH"
    );
    yield put(setSnackBarMessage("تخفیف با موفقیت اعمال شد.", "success"));
    yield put(stopLoading());
    yield call(getBusinessData);
  } catch (err) {
    yield put(setSnackBarMessage("اعمال تخفیف موفقیت آمیز نبود!", "fail"));
    yield put(stopLoading());
  }
}
export function* setGroupPackagingPriceFunc({ data: { amount, id } }) {
  try {
    yield put(startLoading());
    yield call(
      request,
      GROUP_PACKAGING_PRICE_ON_DEALS_API(id),
      {
        amount: +amount,
      },
      "PATCH"
    );
    yield put(
      setSnackBarMessage("هزینه بسته‌بندی گروهی با موفقیت اعمال شد.", "success")
    );
    yield put(stopLoading());
    yield call(getBusinessData);
  } catch (err) {
    yield put(
      setSnackBarMessage(
        "اعمال هزینه بسته‌بندی گروهی موفقیت آمیز نبود!",
        "fail"
      )
    );
    yield put(stopLoading());
  }
}
export default function* adminPanelAppSaga() {
  yield takeLatest(CHANGE_CATEGORY_ORDER, changeCategoryOrderFunc);
  yield takeLatest(SET_GROUP_DISCOUNT, setGroupDiscountFunc);
  yield takeLatest(SET_GROUP_PACKAGING_PRICE, setGroupPackagingPriceFunc);
}
