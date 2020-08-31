import "../../../styles/_main.scss";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "../../../utils/injectReducer";
import { useInjectSaga } from "../../../utils/injectSaga";
import {
  makeSelectFoodAdminOrders,
  makeSelectFoodAdminOrdersPagination,
} from "./selectors";
import { getFoodAdminOrders } from "./actions";

import reducer from "./reducer";
import saga from "./saga";
import { connect } from "react-redux";
import OrderCard from "../../components/OrderCard";
import { getQueryParams } from "../../../utils/helper";
import Pagination from "../../components/Pagination";
import { makeSelectBusinessTitle } from "../../../stores/business/selector";

const OnlineOrders = function ({
  _getAdminOrders,
  adminOrders: orders,
  pagination,
  location,
  businessTitle,
}) {
  useInjectReducer({ key: "adminOrders", reducer });
  useInjectSaga({ key: "adminOrders", saga });
  const page = getQueryParams("page", location.search) || 1;

  useEffect(() => {
    _getAdminOrders(page);
  }, [location]);
  return (
    <div className="u-border-radius-8 container px-0 container-shadow overflow-hidden flex-1">
      <div className="d-flex px-5 py-3">
        {/* <span className="px-0 col-3">
          تعداد کل: {englishNumberToPersianNumber(pagination.count)}
        </span> */}
      </div>
      <div
        className="u-background-white p-5 overflow-auto"
        style={{ height: "calc(100% - 99px)" }}
      >
        <div>
          {orders.map((order) => (
            <OrderCard
              businessTitle={businessTitle}
              isBold={order.order_status === 0}
              key={`order-${order.id}`}
              link={`/orders/${order.id}`}
              order={order}
            />
          ))}
        </div>
      </div>
      <Pagination pagination={pagination} location={location} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminOrders: makeSelectFoodAdminOrders(),
  pagination: makeSelectFoodAdminOrdersPagination(),
  businessTitle: makeSelectBusinessTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: (page) => dispatch(getFoodAdminOrders(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(OnlineOrders);
