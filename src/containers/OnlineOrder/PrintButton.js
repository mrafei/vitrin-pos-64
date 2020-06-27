import React, {memo} from 'react';
import {renderToString} from 'react-dom/server';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import {
  englishNumberToPersianNumber,
  priceFormatter
} from '../../../utils/helper';
import Icon from '../../components/Icon';
import {ICONS} from '../../../assets/images/icons';
import {ipcRenderer} from "electron";
import ButtonLoading from "../../components/Button/Loading";

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const {order, business} = this.props;
    let cost = 'رایگان';
    if (+order.delivery_price === 999999) cost = 'خارج از محدوده ارسال';
    else if (+order.delivery_price !== 0)
      cost = ` ${priceFormatter(+order.delivery_price)} تومان `;
    const {
      revised_title: title,
      get_vitrin_absolute_url: url,
      phone_zero_starts: phone,
    } = business;
    const date = moment(order.submitted_at).format('jYYYY/jMM/jDD - HH:mm:ss');
    return (
      <div className="bg-white w-100 u-text-black printable px-3 u-fontVerySmall">
        <div className="py-1 px-2 u-border-bottom-dark">
          <div className="d-flex justify-content-between">
            <div className="text-center">
              <div className="u-fontLarge u-fontWeightBold">{title}</div>
              <div className="mt-1">{englishNumberToPersianNumber(date)}</div>
            </div>
            <QRCode value={url} size={100} id="qr"/>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between px-3 pb-1">
          <div className="mt-1">
            <span> مشترک گرامی: </span>
            {order.user_address && (
              <span className="u-fontWeightBold">
                {order.user_address.name}
              </span>
            )}
          </div>
          <div className="mt-1">
            <span>شماره سفارش: </span>
            <span className="u-fontWeightBold">{order.order_id}</span>
          </div>
          <div className="mt-1">
            <span> آدرس سفارش دهنده: </span>
            {order.user_address && (
              <span className="u-fontWeightBold u-fontSemiLarge">
                {order.user_address.address}
              </span>
            )}
          </div>
          <div className="mt-1">
            <span>تلفن: </span>
            {order.user_address && (
              <span className="u-fontWeightBold">
                {order.user_address.phone}
              </span>
            )}
          </div>

          <div className="mt-1">
            <span>جزئیات ارسال: </span>
            <span
              className="u-fontWeightBold"
              style={{whiteSpace: 'pre-wrap'}}
            >
              {(order && order.description) || 'ندارد'}
            </span>
          </div>
        </div>

        <div className="py-1 u-border-bottom-dark">
          <div
            className="d-flex flex-row px-2 mt-1 u-background-black u-fontWeightBold u-text-white u-border-bottom-dark py-1">
            <div style={{width: 160, whiteSpace: 'pre-wrap'}}>نام</div>
            <div className="text-center" style={{width: 80}}>
              فی
            </div>
            <div className="text-center" style={{width: 25}}>
              تعداد
            </div>

            <div className="text-center" style={{width: 80}}>
              قیمت کل
            </div>
          </div>

          {order.items.map(item => (
            <div
              className="d-flex flex-row px-2 mt-1"
              key={`order-item-${item.id}`}
            >
              <div style={{width: 160, whiteSpace: 'pre-wrap'}}>
                {item.deal.title}
              </div>
              <div className="text-center" style={{width: 80}}>
                {priceFormatter(item.deal.discounted_price)}
              </div>
              <div className="text-center" style={{width: 25}}>
                {englishNumberToPersianNumber(item.amount)}
              </div>
              <div className="text-center" style={{width: 80}}>
                {priceFormatter(item.deal.discounted_price * item.amount)}
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column justify-content-between px-3 pb-1 u-border-bottom-dark">
          <div className="mt-1">
            <span>قیمت اولیه: </span>
            <span
              className="u-fontWeightBold"
              style={{whiteSpace: 'pre-wrap'}}
            >
              {priceFormatter(order.total_initial_price)} تومان
            </span>
          </div>
          <div className="mt-1">
            <span>جمع تخفیف‌ها: </span>
            <span
              className="u-fontWeightBold"
              style={{whiteSpace: 'pre-wrap'}}
            >
              {priceFormatter(
                order.total_initial_price - order.final_price_without_delivery,
              )}{' '}
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
              className="u-fontWeightBold u-background-black u-text-white p-1"
              style={{whiteSpace: 'pre-wrap'}}
            >
              {priceFormatter(order.final_price)} تومان
            </span>
          </div>
          <span className="u-fontWeightBold mt-2">
            {order.payment_status === 1 ? 'آنلاین' : 'نقدی'}
          </span>
        </div>
        <div className="mt-1 px-3">
          <span>{title}: </span>
          <span className="u-fontWeightBold">{phone}</span>
        </div>
        <div className="mt-1 px-3">
          <span>{url}</span>
        </div>
      </div>
    );
  }

}

function PrintButton({order, business, acceptOrder, loading}) {
  return (
    <>
      <div
        onClick={() => {
          acceptOrder();
          ipcRenderer.send('print',
            renderToString(<ComponentToPrint order={order}
                                             business={business}/>),
            business.get_vitrin_absolute_url)
        }}
        className="u-border-radius-8 mx-2 px-2 w-100 u-cursor-pointer d-flex justify-content-center align-items-center u-background-primary-blue">
        {!loading && <Icon
          icon={ICONS.PRINT}
          color="white"
          size={19}
          width={24}
          height={24}
          className="d-flex"
        />}
        <button
          type="button"
          className="u-text-white d-inline-block mr-1"
        >
          {loading ? <ButtonLoading/> : 'تایید و پرینت سفارش'}
        </button>
      </div>
    </>
  );
}

PrintButton.propTypes = {
  order: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
  acceptOrder: PropTypes.func,
};
ComponentToPrint.propTypes = {
  order: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired
};
export default memo(PrintButton);
