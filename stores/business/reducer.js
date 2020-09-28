/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import { SET_BUSINESS, SET_DELIVERIES } from "./constants";
import { SET_PRINTER_OPTIONS } from "../../src/containers/App/constants";
import { CHANGE_CATEGORY_ORDER } from "../../src/containers/Products/constants";

// The initial state of the App
export const initialState = {
  business: {},
  deliveries: [],
  deliveriesPagination: {},
  printerOptions: {
    title: "",
    website: "",
    phone: "",
    printers: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BUSINESS:
        draft.business = action.data;
        break;
      case SET_DELIVERIES:
        draft.deliveries = action.data;
        draft.deliveriesPagination = action.pagination;
        break;
      case SET_PRINTER_OPTIONS:
        draft.printerOptions = action.data;
        break;
      case CHANGE_CATEGORY_ORDER:
        draft.business.deal_categories.splice(
          action.data.newIndex,
          0,
          draft.business.deal_categories.splice(
            draft.business.deal_categories.findIndex(
              (c) => c.id === action.data.id
            ),
            1
          )[0]
        );
    }
  });

export default appReducer;
