import '../../../styles/_main.scss';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import React, {memo, useEffect, useState} from 'react';
import {createStructuredSelector} from 'reselect';
import {useInjectReducer} from '../../../utils/injectReducer';
import {useInjectSaga} from '../../../utils/injectSaga';
import {makeSelectFoodAdminOrders, makeSelectFoodAdminOrdersPagination} from './selectors';
import {getFoodAdminOrders} from './actions';

import reducer from './reducer';
import saga from './saga';
import {connect} from 'react-redux';
import OrderCard from '../../components/OrderCard';
import Icon from '../../components/Icon';
import {ICONS} from '../../../assets/images/icons';
import {getQueryParams} from '../../../utils/helper';

const OnlineOrders = function ({_getAdminOrders, adminOrders: orders, pagination, location}) {
  useInjectReducer({key: 'adminOrders', reducer});
  useInjectSaga({key: 'adminOrders', saga});
  const page = getQueryParams('page', location.search) || 1;

  useEffect(() => {
    _getAdminOrders(page);
  }, [location]);
  const pages = pagination.pagesCount ? Array.from(Array(pagination.pagesCount).keys()).reverse() : [];

  return (
    <div className="u-border-radius-8 container px-0 container-shadow overflow-hidden u-mt-50" style={{
      height: 'calc(100% - 150px)'
    }}>
      <div className="d-flex text-center px-60 py-3">
        <span className="px-0 col-3">کد سفارش</span>
        <span className="px-0 col-5">نام مشتری</span>
        <span className="px-0 col-4">جمع قابل پرداخت</span>
      </div>
      <div className="u-background-white px-60 py-5 overflow-auto" style={{height: 'calc(100% - 54px)'}}>
        <div>
          {orders.map(order => (
            <OrderCard
              key={`order-${order.id}`}
              link={`/online-orders/${order.id}`}
              order={order}
            />
          ))}
        </div>
        <div className="d-flex justify-content-between">
          {pagination.next ? <Link to={`${location.pathname}?${pagination.next.split('?')[1]}`}
                                   style={{width: 105}}
                                   className="u-text-primary-blue d-flex justify-content-center align-items-center">
            <div>
              <Icon icon={ICONS.CHEVRON} color="#168fd5" size={24}/>
            </div>
            <div>صفحه قبلی</div>
          </Link> : <div style={{width: 105}}/>}
          <div className="d-flex justify-content-center align-items-center">{pages.map((p) =>
            <Link key={`page-${p}`} to={`${location.pathname}?page=${p + 1}`} className="p-1">
              <div className="u-border-radius-50-percent"
                   style={{width: 8, height: 8, backgroundColor: p + 1 === +page ? '#168fd5' : '#c4c4c4'}}/>
            </Link>)}
          </div>
          {pagination.previous ? <Link to={`${location.pathname}?${pagination.previous.split('?')[1]}`}
                                       style={{width: 105}}
                                       className="u-text-primary-blue d-flex justify-content-center align-items-center">
            <div>صفحه بعدی</div>
            <div style={{transform: 'rotate(180deg)'}}>
              <Icon icon={ICONS.CHEVRON} color="#168fd5" size={24}/>
            </div>
          </Link> : <div style={{width: 105}}/>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminOrders: makeSelectFoodAdminOrders(),
  pagination: makeSelectFoodAdminOrdersPagination()
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: (page) => dispatch(getFoodAdminOrders(page))
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
)(OnlineOrders);
