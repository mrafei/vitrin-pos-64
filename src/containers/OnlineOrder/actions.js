/*
 *
 * Admin actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ADMIN_ORDER,
  SET_ADMIN_ORDER,
  ACCEPT_ORDER,
  CANCEL_ORDER,
  REQUEST_ALOPEYK,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAdminOrder(data) {
  return {
    type: GET_ADMIN_ORDER,
    data,
  };
}
export function requestAlopeyk(order_id) {
  return {
    type: REQUEST_ALOPEYK,
    data: { order_id },
  };
}
export function setAdminOrder(data) {
  return {
    type: SET_ADMIN_ORDER,
    data,
  };
}

export function acceptOrder(data) {
  return {
    type: ACCEPT_ORDER,
    data,
  };
}

export function cancelOrder(data) {
  return {
    type: CANCEL_ORDER,
    data,
  };
}
