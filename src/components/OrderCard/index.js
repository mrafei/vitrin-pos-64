import React, { memo } from 'react';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ellipseText,
  englishNumberToPersianNumber,
  priceFormatter
} from '../../../utils/helper';
import Icon from '../Icon';
import { ICONS } from '../../../assets/images/icons';

function OrderCard({ order, link }) {
  const {
    final_price: totalPrice,
    user_address: userAddress,
    created_at: createdAt,
    order_status: orderStatus,
    payment_status: paymentStatus,
    delivery_on_site: deliveryOnSite
  } = order;
  const orderDate = new Date(createdAt);
  const orderTime = moment(
    `${orderDate.getFullYear()}-${orderDate.getMonth() +
    1}-${orderDate.getDate()}`,
    'YYYY-MM-DD'
  );
  const backgroundColor =
    (orderStatus === 0 && '#168FD4') ||
    (orderStatus === 2 && '#E13F18') ||
    '#67b977';
  return (
    <>
      <Link
        to={link}
        className="d-flex px-0 u-cursor-pointer c-order-card mb-3 overflow-hidden"
      >
        <div
          style={{
            width: 8,
            backgroundColor
          }}
        />
        <div className="flex-1">
          <div className="d-flex text-center py-2 u-text-darkest-grey u-background-light-grey">
            <span className="col-3 px-0">
              {ellipseText(englishNumberToPersianNumber(order.order_id), 8)}
            </span>
            <div
              style={{ minWidth: 1 }}
              className="u-background-darkest-grey"
            />

            <span className="col-5 px-0">
              {ellipseText(userAddress.name, 18)}
            </span>

            <div
              style={{ minWidth: 1 }}
              className="u-background-darkest-grey"
            />
            <span className="col-4 px-0">
              {englishNumberToPersianNumber(priceFormatter(totalPrice))} تومان{' '}
            </span>
          </div>
          <div className="d-flex justify-content-between px-2 py-1">
            <div className="d-flex">
              <span>
                {englishNumberToPersianNumber(
                  `${`0${orderDate.getHours()}`.slice(
                    -2
                  )}:${`0${orderDate.getMinutes()}`.slice(-2)}`
                )}
              </span>
              <div
                style={{ width: 2 }}
                className="mx-2 h-100 u-background-medium-grey"
              />
              <span>
                {englishNumberToPersianNumber(
                  orderTime.format('jYYYY/jMM/jDD')
                )}
              </span>
            </div>
            {paymentStatus === 1 && (
              <div className="d-flex">
                <Icon
                  icon={ICONS.CREDIT_CARD}
                  width="16"
                  height="12"
                  className="mt-1"
                  color="#67B977"
                />
                <span className="u-text-green mr-1">آنلاین</span>
              </div>
            )}
            {paymentStatus === 2 && (
              <div className="d-flex">
                <Icon icon={ICONS.CASH} size={19} color="#E13F18"/>
                <span className="u-text-red mr-1">نقدی</span>
              </div>
            )}
          </div>
          <div className="px-2 py-1">
            {' '}
            شماره تماس: {englishNumberToPersianNumber(userAddress.phone)}
          </div>
          <div className="px-2 py-1">
            آدرس:{' '}
            {deliveryOnSite ? 'تحویل در محل رستوران' : userAddress.address}
          </div>

          <div className="px-3 pb-3 d-flex justify-content-between align-items-center">
            {orderStatus === 0 && (
              <span className="u-fontWeightBold u-text-primary-blue">جدید</span>
            )}
            {orderStatus === 2 && (
              <span className="u-fontWeightBold u-text-red">لغو شده</span>
            )}
            {(orderStatus === 1 || orderStatus === 3) && (
              <span className="u-fontWeightBold u-text-primary-green">
                تایید شده
              </span>
            )}
            <div className="d-flex align-items-center u-fontWeightBold c-btn c-btn--cancel--order u-w-auto px-2 shadow-none">
              {' '}
              مشاهده جزییات
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
};

export default memo(OrderCard);
