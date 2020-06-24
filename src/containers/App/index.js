import '../../../styles/_main.scss';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import React, {memo, useEffect} from 'react';
import {createStructuredSelector} from 'reselect';
import {useInjectReducer} from '../../../utils/injectReducer';
import {useInjectSaga} from '../../../utils/injectSaga';
import Snackbar from '@material-ui/core/esm/Snackbar';
import reducer from './reducer';
import saga from './saga';
import {connect} from 'react-redux';
import OnlineOrders from '../OnlineOrders';
import Login from '../Login';
import Axios from 'axios';
import {getBusinesses} from '../../../stores/user/actions';
import Layout from '../../components/Layout';
import OnlineOrder from '../OnlineOrder';
import {makeSelectSubDomain} from "./selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import {setSnackBarMessage} from "../../../stores/ui/actions";
import {makeSelectSnackBarMessage} from "../../../stores/ui/selector";
import initPushNotification from "../pushNotification";
import {getFoodAdminOrders} from "../OnlineOrders/actions";
import {makeSelectBusinessTitle} from "../../../stores/business/selector";


const App = function ({history, _getBusinesses, location, siteDomain, _setSnackBarMessage, snackBarMessage, _getAdminOrders, businessTitle}) {
  useInjectReducer({key: 'app', reducer});
  useInjectSaga({key: 'app', saga});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      _getBusinesses();
    } else
      history.push('/login');
    document.addEventListener("keydown", function (zEvent) {
      if (zEvent.ctrlKey && zEvent.shiftKey && zEvent.key === "x") {
        delete Axios.defaults.headers.common.Authorization;
        history.push('/login');
        localStorage.removeItem('token');
      }
    });
  }, []);

  useEffect(() => {
    if (siteDomain)
      initPushNotification(_setSnackBarMessage, history, _getAdminOrders, siteDomain);
  }, [siteDomain])

  if (!siteDomain && location.pathname !== '/login')
    return <div
      style={{height: '100vh'}}
      className="d-flex align-items-center justify-content-center"
    >
      <LoadingIndicator/>
    </div>
  return (
    <>
      <div className="u-height-100vh w-100 u-background-melo-grey d-flex h-100">
        <Layout location={location} title={businessTitle}>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/online-orders/:id" component={OnlineOrder}/>
            <Route exact path="/online-orders" component={OnlineOrders}/>
            <Redirect path="/" to="/online-orders"/>
          </Switch>
        </Layout>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{
          anchorOriginBottomLeft: `snackbar ${snackBarMessage.type ===
          'success' && 'snackbar-success'} ${snackBarMessage.type ===
          'fail' && 'snackbar-fail'}`,
        }}
        ContentProps={{
          style: {backgroundColor: "#168fd5"},
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
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinesses: () => dispatch(getBusinesses()),
    _getAdminOrders: () => dispatch(getFoodAdminOrders(1)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  withRouter,
  memo
)(App);
