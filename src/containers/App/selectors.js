import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the admin state domain
 */

const selectAdminDomain = state => state.admin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Admin
 */

const makeSelectAdmin = () =>
  createSelector(
    selectAdminDomain,
    substate => substate,
  );
const makeSelectPageViews = () =>
  createSelector(
    selectAdminDomain,
    state => state.vitrinPageViews,
  );
const makeSelectCallRequests = () =>
  createSelector(
    selectAdminDomain,
    state => state.vitrinCallRequests,
  );
const makeSelectFoodAdminOrders = () =>
  createSelector(
    selectAdminDomain,
    state => state.foodAdminOrders,
  );
const makeSelectEcommerceAdminOrders = () =>
  createSelector(
    selectAdminDomain,
    state => state.ecommerceAdminOrders,
  );
const makeSelectFoodAdminOrder = () =>
  createSelector(
    selectAdminDomain,
    state => state.foodAdminOrder,
  );
const makeSelectEcommerceAdminOrder = () =>
  createSelector(
    selectAdminDomain,
    state => state.ecommerceAdminOrder,
  );

const makeSelectAdminSupermarketOrders = () =>
  createSelector(
    selectAdminDomain,
    substate => substate,
  );
const makeSelectSuperMarketAdminOrders = () =>
  createSelector(
    selectAdminDomain,
    state => state.superMarketAdminOrders,
  );
const makeSelectSuperMarketAdminOrder = () =>
  createSelector(
    selectAdminDomain,
    state => state.superMarketAdminOrder,
  );
const makeSelectAdminReviews = () =>
  createSelector(
    selectAdminDomain,
    state => state.reviews,
  );
const makeSelectAdminReview = () =>
  createSelector(
    selectAdminDomain,
    state => state.review,
  );
const makeSelectAdminSelectedDeliveryDate = () =>
  createSelector(
    selectAdminDomain,
    state => state.selectedDeliveryDate,
  );

export default makeSelectAdmin;
export {
  makeSelectCallRequests,
  makeSelectPageViews,
  selectAdminDomain,
  makeSelectFoodAdminOrders,
  makeSelectEcommerceAdminOrders,
  makeSelectFoodAdminOrder,
  makeSelectEcommerceAdminOrder,
  makeSelectAdminSupermarketOrders,
  makeSelectSuperMarketAdminOrders,
  makeSelectSuperMarketAdminOrder,
  makeSelectAdminReviews,
  makeSelectAdminReview,
  makeSelectAdminSelectedDeliveryDate,
};
