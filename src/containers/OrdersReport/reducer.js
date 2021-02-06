/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import {
  SET_ADMIN_ORDERS,
  DEFAULT_ACTION,
  SET_ORDERS_REPORT,
} from './constants';

export const initialState = {
  adminOrders: [],
  adminOrdersPagination: {},
  reportLoading: false,
  report: {},
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ADMIN_ORDERS:
        draft.adminOrders = action.data;
        draft.adminOrdersPagination = action.pagination;
        break;
      case SET_ORDERS_REPORT:
        draft.report = action.data;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default adminReducer;
