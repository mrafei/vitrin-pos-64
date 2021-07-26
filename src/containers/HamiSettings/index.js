import React, { memo, useState } from "react";
import Input from "../../components/Input";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  createOrUpdateDealsAndCategories,
  createOrUpdateHamiCRMMemberships,
  getHamiDealCategories,
} from "../../../integrations/hami/actions";
import { setSnackBarMessage } from "../../../stores/ui/actions";
import { createStructuredSelector } from "reselect";
import { makeSelectBusinessId } from "../../../stores/business/selector";
import Divider from "@material-ui/core/Divider";
import CalenderModal from "../OrdersReport/components/CalenderModal";
import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "../../../utils/helper";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";

function HamiSettings({ _setSnackBarMessage, businessId }) {
  const [toCalenderOpen, setToCalenderOpen] = useState(false);
  const [fromCalenderOpen, setFromCalenderOpen] = useState(false);
  const [query, setQuery] = useState({ to_date: "", from_date: "" });
  const toTime = moment(query.to_date, "jYYYY/jM/jD").format("jYYYY/jMM/jDD");
  const fromTime = moment(query.from_date, "jYYYY/jM/jD").format(
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

      <div className="u-border-radius-8 container px-0 container-shadow mt-5">
        <div className="px-5 py-3 d-flex justify-content-between align-items-center">
          <div className="u-fontWeightBold u-text-black">تنظیمات حامی</div>
        </div>
        <div
          className="u-background-white p-5"
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
        >
          <div className="flex-wrap d-flex">
            <div className="col-6">
              <div>آی پی سیستم مرکزی</div>
              <Input
                className="mt-3 direction-ltr"
                defaultValue={localStorage.getItem("hamiIp") || ""}
                onChange={(ip) => {
                  localStorage.setItem("hamiIp", ip);
                }}
              />
              <Button
                onClick={async () => {
                  const result = await getHamiDealCategories();
                  if (result.response && typeof result.response !== "string")
                    _setSnackBarMessage(
                      "برقراری ارتباط با سرور حامی با موفقیت انجام شد.",
                      "success"
                    );
                  else if (typeof result.response === "string")
                    _setSnackBarMessage(result.response, "fail");
                  else
                    _setSnackBarMessage(
                      "برقراری ارتباط با سرور حامی ناموفق بود.",
                      "fail"
                    );
                }}
                variant="outlined"
                color="primary"
              >
                تست
              </Button>
            </div>
            <div className="col-6">
              <div>کد امنیتی</div>
              <Input
                type="password"
                className="mt-3 direction-ltr"
                defaultValue={localStorage.getItem("hamiSecurityKey") || ""}
                onChange={(value) => {
                  localStorage.setItem("hamiSecurityKey", value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="u-border-radius-8 container px-0 container-shadow mt-5">
        <div className="px-5 py-3 d-flex justify-content-between align-items-center">
          <div className="u-fontWeightBold u-text-black">بروزرسانی</div>
        </div>
        <div
          className="u-background-white p-5"
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
        >
          <Button
            className="mb-2"
            onClick={async () => {
              const result = await createOrUpdateDealsAndCategories(businessId);
              if (result)
                _setSnackBarMessage(
                  "به‌روزرسانی با موفقیت انجام شد.",
                  "success"
                );
              else _setSnackBarMessage("به‌روزرسانی ناموفق بود.", "fail");
            }}
            variant="outlined"
            color="primary"
          >
            به‌روز رسانی دسته‌بندی‌ها و محصولات
          </Button>
          <Divider />
          <div className="mt-2 d-flex align-items-center">
            <Button
              onClick={async () => {
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
                if (result)
                  _setSnackBarMessage(
                    "به‌روزرسانی با موفقیت انجام شد.",
                    "success"
                  );
                else _setSnackBarMessage("به‌روزرسانی ناموفق بود.", "fail");
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
        </div>
      </div>
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
export default compose(withConnect, withRouter, memo)(HamiSettings);
