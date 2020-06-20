import React from 'react';
import { englishNumberToPersianNumber, priceFormatter } from '../../../../utils/helper';

function ItemsSection({ order }) {
  return <div className="w-100 py-2 u-background-white mt-1 px-3">
    <div
      className='flex-1 u-fontWeightBold mb-2 u-text-black'
    >آیتم‌های سفارش
    </div>
    {order.items.map(item => (
      <div key={`order-item-${item.id}`} className="d-flex flex-row justify-content-between mt-2 px-3">
        <div className="wrapper--img-order">
          <img
            alt={item.deal.title}
            className="w-100 h-100 object-fit"
            src={item.deal.main_image_thumbnail_url}
          />
        </div>
        <div className="flex-1 d-flex align-items-center">
          <div className="u-fontNormal u-textBlack u-fontWeightBold">
            {item.deal.title}
          </div>
          <div
            className="u-fontVerySmall u-text-darkest-grey mt-1 overflow-hidden u-max-height-18"
            dangerouslySetInnerHTML={{
              __html: item.deal.description
            }}
          />
        </div>
        <div className="u-text-darkest-grey order--item u-border-medium-grey align-items-center u-no-wrap">
          <div>{englishNumberToPersianNumber(item.amount)}</div>
          عدد
        </div>
        <div className="u-no-wrap d-flex justify-content-center align-items-center">
          {item.deal.discounted_price !== item.deal.initial_price && (
            <div className="u-fontSemiSmall u-text-darkest-grey u-text-line-through">
              {priceFormatter(item.deal.initial_price)}
            </div>
          )}
          <div className="u-textBlack u-fontMedium">
                    <span>
                      {priceFormatter(item.deal.discounted_price)} تومان
                    </span>
          </div>
        </div>
      </div>
    ))}
  </div>;
}

export default ItemsSection;
