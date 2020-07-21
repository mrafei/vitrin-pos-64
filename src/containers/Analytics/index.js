/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Highcharts from 'highcharts/highstock';
import drilldown from 'highcharts/modules/drilldown';
import exportData from 'highcharts/modules/export-data';
import HighchartsExporting from 'highcharts/modules/exporting';
import TimeSeriesChart from '../../components/TimeSeriesChart/index';
import { getAnalyticsData } from './actions';
import { makeSelectAnalyticsData } from './selectors';
import StackedColumnChart from '../../components/StackedColumnChart';
import DrilldownChart from '../../components/DrilldownChart';
import { makeSelectLoading } from '../App/selectors';
import { englishNumberToPersianNumber } from '../../../utils/helper';
import { setChartOptions } from '../../../utils/chartUtils';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectBusinessId } from '../../../stores/business/selector';
drilldown(Highcharts);
HighchartsExporting(Highcharts);
exportData(Highcharts);
setChartOptions(Highcharts);

function AdminFoodAnalytics({
  loading,
  _getFoodAnalyticsData,
  analyticsData,
  businessId,
}) {
  useInjectReducer({ key: 'Analytics', reducer });
  useInjectSaga({ key: 'Analytics', saga });
  useEffect(() => {
    if (businessId) _getFoodAnalyticsData(businessId);
  }, [businessId]);
  if (analyticsData) {
    const {
      approved_orders: approvedOrders,
      cancelled_orders: cancelledOrders,
      received_orders: receivedOrders,
      earnings,
      average_earnings: averageEarnings,
      order_items: orderItems,
      order_items_count: orderItemsCount,
    } = analyticsData;
    const approvedOrdersData = {
      name: 'سفارش‌های تایید شده',
      data: approvedOrders,
    };
    const cancelledOrdersData = {
      name: 'سفارش‌های لغو شده',
      data: cancelledOrders,
    };
    const receivedOrdersData = {
      name: 'سفارش‌های بررسی نشده',
      data: receivedOrders,
    };
    const earningsData = { name: 'فروش', type: 'area', data: earnings };
    const averageEarningsData = {
      name: 'متوسط ارزش هر سفارش',
      type: 'area',
      data: averageEarnings,
    };
    const orderItemsSeriesData = [];
    Object.keys(orderItems).forEach((d) => {
      orderItemsSeriesData.push({
        name: englishNumberToPersianNumber(d),
        y: orderItems[d],
        drilldown: englishNumberToPersianNumber(d),
      });
    });
    const orderItemsData = {
      name: 'اقلام فروخته شده در ماه',
      colorByPoint: true,
      data: orderItemsSeriesData,
    };
    const orderItemsCountData = [];
    Object.keys(orderItemsCount).forEach((d) => {
      const itemsData = [];
      const items = orderItemsCount[d];
      Object.keys(items).forEach((item) => {
        itemsData.push([item, items[item]]);
      });
      orderItemsCountData.push({
        name: englishNumberToPersianNumber(d),
        id: englishNumberToPersianNumber(d),
        data: itemsData,
      });
    });
    return (
      <main style={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
        <div className="flex-1 d-flex bg-light-grey align-items-center flex-wrap p-4">
          <div
            className="bg-white mt-1"
            style={{
              padding: '15px 20px 40px',
              flex: '1 0 50%',
              maxWidth: 650,
              height: 450,
            }}
          >
            {approvedOrders.length ||
            cancelledOrders.length ||
            receivedOrders.length ? (
              <StackedColumnChart
                data={[
                  receivedOrdersData,
                  cancelledOrdersData,
                  approvedOrdersData,
                ]}
                title="تعداد سفارش‌های دریافتی"
                colors={['#168fd5', '#E13F18', '#67b977']}
                displaySum
                loading={loading}
              />
            ) : loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                در حال تولید نمودار...
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                داده‌ی کافی برای نمایش نمودار وجود ندارد.
              </div>
            )}
          </div>
          <div
            className="bg-white mt-1"
            style={{
              padding: '15px 20px 40px',
              flex: '1 0 50%',
              maxWidth: 650,
              height: 450,
            }}
          >
            {earnings.length ? (
              <TimeSeriesChart
                data={earningsData}
                title="فروش روزانه"
                colors={['#168fd5']}
                isEarnings
                displaySum
                loading={loading}
              />
            ) : loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                در حال تولید نمودار...
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                داده‌ی کافی برای نمایش نمودار وجود ندارد.
              </div>
            )}
          </div>
          <div
            className="bg-white mt-1"
            style={{
              padding: '15px 20px 40px',
              flex: '1 0 50%',
              maxWidth: 650,
              height: 450,
            }}
          >
            {orderItemsSeriesData.length ? (
              <DrilldownChart
                data={orderItemsData}
                drilldownData={{ series: orderItemsCountData }}
                title="اقلام فروخته شده"
                loading={loading}
                displaySum
              />
            ) : loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                در حال تولید نمودار...
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                داده‌ی کافی برای نمایش نمودار وجود ندارد.
              </div>
            )}
          </div>
          <div
            className="bg-white mt-1"
            style={{
              padding: '15px 20px 40px',
              flex: '1 0 50%',
              maxWidth: 650,
              height: 450,
            }}
          >
            {averageEarnings.length ? (
              <TimeSeriesChart
                data={averageEarningsData}
                title="متوسط ارزش هر سفارش"
                colors={['#673ab7']}
                isEarnings
                loading={loading}
              />
            ) : loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                در حال تولید نمودار...
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ marginTop: 225 }}
              >
                داده‌ی کافی برای نمایش نمودار وجود ندارد.
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
  return <LoadingIndicator />;
}

AdminFoodAnalytics.propTypes = {
  loading: PropTypes.bool,
  history: PropTypes.object,
  analyticsData: PropTypes.object,
  _getFoodAnalyticsData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  analyticsData: makeSelectAnalyticsData(),
  businessId: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getFoodAnalyticsData: (businessId) =>
      dispatch(getAnalyticsData(businessId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, memo)(AdminFoodAnalytics);
