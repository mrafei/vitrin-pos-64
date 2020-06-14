import '../../../styles/_main.scss';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import React, { memo, useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import { makeSelectFoodAdminOrders } from './selectors';
import { getFoodAdminOrders } from './actions';

import reducer from './reducer';
import saga from './saga';
import OrderSelector from '../../components/OrderSelector';
import { connect } from 'react-redux';
import OrderCard from '../../components/OrderCard';

const OnlineOrders = function({ _getAdminOrders, adminOrders: orders }) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });
  const [collapseState, setCollapseState] = useState('all');

  const nowDate = new Date();
  const todayOrders = [];
  const pastOrders = [];
  useEffect(() => {
    setTimeout(() => {
      _getAdminOrders();
    }, 200);
  }, []);

  if (orders) {
    orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      if (
        orderDate.getFullYear() === nowDate.getFullYear() &&
        orderDate.getMonth() === nowDate.getMonth() &&
        orderDate.getDate() === nowDate.getDate()
      )
        todayOrders.push(order);
      else pastOrders.push(order);
    });
  }
  return (
    <div className="w-100 bg-white">

      <div className="text-center u-fontMedium u-text-dark-grey py-2 u-borderBottom">
        مدیریت سفارش‌ها
      </div>
      <OrderSelector
        setCollapseState={setCollapseState}
        collapseState={collapseState}
      />
      <div className="d-flex text-center col-12 col-sm-10 col-md-6 mx-auto pb-3 pl-0 pr-2 u-borderBottom u-mt-70">
        <span className="px-0 col-3">ش. سفارش</span>
        <div style={{ minWidth: 1 }} className="u-background-darkest-grey"/>
        <span className="px-0 col-5">نام مشتری</span>
        <div style={{ minWidth: 1 }} className="u-background-darkest-grey"/>
        <span className="px-0 col-4">قیمت کل</span>
      </div>
      <div className="flex-1 container">
        {(collapseState === 'all' || collapseState === 'today') && (
          <div>
              <span className="u-fontWeightBold d-flex align-items-center py-2 col-12 col-sm-10 col-md-6 mx-auto px-0">
                <div
                  className="ml-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black'
                  }}
                />
                سفارش‌های امروز
              </span>
            {todayOrders.map(order => (
              <OrderCard
                key={`order-${order.id}`}
                link={`/admin/food/orders/${order.id}`}
                order={order}
              />
            ))}
            {todayOrders.length === 0 && (
              <div className="py-2 col-12 col-sm-10 col-md-6 mx-auto px-0">
                هنوز سفارشی برای امروز ثبت نشده است.
              </div>
            )}
          </div>
        )}
        {(collapseState === 'all' || collapseState === 'past') && (
          <div>
              <span className="u-fontWeightBold d-flex align-items-center py-2 col-12 col-sm-10 col-md-6 mx-auto px-0">
                <div
                  className="ml-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black'
                  }}
                />
                سفارش‌های گذشته
              </span>
            {pastOrders.map(order => (
              <OrderCard
                link={`/admin/food/orders/${order.id}`}
                key={`order-${order.id}`}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminOrders: makeSelectFoodAdminOrders()
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: () => dispatch(getFoodAdminOrders())
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
