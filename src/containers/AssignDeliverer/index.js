import "../../../styles/_main.scss";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import React, { memo, useCallback, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "../../../utils/injectReducer";
import { useInjectSaga } from "../../../utils/injectSaga";
import { makeSelectOrders, makeSelectOrdersPagination } from "./selectors";
import { getFoodAdminOrders, setDeliverers } from "./actions";

import reducer from "./reducer";
import saga from "./saga";
import { connect } from "react-redux";
import OrderCard from "../../components/OrderCard";
import { englishNumberToPersianNumber, getQueryParams } from "../../../utils/helper";
import Pagination from "../../components/Pagination";
import CheckBox from "../../components/CheckBox";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import { makeSelectPlugin } from "../../../stores/business/selector";
import { makeSelectLoading } from "../App/selectors";

const AssignDeliverer = function ({
  _getAdminOrders,
  orders,
  pagination,
  location,
  pluginData,
  _setDeliverers,
  loading,
  history,
}) {
  useInjectReducer({ key: "assignDeliverer", reducer });
  useInjectSaga({ key: "assignDeliverer", saga });
  const [selected, setSelected] = useState([]);
  const [sendSms, setSendSms] = useState(true);
  const [deliverer, setDeliverer] = useState("");

  const page = getQueryParams("page", location.search) || 1;
  useEffect(() => {
    _getAdminOrders(page);
  }, [location]);
  useEffect(() => {
    setSelected(orders.map(() => false));
  }, [orders]);
  const deliverers =
    pluginData.data && pluginData.data.deliverers ? pluginData.data.deliverers : [];
  const assign = useCallback(
    (deliverer) => () => {
      if (loading) return;
      setDeliverer(deliverer);
      const orderIds = [];
      selected.map((isSelected, index) => {
        if (isSelected) return orderIds.push(orders[index].id);
      });
      if (!orderIds.length) return;
      _setDeliverers({
        deliverer,
        sendSms,
        orders: orderIds,
        page,
      });
    },
    [selected, sendSms]
  );
  return (
    <div className="d-flex flex-1 mx-5 mt-5" style={{ height: "calc(100% - 180px)" }}>
      <div className="u-border-radius-8 u-background-white container px-0 container-shadow overflow-hidden">
        <div
          className="header-shadow position-relative d-flex py-2 align-items-center px-4"
          style={{ marginRight: -10 }}>
          <div className="d-flex flex-1 align-items-center">
            <Icon icon={ICONS.CONTROL_DOWN} size={25} color="#949C9F" />
            <CheckBox
              checked={selected.length && selected.every(Boolean)}
              onChange={(checked) => setSelected(orders.map(() => checked))}
              label={`defaultCheck`}
            />
            {selected.some(Boolean) && (
              <div className="mr-2 u-fontWeightBold">
                {englishNumberToPersianNumber(selected.filter((s) => s === true).length)} سفارش
                انتخاب شده ...
              </div>
            )}
          </div>
          {selected.some((s, index) => s && orders[index].deliverer_name) && (
            <div
              onClick={assign("")}
              className="d-flex align-items-center u-text-primary-blue u-fontMedium u-cursor-pointer">
              <Icon icon={ICONS.TRASH} size={19} color="#168fd5" />
              حذف پیک
            </div>
          )}
        </div>
        <div className="py-2 overflow-auto px-4" style={{ height: "calc(100% - 90px)" }}>
          <div>
            {orders.map((order, index) => (
              <OrderCard
                hasCheck
                link="#"
                selected={selected[index] || false}
                onSelect={() => {
                  let newSelected = [...selected];
                  newSelected[index] = !selected[index];
                  setSelected(newSelected);
                }}
                isBold={!order.deliverer_name}
                key={`order-${order.id}`}
                order={order}
              />
            ))}
          </div>
        </div>
        <Pagination pagination={pagination} location={location} />
      </div>
      {deliverers.length ? (
        <div
          className="u-relative u-background-white overflow-auto box-shadow h-100 u-border-radius-8 mr-4"
          style={{ width: 395 }}>
          <div className="d-flex flex-column flex-1 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="u-text-black u-fontWeightBold">
                <Icon icon={ICONS.DELIVERY} size={24} color="black" className="ml-2" />
                پیک‌ها
              </div>
              <div
                className="u-text-primary-blue u-fontWeightBold u-cursor-pointer"
                onClick={() => history.push("/delivery/deliveries")}>
                لیست تحویل‌ها
                <Icon icon={ICONS.CHEVRON} color="#168fd5" size={24} className="mr-1" />
              </div>
            </div>
            {selected.some(Boolean) && (
              <div className="u-text-black mt-3">پیک‌ موردنظر را انتخاب کنید...</div>
            )}
            <div className="u-text-black u-fontMedium mt-3">
              <CheckBox
                className="u-fontMedium"
                label="defaultCheck1"
                checked={sendSms}
                onChange={setSendSms}
                text="آدرس مشتری روی نقشه برای پیک پیامک شود."
              />
            </div>
            <div className="mt-2">
              {deliverers.map((d) => (
                <div
                  className={`d-flex py-2 px-3 u-fontWeightBold u-border-radius-8 u-cursor-pointer ${
                    loading && deliverer === d.name
                      ? "u-background-primary-blue u-text-white"
                      : "u-background-melo-grey u-text-darkest-grey"
                  }`}
                  style={{ marginTop: 2 }}
                  onClick={assign(d.name)}
                  key={`deliverer-${d.name}`}>
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
  pluginData: makeSelectPlugin(),
  pagination: makeSelectOrdersPagination(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: (page) => dispatch(getFoodAdminOrders(page)),
    _setDeliverers: (data) => dispatch(setDeliverers(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(AssignDeliverer);
