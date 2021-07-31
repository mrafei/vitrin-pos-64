import React, { memo, useState } from "react";
import Icon from "../../../components/Icon";
import { ICONS } from "../../../../assets/images/icons";
import Modal from "../../../components/Modal";
import Button from "@material-ui/core/Button";
import {
  createOrUpdateHamiCRMMemberships,
  createOrUpdateHamiOrders,
} from "../../../../integrations/hami/actions";
import { englishNumberToPersianNumber } from "../../../../utils/helper";
import { createStructuredSelector } from "reselect";
import { makeSelectBusinessId } from "../../../../stores/business/selector";
import { setSnackBarMessage } from "../../../../stores/ui/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import moment from "moment-jalaali";
import CalenderModal from "../../OrdersReport/components/CalenderModal";
function HamiModal({ isOpen, _onClose, _setSnackBarMessage, businessId }) {
  const [toCalenderOpen, setToCalenderOpen] = useState(false);
  const [fromCalenderOpen, setFromCalenderOpen] = useState(false);
  const [orderToCalenderOpen, setOrderToCalenderOpen] = useState(false);
  const [orderFromCalenderOpen, setOrderFromCalenderOpen] = useState(false);
  const [query, setQuery] = useState({
    to_date: "",
    from_date: "",
    order_to_date: "",
    order_from_date: "",
  });
  const toTime = moment(query.to_date, "jYYYY/jM/jD").format("jYYYY/jMM/jDD");
  const fromTime = moment(query.from_date, "jYYYY/jM/jD").format(
    "jYYYY/jMM/jDD"
  );
  const orderToTime = moment(query.order_to_date, "jYYYY/jM/jD").format(
    "jYYYY/jMM/jDD"
  );
  const orderFromTime = moment(query.order_from_date, "jYYYY/jM/jD").format(
    "jYYYY/jMM/jDD"
  );
  return (
    <>
      <CalenderModal
        open={toCalenderOpen}
        onClose={() => setToCalenderOpen(false)}
        selectDay={(day) => setQuery({ ...query, to_date: day })}
      />
      <CalenderModal
        open={fromCalenderOpen}
        onClose={() => setFromCalenderOpen(false)}
        selectDay={(day) => setQuery({ ...query, from_date: day })}
      />
      <CalenderModal
        open={orderToCalenderOpen}
        onClose={() => setOrderToCalenderOpen(false)}
        selectDay={(day) => setQuery({ ...query, order_to_date: day })}
      />
      <CalenderModal
        open={orderFromCalenderOpen}
        onClose={() => setOrderFromCalenderOpen(false)}
        selectDay={(day) => setQuery({ ...query, order_from_date: day })}
      />
      <Modal isOpen={isOpen} onClose={_onClose}>
        <div className="u-relative u-background-white c-modal-box">
          <Icon
            onClick={_onClose}
            size={25}
            icon={ICONS.CLOSE}
            color="#ccd4d7"
            className="u-cursor-pointer u-absolute u-top-0 right-0 m-3"
          />

          <div className="d-flex flex-column flex-1 u-mt-50 py-3 u-border-top-5 px-2">
            <div className="mt-2 d-flex align-items-center">
              <Button
                onClick={async () => {
                  if (localStorage.getItem("hamiCustomersLastUpdate")) {
                    const lastUpdate = moment.unix(
                      localStorage.getItem("hamiCustomersLastUpdate")
                    );
                    const now = moment();
                    if (now.diff(lastUpdate, "hours") < 2) {
                      _setSnackBarMessage(
                        "هر دو ساعت یکبار میتوانید این کار را انجام دهید.",
                        "fail"
                      );
                      return;
                    }
                  }
                  if (!query.to_date) {
                    _setSnackBarMessage("تاریخ پایان را وارد کنید.", "fail");
                    return;
                  }
                  if (!query.to_date) {
                    _setSnackBarMessage("تاریخ شروع را وارد کنید.", "fail");
                    return;
                  }
                  const result = await createOrUpdateHamiCRMMemberships(
                    businessId,
                    toTime,
                    fromTime
                  );
                  if (result) {
                    localStorage.setItem(
                      "hamiCustomersLastUpdate",
                      moment().unix()
                    );
                    _setSnackBarMessage(
                      "به‌روزرسانی با موفقیت انجام شد.",
                      "success"
                    );
                  } else _setSnackBarMessage("به‌روزرسانی ناموفق بود.", "fail");
                }}
                variant="outlined"
                color="primary"
              >
                به‌روز رسانی کاربران
              </Button>
              <div className="d-flex u-text-black mr-3">
                <div
                  className="u-cursor-pointer d-flex align-items-center"
                  onClick={() => setFromCalenderOpen(true)}
                >
                  از تاریخ
                  <span className="mr-2">
                    {query.from_date
                      ? englishNumberToPersianNumber(query.from_date)
                      : "----"}
                  </span>
                  <Icon icon={ICONS.CONTROL_DOWN} size={25} color="#001e2d" />
                </div>
                <div
                  className="u-cursor-pointer d-flex align-items-center mr-5"
                  onClick={() => setToCalenderOpen(true)}
                >
                  تا تاریخ
                  <span className="mr-2">
                    {query.to_date
                      ? englishNumberToPersianNumber(query.to_date)
                      : "----"}
                  </span>
                  <Icon icon={ICONS.CONTROL_DOWN} size={25} color="#001e2d" />
                </div>
              </div>
            </div>
            <div className="mt-2 d-flex align-items-center">
              <Button
                onClick={async () => {
                  if (localStorage.getItem("hamiOrdersLastUpdate")) {
                    const lastUpdate = moment.unix(
                      localStorage.getItem("hamiOrdersLastUpdate")
                    );
                    const now = moment();
                    if (now.diff(lastUpdate, "hours") < 2) {
                      _setSnackBarMessage(
                        "هر دو ساعت یکبار میتوانید این کار را انجام دهید.",
                        "fail"
                      );
                      return;
                    }
                  }
                  if (!query.order_to_date) {
                    _setSnackBarMessage("تاریخ پایان را وارد کنید.", "fail");
                    return;
                  }
                  if (!query.order_to_date) {
                    _setSnackBarMessage("تاریخ شروع را وارد کنید.", "fail");
                    return;
                  }
                  const result = await createOrUpdateHamiOrders(
                    businessId,
                    orderToTime,
                    orderFromTime
                  );
                  if (result) {
                    localStorage.setItem(
                      "hamiOrdersLastUpdate",
                      moment().unix()
                    );
                    _setSnackBarMessage(
                      "به‌روزرسانی با موفقیت انجام شد.",
                      "success"
                    );
                  } else _setSnackBarMessage("به‌روزرسانی ناموفق بود.", "fail");
                }}
                variant="outlined"
                color="primary"
              >
                به‌روز رسانی سفارش‌ها
              </Button>
              <div className="d-flex u-text-black mr-3">
                <div
                  className="u-cursor-pointer d-flex align-items-center"
                  onClick={() => setOrderFromCalenderOpen(true)}
                >
                  از تاریخ
                  <span className="mr-2">
                    {query.order_from_date
                      ? englishNumberToPersianNumber(query.order_from_date)
                      : "----"}
                  </span>
                  <Icon icon={ICONS.CONTROL_DOWN} size={25} color="#001e2d" />
                </div>
                <div
                  className="u-cursor-pointer d-flex align-items-center mr-5"
                  onClick={() => setOrderToCalenderOpen(true)}
                >
                  تا تاریخ
                  <span className="mr-2">
                    {query.order_to_date
                      ? englishNumberToPersianNumber(query.order_to_date)
                      : "----"}
                  </span>
                  <Icon icon={ICONS.CONTROL_DOWN} size={25} color="#001e2d" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  businessId: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(HamiModal);
