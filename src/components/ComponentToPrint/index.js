import React from "react";
import PropTypes from "prop-types";
import {
  englishNumberToPersianNumber,
  priceFormatter,
} from "../../../utils/helper";
import moment from "moment-jalaali";
import QRCode from "qrcode.react";

export default class ComponentToPrint extends React.Component {
  render() {
    const { order, business, printOptions = {} } = this.props;
    let cost = "رایگان";
    if (+order.delivery_price === 999999) cost = "خارج از محدوده ارسال";
    else if (+order.delivery_price !== 0)
      cost = ` ${priceFormatter(+order.delivery_price)} تومان `;
    const {
      revised_title: title,
      get_vitrin_absolute_url: url,
      phone_zero_starts: phone,
    } = business;
    const date = moment(order.submitted_at).format("jYYYY/jMM/jDD - HH:mm:ss");
    const sortedItems = [...order.items];
    sortedItems.sort((a, b) => {
      let firstTotal = a.deal.discounted_price;
      let secondTotal = b.deal.discounted_price;
      if (a.deal.extra_items)
        for (let i = 0; i < a.deal.extra_items.length; i += 1)
          firstTotal += a.deal.extra_items[i].price;
      if (b.deal.extra_items)
        for (let j = 0; j < b.deal.extra_items.length; j += 1)
          secondTotal += b.deal.extra_items[j].price;
      if (firstTotal > secondTotal) return -1;
      if (firstTotal < secondTotal) return 1;
      return 0;
    });
    return (
      <div
        className="bg-white w-100 u-text-black printable px-3 u-fontVerySmall"
        style={{ minWidth: 300 }}
      >
        <div className="py-1 px-2 u-border-bottom-dark">
          <div className="d-flex justify-content-between align-items-center">
            <span
              className="d-flex px-1 py-2 flex-column justify-content-center align-items-center"
              style={{
                border: "1px solid black",
                height: "fit-content",
                borderRadius: 4,
              }}
            >
              <span className="u-fontVerySmall">شماره فاکتور</span>
              <span className="u-fontLarge u-fontWeightBold">
                {englishNumberToPersianNumber(order.order_number) || "۱۰۱"}
              </span>
            </span>
            {!printOptions.hideTitle && (
              <div
                className="u-fontLarge text-center u-fontWeightBold"
                style={{ width: 160 }}
              >
                {title}
              </div>
            )}
            {!printOptions.hideQR && <QRCode value={url} size={100} id="qr" />}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between px-3 pb-1">
          <div className="mt-1">
            <span>تاریخ و ساعت: </span>
            <span className="u-fontWeightBold">
              {englishNumberToPersianNumber(date)}
            </span>
          </div>

          {!printOptions.hideCustomerName && (
            <div className="mt-1">
              <span> مشترک گرامی: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">
                  {order.user_address.name}
                </span>
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
              <span className="u-textBlack"> آدرس سفارش دهنده: </span>
              {order.delivery_on_site && (
                <span className="u-fontWeightBold u-fontLarge">
                  تحویل در محل {business.revised_title}
                </span>
              )}
              {order.user_address && !order.delivery_on_site ? (
                <span className="u-fontWeightBold u-fontLarge">
                  {order.user_address.address}
                </span>
              ) : null}
            </div>
          )}
          {!printOptions.hideCustomerPhone && (
            <div className="mt-1">
              <span>تلفن: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">
                  {order.user_address.phone}
                </span>
              )}
            </div>
          )}

          {!printOptions.hideDetails && (
            <div className="mt-1">
              <span>جزئیات ارسال: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
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
                  }}
                >
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
            {sortedItems.map((item) => (
              <>
                <div
                  className={`d-flex flex-row px-2 ${
                    item.deal.extra_items && item.deal.extra_items.length
                      ? "pt-1"
                      : "u-border-bottom-dark py-1"
                  }`}
                  key={`order-item-${item.id}`}
                >
                  <div
                    className="u-fontWeightBold u-fontLarge"
                    style={{
                      width: !printOptions.hideItemPrices ? 160 : 320,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.deal.title}
                  </div>
                  <div
                    className="text-center u-fontLarge u-fontWeightBold"
                    style={{ width: 35 }}
                  >
                    {englishNumberToPersianNumber(item.amount)}
                  </div>

                  {!printOptions.hideItemPrices ? (
                    <>
                      <div className="text-center" style={{ width: 80 }}>
                        {priceFormatter(item.deal.discounted_price)}
                      </div>
                      <div className="text-center" style={{ width: 80 }}>
                        {priceFormatter(
                          item.deal.discounted_price * item.amount
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
                {item.deal.extra_items && item.deal.extra_items.length
                  ? item.deal.extra_items.map((_item) => (
                      <div
                        className="d-flex flex-row px-2 pb-1 u-border-bottom-dark"
                        key={`order-item-${_item.id}`}
                      >
                        <div
                          className=""
                          style={{
                            width: !printOptions.hideItemPrices ? 160 : 320,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {_item.title}
                        </div>
                        <div className="text-center" style={{ width: 35 }}>
                          {englishNumberToPersianNumber(item.amount)}
                        </div>
                        {!printOptions.hideItemPrices ? (
                          <>
                            <div className="text-center" style={{ width: 80 }}>
                              {priceFormatter(_item.price)}
                            </div>
                            <div className="text-center" style={{ width: 80 }}>
                              {priceFormatter(_item.price * item.amount)}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ))
                  : null}
              </>
            ))}
          </div>
        )}
        {!printOptions.hidePrices && (
          <div className="d-flex flex-column justify-content-between px-3 pb-1 u-border-bottom-dark">
            <div className="mt-1">
              <span>قیمت اولیه: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order.total_initial_price)} تومان
              </span>
            </div>
            {order.total_discount ? (
              <div className="mt-1">
                <span>تخفیف محصولات: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order.total_discount)}
                  <span style={{ marginRight: 2 }}>-</span>
                  <span className="mr-1">تومان</span>
                </span>
              </div>
            ) : null}
            {order.gift_credit_used ? (
              <div className="mt-1">
                <span>اعتبار هدیه : </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order.gift_credit_used)}
                  <span style={{ marginRight: 2 }}>-</span>
                  <span className="mr-1">تومان</span>
                </span>
              </div>
            ) : null}
            {order.discount_code_amount ? (
              <div className="mt-1">
                <span>کد تخفیف: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order.discount_code_amount)}
                  <span style={{ marginRight: 2 }}>-</span>
                  <span className="mr-1">تومان</span>
                </span>
              </div>
            ) : null}
            {order.total_packaging_price ? (
              <div className="mt-1">
                <span>هزینه بسته‌بندی: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order.total_packaging_price)} تومان
                </span>
              </div>
            ) : null}
            <div className="mt-1">
              <span>هزینه ارسال: </span>
              <span className="u-fontWeightBold">{cost}</span>
            </div>
            {order.taxing_price ? (
              <div className="mt-1">
                <span>مالیات بر ارزش افزوده: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                {priceFormatter(order.taxing_price)} تومان
              </span>
              </div>
            ) : null}
            <div className="mt-1 u-fontMedium">
              <span>قابل پرداخت: </span>
              <span
                className="u-fontWeightBold px-3 py-1 u-fontLarge u-background-black u-text-white"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order.final_price)} تومان
              </span>
            </div>
            <span className="u-fontWeightBold mt-2">
              {order.final_price === 0
                ? "اعتبار هدیه"
                : order.payment_status === 1
                ? "آنلاین"
                : "نقدی"}
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
