/* eslint-disable no-console */
import { call, put, takeLatest } from "@redux-saga/core/effects";

import request from "../../../utils/request";
import {
  USER_ORDERS_ITEMS_API,
  ORDER_STATUS_PROGRESS_API,
  ORDER_STATUS_CANCELLED_API,
  ORDER_DELIVERY_TIME_API,
  ORDER_DELIVERER_API,
  REQUEST_ALOPEYK_API,
} from "../../../utils/api";
import { setFoodAdminOrder } from "./actions";
import {
  GET_FOOD_ADMIN_ORDER,
  ACCEPT_FOOD_ORDER,
  CANCEL_FOOD_ORDER,
  REQUEST_ALOPEYK,
} from "./constants";
import { setSnackBarMessage } from "../../../stores/ui/actions";
import {
  startLoading,
  startProgressLoading,
  stopLoading,
  stopProgressLoading,
} from "../App/actions";
import { submitHamiOrder } from "../../../integrations/hami/actions";
import { submitAriaOrder } from "../../../integrations/aria/actions";

export function* getFoodAdminOrder(action) {
  try {
    yield put(startProgressLoading());
    const {
      response: { data },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, "food"),
      {},
      "GET"
    );
    if (data) yield put(setFoodAdminOrder(data));
    yield put(stopProgressLoading());
  } catch (err) {
    yield put(stopProgressLoading());

    yield put(stopLoading());
  }
}

export function* acceptFoodOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      ORDER_DELIVERY_TIME_API(action.data.id, action.data.plugin),
      { delivery_time: action.data.deliveryTime },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      if (action.data.deliverer)
        yield call(
          request,
          ORDER_DELIVERER_API(action.data.id, "food"),
          {
            deliverer_name: action.data.deliverer,
            send_sms: action.data.sendSms,
          },
          "PATCH"
        );

      const {
        response: { data },
      } = yield call(
        request,
        ORDER_STATUS_PROGRESS_API(action.data.id, "food"),
        {},
        "PATCH"
      );
      if (data) {
        yield put(setSnackBarMessage("سفارش مورد نظر تایید شد.", "success"));
        const integration = localStorage.getItem("integrated");
        if (integration === "hami") submitHamiOrder(data);
        if (integration === "aria") submitAriaOrder(data);

        yield put(setFoodAdminOrder(data));
      } else
        yield put(
          setSnackBarMessage("در تایید سفارش خطایی رخ داده است!", "fail")
        );
    } else
      yield put(
        setSnackBarMessage("در تایید سفارش خطایی رخ داده است!", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("در تایید سفارش خطایی رخ داده است!", "fail"));
    yield put(stopLoading());
  }
}

export function* cancelFoodOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_STATUS_CANCELLED_API(action.data.id, "food"),
      {},
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("سفارش مورد نظر لغو شد.", "success"));
      yield put(setFoodAdminOrder(data));
    } else
      yield put(setSnackBarMessage("در لغو سفارش خطایی رخ داده است!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* requestAlopeykFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      REQUEST_ALOPEYK_API(action.data.order_id, "food"),
      {},
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("درخواست الوپیک شما ثبت شد.", "success"));
      yield call(() =>
        getFoodAdminOrder({ data: { id: action.data.order_id } })
      );
    } else
      yield put(
        setSnackBarMessage("در درخواست الوپیک خطایی رخ داده است!", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export default function* adminPanelAppSaga() {
  yield takeLatest(GET_FOOD_ADMIN_ORDER, getFoodAdminOrder);
  yield takeLatest(ACCEPT_FOOD_ORDER, acceptFoodOrder);
  yield takeLatest(CANCEL_FOOD_ORDER, cancelFoodOrder);
  yield takeLatest(REQUEST_ALOPEYK, requestAlopeykFunc);
}
