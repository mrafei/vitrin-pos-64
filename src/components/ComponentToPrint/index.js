import React from "react";
import PropTypes from "prop-types";
import { englishNumberToPersianNumber, priceFormatter } from "../../../utils/helper";
import moment from "moment-jalaali";
import QRCode from "qrcode.react";

export default class ComponentToPrint extends React.Component {
  render() {
    const { order, business, printOptions = {} } = this.props;
    let cost = "رایگان";
    if (+order.delivery_price === 999999) cost = "خارج از محدوده ارسال";
    else if (+order.delivery_price !== 0) cost = ` ${priceFormatter(+order.delivery_price)} تومان `;
    const {
      revised_title: title,
      get_vitrin_absolute_url: url,
      phone_zero_starts: phone,
    } = business;
    const date = moment(order.submitted_at).format("jYYYY/jMM/jDD - HH:mm:ss");
    return (
      <div
        className="bg-white w-100 u-text-black printable px-3 u-fontVerySmall"
        style={{ minWidth: 300 }}>
        <div className="py-1 px-2 u-border-bottom-dark">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center align-items-center">
              {!printOptions.hideTitle && (
                <div className="u-fontLarge u-fontWeightBold">{title}</div>
              )}
              <div className="mt-1">{englishNumberToPersianNumber(date)}</div>
            </div>
            {!printOptions.hideQR && <QRCode value={url} size={100} id="qr" />}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between px-3 pb-1">
          {!printOptions.hideCustomerName && (
            <div className="mt-1">
              <span> مشترک گرامی: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">{order.user_address.name}</span>
              )}
            </div>
          )}
          {!printOptions.hideOrderNumber && (
            <div className="mt-1">
              <span>شماره سفارش: </span>
              <span className="u-fontWeightBold">{order.order_id}</span>
            </div>
          )}
          {!printOptions.hideCustomerAddress && (
            <div className="mt-1">
              <span> آدرس سفارش دهنده: </span>
              {order.user_address && (
                <span className="u-fontWeightBold u-fontLarge">{order.user_address.address}</span>
              )}
            </div>
          )}
          {!printOptions.hideCustomerPhone && (
            <div className="mt-1">
              <span>تلفن: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">{order.user_address.phone}</span>
              )}
            </div>
          )}

          {!printOptions.hideDetails && (
            <div className="mt-1">
              <span>جزئیات ارسال: </span>
              <span className="u-fontWeightBold" style={{ whiteSpace: "pre-wrap" }}>
                {(order && order.description) || "ندارد"}
              </span>
            </div>
          )}
        </div>

        {!printOptions.hideItems && (
          <div>
            <div className="pt-1">
              <div className="d-flex flex-row px-2 mt-1 u-border-bottom-dark py-1">
                <div
                  style={{
                    width: !printOptions.hideItemPrices ? 160 : 320,
                    whiteSpace: "pre-wrap",
                  }}>
                  نام
                </div>

                <div className="text-center" style={{ width: 35 }}>
                  تعداد
                </div>

                {!printOptions.hideItemPrices ? (
                  <>
                    <div className="text-center" style={{ width: 80 }}>
                      فی
                    </div>

                    <div className="text-center" style={{ width: 80 }}>
                      قیمت کل
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {order.items.map((item) => (
              <div
                className="d-flex flex-row px-2 py-1 u-border-bottom-dark"
                key={`order-item-${item.id}`}>
                <div
                  className="u-fontWeightBold u-fontLarge"
                  style={{
                    width: !printOptions.hideItemPrices ? 160 : 320,
                    whiteSpace: "pre-wrap",
                  }}>
                  {item.deal.title}
                </div>
                <div className="text-center u-fontLarge u-fontWeightBold" style={{ width: 35 }}>
                  {englishNumberToPersianNumber(item.amount)}
                </div>

                {!printOptions.hideItemPrices ? (
                  <>
                    <div className="text-center" style={{ width: 80 }}>
                      {priceFormatter(item.deal.discounted_price)}
                    </div>
                    <div className="text-center" style={{ width: 80 }}>
                      {priceFormatter(item.deal.discounted_price * item.amount)}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {!printOptions.hidePrices && (
          <div className="d-flex flex-column justify-content-between px-3 pb-1 u-border-bottom-dark">
            <div className="mt-1">
              <span>قیمت اولیه: </span>
              <span className="u-fontWeightBold" style={{ whiteSpace: "pre-wrap" }}>
                {priceFormatter(order.total_initial_price)} تومان
              </span>
            </div>
            <div className="mt-1">
              <span>جمع تخفیف‌ها: </span>
              <span className="u-fontWeightBold" style={{ whiteSpace: "pre-wrap" }}>
                {priceFormatter(order.total_initial_price - order.final_price_without_delivery)}{" "}
                تومان
              </span>
            </div>
            <div className="mt-1">
              <span>هزینه ارسال: </span>
              <span className="u-fontWeightBold">{cost}</span>
            </div>
            <div className="mt-1 u-fontMedium">
              <span>قابل پرداخت: </span>
              <span
                className="u-fontWeightBold px-3 py-1 u-fontLarge u-background-black u-text-white"
                style={{ whiteSpace: "pre-wrap" }}>
                {priceFormatter(order.final_price)} تومان
              </span>
            </div>
            <span className="u-fontWeightBold mt-2">
              {order.payment_status === 1 ? "آنلاین" : "نقدی"}
            </span>
          </div>
        )}

        {!printOptions.hidePhone && (
          <div className="mt-1 px-3">
            <span>{title}: </span>
            <span className="u-fontWeightBold">{phone}</span>
          </div>
        )}
        <div className="mt-1 px-3">
          <span>{url}</span>
        </div>
      </div>
    );
  }
}
ComponentToPrint.propTypes = {
  order: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
};
