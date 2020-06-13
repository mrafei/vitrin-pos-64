/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import {
  SET_FOOD_ADMIN_ORDERS,
  SET_ECOMMERCE_ADMIN_ORDERS,
  DEFAULT_ACTION,
  SET_SUPERMARKET_ORDERS,
  SET_SUPERMARKET_ORDER,
  SET_VITRIN_PAGE_VIEWS,
  SET_VITRIN_CALL_BUTTON_CLICKS,
  SET_FOOD_ADMIN_ORDER,
  SET_ECOMMERCE_ADMIN_ORDER,
  SET_ADMIN_REVIEWS,
  SET_ADMIN_REVIEW,
  SET_SELECTED_DELIVERY_DATE, START_LOADING, STOP_LOADING
} from './constants';

export const initialState = {
  foodAdminOrders: [],
  foodAdminOrder: { items: [] },
  ecommerceAdminOrders: [],
  ecommerceAdminOrder: { items: [] },
  superMarketAdminOrders: [],
  superMarketAdminOrder: { items: [] },
  reviews: [],
  review: null,
  vitrinPageViews: null,
  vitrinCallRequests: null,
  selectedDeliveryDate: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_LOADING:
        draft.loading = true;
        break;

      case STOP_LOADING:
        draft.loading = false;
        break;
      case SET_FOOD_ADMIN_ORDERS:
        draft.foodAdminOrders = action.data;
        break;
      case SET_ECOMMERCE_ADMIN_ORDERS:
        draft.ecommerceAdminOrders = action.data;
        break;
      case SET_FOOD_ADMIN_ORDER:
        draft.foodAdminOrder = action.data;
        break;
      case SET_ECOMMERCE_ADMIN_ORDER:
        draft.ecommerceAdminOrder = action.data;
        break;
      case SET_SUPERMARKET_ORDERS:
        draft.superMarketAdminOrders = action.data;
        break;
      case SET_SUPERMARKET_ORDER:
        draft.superMarketAdminOrder = action.data;
        break;
      case SET_VITRIN_PAGE_VIEWS:
        draft.vitrinPageViews = action.data;
        break;
      case SET_VITRIN_CALL_BUTTON_CLICKS:
        draft.vitrinCallRequests = action.data;
        break;
      case SET_ADMIN_REVIEWS:
        draft.reviews = action.data;
        break;
      case SET_ADMIN_REVIEW:
        draft.review = action.data;
        break;
      case SET_SELECTED_DELIVERY_DATE:
        draft.selectedDeliveryDate = action.data;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default adminReducer;
