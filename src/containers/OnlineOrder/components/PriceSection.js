import React from 'react';
import {priceFormatter} from '../../../../utils/helper';

function PriceSection({order}) {
  let cost = 'رایگان';
  if (+order.delivery_price === 999999) cost = 'خارج از محدوده ارسال';
  else if (+order.delivery_price !== 0)
    cost = ` ${priceFormatter(+order.delivery_price)} تومان `;

  return <div className="w-100 py-2 u-background-white mt-1 px-3 flex-1">
    <div
      className='flex-1 u-fontMedium u-fontWeightBold mb-2 u-text-black'
    >
      <span> مبلغ قابل پرداخت: </span>
      <span>{priceFormatter(order.final_price)}</span>
      <span className="u-fontMedium u-fontWeightLight px-1">تومان</span>
      |
      {order.payment_status === 1 && (
        <span className="u-text-green mr-1">آنلاین</span>
      )}
      {order.payment_status === 2 && (
        <span className="u-text-red mr-1">در محل (حضوری / کارتخوان)</span>
      )}
    </div>
    <div className="d-flex flex-column px-3">
      <div className="d-flex flex-row justify-content-between mt-1">
        <span className="u-textBlack">قیمت اولیه: </span>
        <span className="u-text-darkest-grey">
                  {priceFormatter(order.total_initial_price)} تومان{' '}
                </span>
      </div>
      <div className="d-flex flex-row justify-content-between mt-1">
        <span className="u-textBlack">جمع تخفیف‌ها: </span>
        <span className="u-text-darkest-grey">
          {priceFormatter(
            order.final_price_without_delivery - order.total_initial_price
          )}
          <span className="u-fontWeightBold" style={{paddingRight: 2, paddingLeft: 5}}>-</span>تومان
                </span>
      </div>
      {order.total_packaging_price ? (
        <div className="d-flex flex-row justify-content-between mt-1">
          <span className="u-textBlack">هزینه بسته‌بندی: </span>
          <span className="u-text-darkest-grey">
                    {priceFormatter(order.total_packaging_price)} تومان{' '}
                  </span>
        </div>
      ) : null}
      <div className="d-flex flex-row justify-content-between mt-1">
        <span className="u-textBlack">هزینه ارسال: </span>
        <span className="u-text-darkest-grey">{cost}</span>
      </div>
    </div>
  </div>;

}

export default PriceSection;
