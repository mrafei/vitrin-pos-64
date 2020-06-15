import React from 'react';
import {
  googleMapsNavigate,
  wazeNavigate
} from '../../../../utils/helper';
import Map from '../../../components/Map';
import { CDN_BASE_URL } from '../../../../utils/api';

const wazeText = `${CDN_BASE_URL}waze_PNG23.svg`;
const waze = `${CDN_BASE_URL}wazeTextlogo.svg`;
const google = `${CDN_BASE_URL}google_PNG19644.svg`;
const googleText = `${CDN_BASE_URL}google-maps-png-google-maps-icon-1600.svg`;

function DeliverySection({ order }) {
  const mapOptions = {
    height: 100,
    width: '100%',
    center: {
      longitude: order.user_address ? order.user_address.longitude : null,
      latitude: order.user_address ? order.user_address.latitude : null
    },
    markers: [
      {
        longitude: order.user_address ? order.user_address.longitude : null,
        latitude: order.user_address ? order.user_address.latitude : null,
        singleMarker: true
      }
    ]
  };
  return <div className="w-100 py-2 u-background-white mt-1 px-3">
    <div
      className='flex-1 u-fontMedium u-fontWeightBold mb-2 u-text-black'
    >جزئیات ارسال
    </div>
    <div className="d-flex flex-column justify-content-between px-3">
      <div className="mt-1">
        <span className="u-textBlack">شماره سفارش: </span>
        <span className="u-text-darkest-grey">{order.order_id}</span>
      </div>
      <div className="mt-2">
        <span className="u-textBlack"> نام سفارش دهنده: </span>
        {order.user_address && (
          <span className="u-text-darkest-grey">
                    {order.user_address.name}
                  </span>
        )}
      </div>
      <div className="mt-2">
        <span className="u-textBlack">شماره تماس: </span>
        {order.user_address && (
          <span className="u-text-darkest-grey">
                    {order.user_address.phone}
                  </span>
        )}
      </div>
      <div className="mt-2">
        <span className="u-textBlack"> آدرس سفارش دهنده: </span>
        {order.delivery_on_site && (
          <span className="u-text-darkest-grey">
                    تحویل در محل رستوران
                  </span>
        )}
        {order.user_address && !order.delivery_on_site ? (
          <>
                    <span className="u-text-darkest-grey">
                      {order.user_address.address}
                    </span>
            <div className="my-2">
              <Map options={mapOptions}/>
            </div>
            <div className="mt-1 mb-2 d-flex">
              <button
                type="button"
                onClick={() =>
                  wazeNavigate(
                    order.user_address.latitude,
                    order.user_address.longitude
                  )
                }
                className="c-btn c-btn-transparent-bg c-btn-routing flex-1 ml-1"
              >
                <img className="h-50" src={waze} alt=""/>
                <img className="mr-1" src={wazeText} alt=""/>
              </button>
              <button
                type="button"
                onClick={() =>
                  googleMapsNavigate(
                    order.user_address.latitude,
                    order.user_address.longitude
                  )
                }
                className="c-btn c-btn-transparent-bg flex-1 c-btn-routing"
              >
                <img className="h-100" src={google} alt=""/>
                <img className="" src={googleText} alt=""/>
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-2">
        <div className="u-textBlack">جزئیات ارسال:</div>
        <span
          className="u-text-darkest-grey"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {(order && order.description) || 'ندارد'}
        </span>
      </div>
    </div>
  </div>;

}

export default DeliverySection;
