/* eslint-disable no-console */
import { call, put, select, takeLatest } from "@redux-saga/core/effects";

import request from "../../../utils/request";
import {
  USER_ORDERS_ITEMS_API,
  ORDER_STATUS_PROGRESS_API,
  ORDER_STATUS_CANCELLED_API,
  ORDER_DELIVERY_TIME_API,
  ORDER_DELIVERER_API,
  REQUEST_ALOPEYK_API,
  REQUEST_MIARE_API,
  CUSTOMER_ORDERS_API,
} from "../../../utils/api";
import { setAdminOrder, setCustomerOrders } from "./actions";
import {
  GET_ADMIN_ORDER,
  ACCEPT_ORDER,
  CANCEL_ORDER,
  REQUEST_ALOPEYK,
  REQUEST_MIARE,
  GET_CUSTOMER_ORDERS,
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
import { makeSelectSubDomain } from "../App/selectors";

export function* getAdminOrder(action) {
  try {
    yield put(startProgressLoading());
    const {
      response: { data },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, "shopping"),
      {},
      "GET"
    );
    if (data) yield put(setAdminOrder(data));
    yield put(stopProgressLoading());
  } catch (err) {
    yield put(stopProgressLoading());

    yield put(stopLoading());
  }
}

export function* acceptOrder(action) {
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
          ORDER_DELIVERER_API(action.data.id, "shopping"),
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
        ORDER_STATUS_PROGRESS_API(action.data.id, "shopping"),
        {},
        "PATCH"
      );
      if (data) {
        yield put(setSnackBarMessage("سفارش مورد نظر تایید شد.", "success"));
        const integration = localStorage.getItem("integrated");
        if (integration === "hami") submitHamiOrder(data);
        if (integration === "aria") submitAriaOrder(data);

        yield put(setAdminOrder(data));
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

export function* cancelOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_STATUS_CANCELLED_API(action.data.id, "shopping"),
      {},
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("سفارش مورد نظر لغو شد.", "success"));
      yield put(setAdminOrder(data));
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
      REQUEST_ALOPEYK_API(action.data.order_id, "shopping"),
      {},
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("درخواست الوپیک شما ثبت شد.", "success"));
      yield call(() => getAdminOrder({ data: { id: action.data.order_id } }));
    } else {
      yield put(
        setSnackBarMessage("در درخواست الوپیک خطایی رخ داده است!", "fail")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* requestMiareFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      REQUEST_MIARE_API(action.data.order_id, "shopping"),
      {},
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("درخواست میاره شما ثبت شد.", "success"));
      yield call(() => getAdminOrder({ data: { id: action.data.order_id } }));
    } else {
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getCustomerOrdersFunc(action) {
  try {
    yield put(startProgressLoading());
    const domain = yield select(makeSelectSubDomain());
    const {
      response: { data },
    } = yield call(
      request,
      CUSTOMER_ORDERS_API,
      { domain, user: action.data.userId },
      "GET"
    );

    if (data) {
      yield put(setCustomerOrders(data));
    }
    yield put(stopProgressLoading());
  } catch (err) {
    yield put(stopProgressLoading());
    console.log(err);
  }
}

export default function* adminPanelAppSaga() {
  yield takeLatest(GET_ADMIN_ORDER, getAdminOrder);
  yield takeLatest(ACCEPT_ORDER, acceptOrder);
  yield takeLatest(CANCEL_ORDER, cancelOrder);
  yield takeLatest(REQUEST_ALOPEYK, requestAlopeykFunc);
  yield takeLatest(REQUEST_MIARE, requestMiareFunc);
  yield takeLatest(GET_CUSTOMER_ORDERS, getCustomerOrdersFunc);
}
