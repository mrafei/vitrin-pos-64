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
import Icon from '../../components/Icon';
import {makeSelectDeliverers} from '../../../stores/business/selector';
import {ICONS} from '../../../assets/images/icons';
import {getBusiness} from "../../../stores/business/actions";
import OrderCard from "../../components/OrderCard";
import {englishNumberToPersianNumber} from "../../../utils/helper";

export function DeliverersList({
                                 _getBusiness,
                                 deliverers
                               }) {
  useEffect(() => {
    setTimeout(() => {
      _getBusiness();
    }, 0);
  }, []);
  return (<div className="h-100 pb-4">
      <div className="u-border-radius-8 container px-0 container-shadow overflow-hidden u-mt-50" style={{
        height: 'calc(100% - 150px)'
      }}>
        <div className="px-60 text-left pt-3">
          <div className="u-cursor-pointer u-text-white u-background-primary-blue u-border-radius-4 d-inline-flex justify-content-center align-items-center u-fontWeightBold u-fontMedium pr-2 py-2 pl-3">
            <Icon icon={ICONS.PLUS} color="white" className="ml-2" size={12}/>
            افزودن پیک جدید
          </div>
        </div>
        <div className="d-flex text-center px-60 py-3 u-fontWeightBold">
          <span className="px-0 col-1">ردیف</span>
          <span className="px-0 col-6">نام پیک</span>
          <span className="px-0 col-5">شماره همراه</span>
        </div>
        <div className="u-background-white py-5 overflow-auto px-60" style={{height: 'calc(100% - 54px)'}}>
          {deliverers.map((deliverer, index) => (
            <div className="d-flex text-center py-2 mt-1 bg-gray-melo u-border-radius-4 u-cursor-pointer"
                 key={`deliverer-${deliverer.name}`}>
              <span className="px-0 col-1">{englishNumberToPersianNumber(index)}</span>
              <span className="px-0 col-6">{deliverer.name}</span>
              <span className="px-0 col-5">{englishNumberToPersianNumber(deliverer.phone)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  deliverers: makeSelectDeliverers(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusiness: () => dispatch(getBusiness())
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
)(DeliverersList);
