/*
 *
 * Admin actions
 *
 */

import {
  ACTIVATE_TRIAL,
  SET_FOOD_ADMIN_ORDERS,
  SET_ECOMMERCE_ADMIN_ORDERS,
  BUY_PLUGIN,
  DEFAULT_ACTION,
  GET_FOOD_ADMIN_ORDERS,
  GET_ECOMMERCE_ADMIN_ORDERS,
  GET_SUPERMARKET_ORDERS,
  SET_SUPERMARKET_ORDERS,
  SET_SUPERMARKET_ORDER,
  GET_SUPERMARKET_ORDER,
  ACCEPT_SUPERMARKET_ORDER,
  CANCEL_SUPERMARKET_ORDER,
  GET_VITRIN_PAGE_VIEWS,
  SET_VITRIN_CALL_BUTTON_CLICKS,
  GET_VITRIN_CALL_BUTTON_CLICKS,
  SET_VITRIN_PAGE_VIEWS,
  GET_FOOD_ADMIN_ORDER,
  GET_ECOMMERCE_ADMIN_ORDER,
  SET_FOOD_ADMIN_ORDER,
  SET_ECOMMERCE_ADMIN_ORDER,
  ACCEPT_FOOD_ORDER,
  ACCEPT_ECOMMERCE_ORDER,
  CANCEL_FOOD_ORDER,
  CANCEL_ECOMMERCE_ORDER,
  SEND_GROUP_VISIT_CARD,
  SEND_VISIT_CARD,
  SEND_CUSTOM_VISIT_CARD,
  SET_ADMIN_REVIEWS,
  GET_ADMIN_REVIEWS,
  GET_ADMIN_REVIEW,
  SET_ADMIN_REVIEW,
  SET_SELECTED_DELIVERY_DATE,
  CHANGE_CATEGORY_ORDER,
  NEW_SECTION_ORDERING,
  SET_GROUP_DISCOUNT,
  SET_DELIVERY_TIME, STOP_LOADING, START_LOADING
} from './constants';

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

export function newSectionOrdering(sections) {
  return {
    type: NEW_SECTION_ORDERING,
    data: sections,
  };
}

export function getSuperMarketAdminOrders() {
  return {
    type: GET_SUPERMARKET_ORDERS,
  };
}
export function setSuperMarketAdminOrders(data) {
  return {
    type: SET_SUPERMARKET_ORDERS,
    data,
  };
}

export function getSuperMarketAdminOrder(data) {
  return {
    type: GET_SUPERMARKET_ORDER,
    data,
  };
}
export function setSuperMarketAdminOrder(data) {
  return {
    type: SET_SUPERMARKET_ORDER,
    data,
  };
}
export function acceptSuperMarketOrder(data) {
  return {
    type: ACCEPT_SUPERMARKET_ORDER,
    data,
  };
}
export function cancelSuperMarketOrder(data) {
  return {
    type: CANCEL_SUPERMARKET_ORDER,
    data,
  };
}

export function getFoodAdminOrders() {
  return {
    type: GET_FOOD_ADMIN_ORDERS,
  };
}

export function getEcommerceAdminOrders() {
  return {
    type: GET_ECOMMERCE_ADMIN_ORDERS,
  };
}

export function setFoodAdminOrders(data) {
  return {
    type: SET_FOOD_ADMIN_ORDERS,
    data,
  };
}

export function setEcommerceAdminOrders(data) {
  return {
    type: SET_ECOMMERCE_ADMIN_ORDERS,
    data,
  };
}

export function getFoodAdminOrder(data) {
  return {
    type: GET_FOOD_ADMIN_ORDER,
    data,
  };
}

export function getEcommerceAdminOrder(data) {
  return {
    type: GET_ECOMMERCE_ADMIN_ORDER,
    data,
  };
}

export function setFoodAdminOrder(data) {
  return {
    type: SET_FOOD_ADMIN_ORDER,
    data,
  };
}

export function setEcommerceAdminOrder(data) {
  return {
    type: SET_ECOMMERCE_ADMIN_ORDER,
    data,
  };
}

export function getAdminPageViews() {
  return {
    type: GET_VITRIN_PAGE_VIEWS,
  };
}
export function setAdminPageViews(data) {
  return {
    type: SET_VITRIN_PAGE_VIEWS,
    data,
  };
}
export function getAdminCallRequests() {
  return {
    type: GET_VITRIN_CALL_BUTTON_CLICKS,
  };
}
export function setAdminCallRequests(data) {
  return {
    type: SET_VITRIN_CALL_BUTTON_CLICKS,
    data,
  };
}
export function acceptFoodOrder(data) {
  return {
    type: ACCEPT_FOOD_ORDER,
    data,
  };
}
export function setDeliveryTime(data) {
  return {
    type: SET_DELIVERY_TIME,
    data,
  };
}
export function acceptEcommerceOrder(data) {
  return {
    type: ACCEPT_ECOMMERCE_ORDER,
    data,
  };
}
export function cancelFoodOrder(data) {
  return {
    type: CANCEL_FOOD_ORDER,
    data,
  };
}
export function cancelEcommerceOrder(data) {
  return {
    type: CANCEL_ECOMMERCE_ORDER,
    data,
  };
}
export function buyPlugin(data, businessSlug) {
  return {
    type: BUY_PLUGIN,
    data,
    businessSlug,
  };
}

export function activateTrial(data, businessSlug, history) {
  return {
    type: ACTIVATE_TRIAL,
    data,
    businessSlug,
    history,
  };
}

export function sendVisitCard(data) {
  return {
    type: SEND_VISIT_CARD,
    data,
  };
}

export function sendGroupVisitCard(data) {
  return {
    type: SEND_GROUP_VISIT_CARD,
    data,
  };
}

export function sendCustomVisitCard(data) {
  return {
    type: SEND_CUSTOM_VISIT_CARD,
    data,
  };
}

export function getAdminReviews() {
  return {
    type: GET_ADMIN_REVIEWS,
  };
}

export function setAdminReviews(data) {
  return {
    type: SET_ADMIN_REVIEWS,
    data,
  };
}
export function getAdminReview(data) {
  return {
    type: GET_ADMIN_REVIEW,
    data,
  };
}

export function setAdminReview(data) {
  return {
    type: SET_ADMIN_REVIEW,
    data,
  };
}

export function setSelectedDeliveryDate(data) {
  return {
    type: SET_SELECTED_DELIVERY_DATE,
    data,
  };
}

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
  };
}
