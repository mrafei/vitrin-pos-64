/* eslint-disable react/no-danger */
/**
 *
 * AdminOrder
 *
 */

import React, {memo, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {
  englishNumberToPersianNumber,
  persianToEnglishNumber
} from '../../../utils/helper';
import {PrimaryButton} from '../../components/Button';
import {makeSelectLoading} from '../App/selectors';
import {makeSelectFoodAdminOrder} from './selectors';
import Icon from '../../components/Icon';
import {
  acceptFoodOrder, cancelFoodOrder,
  getFoodAdminOrder,
  setDeliveryTime
} from './actions';
import {makeSelectBusiness, makeSelectPlugin} from '../../../stores/business/selector';
import {ICONS} from '../../../assets/images/icons';
import Input from '../../components/Input';
import ItemsSection from './components/ItemsSection';
import DeliverySection from './components/DeliverySection';
import PriceSection from './components/PriceSection';
import {useInjectReducer} from '../../../utils/injectReducer';
import {useInjectSaga} from '../../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import PrintButton from './PrintButton';
import PrintOnly from "./PrintOnly";

export function OnlineOrder({
                              adminOrder: order,
                              loading,
                              _getAdminOrder,
                              match,
                              _acceptOrder,
                              _cancelOrder,
                              history,
                              business,
                              _setDeliveryTime,
                              pluginData
                            }) {
  useInjectReducer({key: 'adminOrder', reducer});
  useInjectSaga({key: 'adminOrder', saga});

  useEffect(() => {
    setTimeout(() => {
      _getAdminOrder({id: match.params.id});
    }, 0);
  }, []);
  useEffect(() => {
    setDeliverer(order.deliverer_name);
    setDuration(order.delivery_time ? order.delivery_time / 60 : '')
  }, [order])
  const [duration, setDuration] = useState('');
  const [deliverer, setDeliverer] = useState('');
  const accept = () => {
    _acceptOrder({id: order.id, plugin: 'food', deliveryTime: duration ? parseInt(duration, 10) * 60 : '', deliverer});
  };
  const deliverers = pluginData.data && pluginData.data.deliverers ? pluginData.data.deliverers : [];
  return (<div className="h-100 pb-4">
      <div className="d-flex flex-1 mx-5 mt-5" style={{height: 'calc(100% - 200px)'}}>
        <div
          className="u-background-melo-grey u-border-radius-8 overflow-hidden flex-1 box-shadow h-100 d-flex flex-column">
          <div className="text-center u-fontMedium u-text-dark-grey py-2 u-background-white mb-1">
            <div className="px-3 u-text-darkest-grey u-fontWeightBold">
              جزییات سفارش
              <Icon
                className="c-modal-header-close float-right"
                icon={ICONS.CLOSE}
                size={25}
                onClick={history.goBack}
                color="#949c9f"
              />
            </div>
          </div>

          <div className="d-flex flex-1 flex-column align-items-center overflow-auto"
               style={{height: 'calc(100% - 49px)'}}>
            <ItemsSection order={order}/>
            <DeliverySection order={order}/>
            <PriceSection order={order}/>
          </div>

        </div>
        <div>
          <div className="u-relative u-background-white box-shadow u-border-radius-8 mr-4"
               style={{width: 395, height: 'fit-content'}}>

            <div className="d-flex flex-column flex-1 p-3">
              <div className="u-text-black u-fontWeightBold">
                <Icon icon={ICONS.TIME} size={24} color="black" className="ml-2"/>
                حداکثر زمان آماده‌سازی و ارسال
              </div>

              <div className="u-text-black u-fontMedium mt-2">
                مدت زمان تخمینی آماده‌سازی و ارسال این سفارش را وارد کنید.
              </div>
              <Input
                disabled={order.order_status !== 0}
                className="mt-2"
                noModal
                numberOnly
                label="مدت زمان (دقیقه)"
                value={duration ? englishNumberToPersianNumber(duration) : ''}
                onChange={value => setDuration(persianToEnglishNumber(value))}
              />
            </div>
          </div>
          {deliverers.length ? <div className="u-relative u-background-white box-shadow u-border-radius-8 mr-4 mt-4"
                                    style={{width: 395, height: 'fit-content'}}>

            <div className="d-flex flex-column flex-1 p-3">

              <div className="u-text-black u-fontWeightBold">
                <Icon icon={ICONS.DELIVERY} size={24} color="black" className="ml-2"/>
                پیک‌ها
              </div>
              <div className="d-flex flex-wrap mt-4">
                {deliverers.map(d =>
                  <div
                    className={`d-flex col-6 px-0 mt-2 u-cursor-pointer ${order.order_status !== 0 && "u-pointer-events-none"}`}
                    onClick={() => setDeliverer(d.name)}
                    key={`deliverer-${d.name}`}>
                    <label className="radio-container">
                      <input type="radio" name="radio" readOnly checked={deliverer === d.name}/>
                      <span className="radio-checkmark">
                        <div className="after"/>
                      </span>
                    </label>
                    <span className="u-text-black">
                      {d.name}
                    </span>
                  </div>)}
              </div>
            </div>
          </div> : null}
        </div>
      </div>
      <div
        className="px-3 u-background-white m-5 u-height-70 d-flex u-border-radius-8 box-shadow py-3 u-fontWeightBold">
        {order.order_status === 0 && <>
          <PrintButton order={order} business={business} acceptOrder={accept} loading={loading}/>

          <button
            className={`d-flex justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall mx-2 u-text-primary-blue u-background-white`}
            style={{border: '1px solid #168FD5'}}
            disabled={loading}
            type="button"
            tabIndex="0"
            onClick={() => {
              _cancelOrder({id: order.id});
            }}>
            <div className="d-flex ml-2 u-border-radius-50-percent u-background-primary-blue"
                 style={{width: 20, height: 20}}>
              <Icon icon={ICONS.CLOSE} size={25} width={20} height={20} color="white"/>
            </div>
            لغو سفارش
          </button>
        </>}

        {order.order_status === 1 || order.order_status === 3 ?
          <div
            className="text-center u-text-green mx-2 u-border-radius-8 d-flex justify-content-center align-items-center"
            style={{width: '200%', border: '1px solid #67b977'}}>سفارش با
            موفقیت تایید شد.</div> : null}
        {order.order_status === 2 ?
          <div
            className="text-center u-text-red mx-2 u-border-radius-8 d-flex justify-content-center align-items-center"
            style={{width: '200%', border: '1px solid #E13F18'}}>سفارش لغو شد.</div> : null}
        <PrintOnly order={order} business={business}/>

        {order.user_address && (
          <a href={`tel:${order.user_address.phone}`}
             className="w-100 mx-2 px-2 u-cursor-pointer u-text-primary-light-blue u-border-primary-light-blue d-flex justify-content-center align-items-center u-border-radius-8">
            <Icon icon={ICONS.PHONE} className="ml-1" color="#65BBEE" size={24}/>
            تماس با مشتری
          </a>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  adminOrder: makeSelectFoodAdminOrder(),
  loading: makeSelectLoading(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin()
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrder: data => dispatch(getFoodAdminOrder(data)),
    _acceptOrder: data => dispatch(acceptFoodOrder(data)),
    _cancelOrder: data => dispatch(cancelFoodOrder(data)),
    _setDeliveryTime: data => dispatch(setDeliveryTime(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  memo,
  withRouter,
  withConnect
)(OnlineOrder);
