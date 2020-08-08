/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
import '../../../styles/_main.scss';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import Snackbar from '@material-ui/core/esm/Snackbar';
import { connect } from 'react-redux';
import Axios from 'axios';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import OnlineOrders from '../OnlineOrders';
import Login from '../Login';
import { getBusinesses } from '../../../stores/user/actions';
import Layout from '../../components/Layout';
import OnlineOrder from '../OnlineOrder';
import { makeSelectProgressLoading, makeSelectSubDomain } from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { setSnackBarMessage } from '../../../stores/ui/actions';
import { makeSelectSnackBarMessage } from '../../../stores/ui/selector';
import initPushNotification from '../pushNotification';
import { getFoodAdminOrders } from '../OnlineOrders/actions';
import { makeSelectBusinessTitle } from '../../../stores/business/selector';
import DeliverersList from '../DeliverersList';
import CreateDeliverer from '../CreateDeliverer';
import EditDeliverer from '../EditDeliverer';
import DeliveriesList from '../DeliveriesList';
import PrinterSettings from '../PrinterSettings';
import AssignDeliverer from '../AssignDeliverer';
import Products from '../Products';
import EditProduct from '../EditProduct';
import Analytics from '../Analytics';
import OrdersReport from "../OrdersReport";

const App = function ({
  history,
  _getBusinesses,
  location,
  siteDomain,
  _setSnackBarMessage,
  snackBarMessage,
  _getAdminOrders,
  businessTitle,
  progressLoading,
}) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      _getBusinesses();
    } else history.push('/login');
    document.addEventListener('keydown', function (zEvent) {
      if (zEvent.ctrlKey && zEvent.shiftKey && zEvent.key === 'X') {
        delete Axios.defaults.headers.common.Authorization;
        localStorage.clear();
        history.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    if (siteDomain)
      initPushNotification(
        _setSnackBarMessage,
        history,
        _getAdminOrders,
        siteDomain,
      );
  }, [siteDomain]);

  if (!siteDomain && location.pathname !== '/login')
    return (
      <div
        style={{ height: '100vh' }}
        className="d-flex align-items-center justify-content-center"
      >
        <LoadingIndicator />
      </div>
    );
  return (
    <>
      <div className="u-height-100vh w-100 u-background-melo-grey d-flex h-100">
        <Layout
          location={location}
          title={businessTitle}
          loading={progressLoading}
        >
          <Switch>
            <Route exact path="/empty" component={LoadingIndicator} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reports/analytics" component={Analytics} />
            <Route exact path="/reports/orders" component={OrdersReport} />

            <Route exact path="/orders/all" component={OnlineOrders} />
            <Route exact path="/orders/:id" component={OnlineOrder} />

            <Route
              exact
              path="/delivery/deliverers/new"
              component={CreateDeliverer}
            />
            <Route
              exact
              path="/delivery/deliverers/:id"
              component={EditDeliverer}
            />
            <Route exact path="/delivery/assign" component={AssignDeliverer} />
            <Route
              exact
              path="/delivery/deliverers"
              component={DeliverersList}
            />
            <Route
              exact
              path="/delivery/deliveries"
              component={DeliveriesList}
            />

            <Route exact path="/settings/printer" component={PrinterSettings} />

            <Route exact path="/products/all" component={Products} />
            <Route
              exact
              path="/products/new/:category"
              component={EditProduct}
            />
            <Route exact path="/products/:id" component={EditProduct} />

            <Redirect path="/orders" to="/orders/all" />
            <Redirect path="/products" to="/products/all" />
            <Redirect path="/settings" to="/settings/printer" />
            <Redirect path="/delivery" to="/delivery/assign" />
            <Redirect path="/reports" to="/reports/analytics" />
            <Redirect path="/" to="/orders" />
          </Switch>
        </Layout>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{
          anchorOriginBottomLeft: `snackbar ${
            snackBarMessage.type === 'success' && 'snackbar-success'
          } ${snackBarMessage.type === 'fail' && 'snackbar-fail'}`,
        }}
        ContentProps={{
          style: { backgroundColor: '#0050FF' },
        }}
        open={!!snackBarMessage.message}
        onClose={() => _setSnackBarMessage('', snackBarMessage.type)}
        autoHideDuration={4000}
        message={snackBarMessage.message}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  siteDomain: makeSelectSubDomain(),
  businessTitle: makeSelectBusinessTitle(),
  snackBarMessage: makeSelectSnackBarMessage(),
  progressLoading: makeSelectProgressLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinesses: () => dispatch(getBusinesses()),
    _getAdminOrders: () => dispatch(getFoodAdminOrders(1)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(App);
