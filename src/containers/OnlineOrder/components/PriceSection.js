import React from "react";
import { priceFormatter } from "../../../../utils/helper";

function PriceSection({ order }) {
  let cost = "رایگان";
  if (+order.delivery_price === 999999) cost = "خارج از محدوده ارسال";
  else if (+order.delivery_price !== 0)
    cost = `${priceFormatter(+order.delivery_price)}`;

  return (
    <div className="py-2 u-relative u-background-white box-shadow u-border-radius-8 mr-4 mt-4">
      <div className="flex-1 u-fontMedium u-fontWeightBold mb-2 u-text-black px-3">
        <span> مبلغ قابل پرداخت: </span>
        <span>{priceFormatter(order.final_price)}</span>
        <span className="u-font-semi-small u-fontWeightLight px-1">تومان</span>|
        {order.payment_status === 1 && (
          <span className="u-text-green mr-1">آنلاین</span>
        )}
        {order.payment_status === 2 && (
          <span className="u-text-red u-fontMedium mr-1">
            در محل (حضوری / کارتخوان)
          </span>
        )}
      </div>
      <div className="d-flex flex-column px-3">
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">قیمت اولیه: </span>
          <span className="u-text-darkest-grey">
            {priceFormatter(order.total_initial_price)}
            <span className="u-font-semi-small"> تومان</span>
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">تخفیف محصولات: </span>
          <span className="u-text-darkest-grey">
            {priceFormatter(order.total_discount)}
            <span
              className="u-fontWeightBold"
              style={{ paddingRight: 2, paddingLeft: 5 }}
            >
              {order.total_discount ? "-" : null}
            </span>
            <span className="u-font-semi-small"> تومان</span>
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">کد تخفیف: </span>
          <span className="u-text-darkest-grey">
            {priceFormatter(order.discount_code_amount)}
            <span
              className="u-fontWeightBold"
              style={{ paddingRight: 2, paddingLeft: 5 }}
            >
              {order.discount_code_amount ? "-" : null}
            </span>
            <span className="u-font-semi-small"> تومان</span>
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">اعتبار هدیه: </span>
          <span className="u-text-darkest-grey">
            {priceFormatter(order.gift_credit_used)}
            <span
              className="u-fontWeightBold"
              style={{ paddingRight: 2, paddingLeft: 5 }}
            >
              {order.gift_credit_used ? "-" : null}
            </span>
            <span className="u-font-semi-small"> تومان</span>
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">کیف پول: </span>
          <span className="u-text-darkest-grey">
            {priceFormatter(order.credit_used)}
            <span
              className="u-fontWeightBold"
              style={{ paddingRight: 2, paddingLeft: 5 }}
            >
              {order.credit_used ? "-" : null}
            </span>
            <span className="u-font-semi-small"> تومان</span>
          </span>
        </div>

        {order.total_packaging_price ? (
          <div className="d-flex flex-row justify-content-between mt-1">
            <span className="u-textBlack">هزینه بسته‌بندی: </span>
            <span className="u-text-darkest-grey">
              {priceFormatter(order.total_packaging_price)}
              <span className="u-font-semi-small"> تومان</span>
            </span>
          </div>
        ) : null}
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">هزینه ارسال: </span>
          <span>
            <span className="u-text-darkest-grey">{cost}</span>
            {+order.delivery_price !== 0 && (
              <span className="u-font-semi-small"> تومان</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceSection;
