import '../../../styles/_main.scss';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import OnlineOrders from '../OnlineOrders';
import Login from '../Login';
import Axios from 'axios';
import { getBusinesses } from '../../../stores/user/actions';
import Layout from '../../components/Layout';
import OnlineOrder from '../OnlineOrder';


const App = function({ history, _getBusinesses, location }) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      _getBusinesses(history);
    } else
      history.push('/login');

  }, []);

  return (
    <div className="u-height-100vh w-100 u-background-melo-grey d-flex">
      <Layout location={location}>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/online-orders/:id" component={OnlineOrder}/>
          <Route exact path="/online-orders" component={OnlineOrders}/>
        </Switch>
      </Layout>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return { _getBusinesses: (history) => dispatch(getBusinesses(history)) };
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
