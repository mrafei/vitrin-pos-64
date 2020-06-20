import React from 'react';
import Map from '../../../components/Map';

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
      className='flex-1 u-fontWeightBold mb-2 u-text-black'
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
          </>
        ) : null}
      </div>
      <div className="mt-2">
        <span className="u-textBlack">جزئیات ارسال:</span>
        <span
          className="u-text-darkest-grey pr-1"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {(order && order.description) || 'ندارد'}
        </span>
      </div>
    </div>
  </div>;

}

export default DeliverySection;
