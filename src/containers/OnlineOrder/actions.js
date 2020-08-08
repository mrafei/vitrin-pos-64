/*
 *
 * Admin actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_FOOD_ADMIN_ORDER,
  SET_FOOD_ADMIN_ORDER,
  ACCEPT_FOOD_ORDER,
  CANCEL_FOOD_ORDER,
  REQUEST_ALOPEYK,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFoodAdminOrder(data) {
  return {
    type: GET_FOOD_ADMIN_ORDER,
    data,
  };
}
export function requestAlopeyk(order_id) {
  return {
    type: REQUEST_ALOPEYK,
    data: { order_id },
  };
}
export function setFoodAdminOrder(data) {
  return {
    type: SET_FOOD_ADMIN_ORDER,
    data,
  };
}

export function acceptFoodOrder(data) {
  return {
    type: ACCEPT_FOOD_ORDER,
    data,
  };
}

export function cancelFoodOrder(data) {
  return {
    type: CANCEL_FOOD_ORDER,
    data,
  };
}
