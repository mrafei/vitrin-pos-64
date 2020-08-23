/*
 *
 * Admin actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_CATEGORY_ORDER,
  SET_GROUP_DISCOUNT,
  SET_GROUP_PACKAGING_PRICE,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeCategoryOrder(id, newIndex) {
  return {
    type: CHANGE_CATEGORY_ORDER,
    data: {
      id,
      newIndex,
    },
  };
}

export function setGroupDiscount(percent, id) {
  return {
    type: SET_GROUP_DISCOUNT,
    data: {
      percent,
      id,
    },
  };
}

export function setGroupPackagingPrice(id, amount) {
  return {
    type: SET_GROUP_PACKAGING_PRICE,
    data: { id, amount },
  };
}
