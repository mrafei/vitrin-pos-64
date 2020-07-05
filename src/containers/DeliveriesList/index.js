/* eslint-disable react/no-danger */
/**
 *
 * AdminOrder
 *
 */

import React, { memo, useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  makeSelectDeliverers,
  makeSelectDeliveries,
  makeSelectDeliveriesPagination,
} from "../../../stores/business/selector";
import { getDeliveries } from "../../../stores/business/actions";
import DelivererOrderCard from "../../components/DelivererOrderCard";
import { getQueryParams } from "../../../utils/helper";
import Pagination from "../../components/Pagination";
import Flickity from "../../components/Flickity";

export function DeliveriesList({ _getDeliveries, deliverers, deliveries, location, pagination }) {
  const dragging = useRef(false);
  const page = getQueryParams("page", location.search) || 1;
  const [deliverer, setDeliverer] = useState("");
  useEffect(() => {
    if (deliverer.name) _getDeliveries(deliverer.name, page);
  }, [deliverer, location]);
  useEffect(() => {
    if (deliverers[0]) setDeliverer(deliverers[0]);
  }, [deliverers]);
  const flickityOptions = {
    rightToLeft: true,
    groupCells: true,
    contain: true,
    cellAlign: "right",
    prevNextButtons: false,
    freeScroll: true,
    pageDots: false,
  };
  return (
    <div className="h-100 pb-4">
      <div
        className="u-border-radius-8 container px-0 container-shadow overflow-hidden u-mt-50"
        style={{
          height: "calc(100% - 160px)",
        }}>
        <div className="d-flex text-center px-60 py-3">
          <Flickity
            dragging={dragging}
            className="w-100"
            options={flickityOptions} // takes flickity options {}
          >
            {deliverers.map((d) => (
              <span
                key={`deliverer-${d.name}`}
                onClick={() => {
                  if (!dragging.current) setDeliverer(d);
                }}
                className={`ml-1 u-cursor-pointer u-border-radius-68 px-2 py-1 u-no-wrap ${
                  deliverer.name === d.name
                    ? "u-text-black u-fontWeightBold u-background-white badge-shadow"
                    : "u-text-dark-grey"
                }`}>
                {d.name}
              </span>
            ))}
          </Flickity>
        </div>
        <div
          className="u-background-white py-5 overflow-auto px-60"
          style={{ height: "calc(100% - 120px)" }}>
          {deliveries.length ? (
            deliveries.map((order) => (
              <DelivererOrderCard
                order={order}
                link={`/online-orders/${order.id}`}
                key={`order-${order.id}`}
              />
            ))
          ) : (
            <div>این پیک سفارشی تحویل نداده است.</div>
          )}
        </div>
        <Pagination pagination={pagination} location={location} />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  deliverers: makeSelectDeliverers(),
  deliveries: makeSelectDeliveries(),
  pagination: makeSelectDeliveriesPagination(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDeliveries: (name, page) => dispatch(getDeliveries(name, page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withRouter, withConnect)(DeliveriesList);
