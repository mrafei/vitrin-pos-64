import React from 'react';
import {
  englishNumberToPersianNumber,
  priceFormatter,
} from '../../../../utils/helper';

function ItemsSection({ order }) {
  return (
    <div className="w-100 py-2 u-background-white px-3">
      <div className="flex-1 u-fontWeightBold mb-2 u-text-black">
        آیتم‌های سفارش
      </div>
      {order.items.map((item) => (
        <div
          key={`order-item-${item.id}`}
          className="d-flex align-items-center flex-row justify-content-between mt-2 px-3"
        >
          <div className="wrapper--img-order">
            <img
              alt={item.deal.title}
              className="w-100 h-100 object-fit"
              src={item.deal.main_image_thumbnail_url}
            />
          </div>
          <div className="flex-1 d-flex flex-column justify-content-center">
            <div className="u-fontNormal u-textBlack u-fontWeightBold">
              {item.deal.title}
            </div>
            <div
              className="u-fontVerySmall u-text-darkest-grey mt-1 overflow-hidden u-max-height-18"
              dangerouslySetInnerHTML={{
                __html: item.deal.description,
              }}
            />
            {order.deal.extra_items && order.deal.extra_items.length ? (
              <ul
                className="py-1 d-flex flex-column justify-content-center align-items-center"
                style={{ fontSize: 12, borderBottom: '1px solid #eee' }}
              >
                {item.deal.extra_items.map((_item) => (
                  <li className="d-flex justify-content-between align-items-center w-100">
                    <div>{_item.title}</div>
                    <div>{priceFormatter(_item.price)} تومان</div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="u-text-darkest-grey order--item u-border-medium-grey align-items-center u-no-wrap">
            <div>{englishNumberToPersianNumber(item.amount)}</div>
            عدد
          </div>
          <div
            className="u-no-wrap d-flex flex-column justify-content-center"
            style={{ width: 100 }}
          >
            {item.deal.discounted_price !== item.deal.initial_price && (
              <div className="u-fontSemiSmall u-text-darkest-grey u-text-line-through">
                {priceFormatter(item.deal.initial_price)}
              </div>
            )}
            <div className="u-textBlack u-fontMedium">
              <span>
                {priceFormatter(item.deal.discounted_price)}
                <span className="u-font-semi-small"> تومان</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsSection;
