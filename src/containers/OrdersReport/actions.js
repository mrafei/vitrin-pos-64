/*
 *
 * Admin actions
 *
 */

import {
  SET_FOOD_ADMIN_ORDERS,
  DEFAULT_ACTION,
  GET_FOOD_ADMIN_ORDERS,
  GET_ORDERS_REPORT,
  SET_ORDERS_REPORT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrdersReport(params) {
  return {
    type: GET_ORDERS_REPORT,
    data: params,
  };
}

export function setOrdersReport(data) {
  return {
    type: SET_ORDERS_REPORT,
    data,
  };
}
export function getFoodAdminOrders(params) {
  return {
    type: GET_FOOD_ADMIN_ORDERS,
    data: params,
  };
}

export function setFoodAdminOrders(data, pagination) {
  return {
    type: SET_FOOD_ADMIN_ORDERS,
    data,
    pagination,
  };
}
