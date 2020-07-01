import "../../../styles/_main.scss";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "../../../utils/injectReducer";
import { useInjectSaga } from "../../../utils/injectSaga";
import { makeSelectFoodAdminOrders, makeSelectFoodAdminOrdersPagination } from "./selectors";
import { getFoodAdminOrders } from "./actions";

import reducer from "./reducer";
import saga from "./saga";
import { connect } from "react-redux";
import OrderCard from "../../components/OrderCard";
import { englishNumberToPersianNumber, getQueryParams } from "../../../utils/helper";
import Pagination from "../../components/Pagination";

const OnlineOrders = function ({ _getAdminOrders, adminOrders: orders, pagination, location }) {
  useInjectReducer({ key: "adminOrders", reducer });
  useInjectSaga({ key: "adminOrders", saga });
  const page = getQueryParams("page", location.search) || 1;

  useEffect(() => {
    _getAdminOrders(page);
  }, [location]);
  return (
    <div
      className="u-border-radius-8 container px-0 container-shadow overflow-hidden u-mt-50"
      style={{
        height: "calc(100% - 150px)",
      }}>
      <div className="d-flex px-60 py-3">
        <span className="px-0 col-3">
          تعداد کل: {englishNumberToPersianNumber(pagination.count)}
        </span>
      </div>
      <div
        className="u-background-white px-60 py-5 overflow-auto"
        style={{ height: "calc(100% - 54px)" }}>
        <div>
          {orders.map((order) => (
            <OrderCard
              key={`order-${order.id}`}
              link={`/online-orders/${order.id}`}
              order={order}
            />
          ))}
        </div>
        <Pagination pagination={pagination} location={location} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminOrders: makeSelectFoodAdminOrders(),
  pagination: makeSelectFoodAdminOrdersPagination(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: (page) => dispatch(getFoodAdminOrders(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(OnlineOrders);
