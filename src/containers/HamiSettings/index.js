import React, { memo, useState } from "react";
import Input from "../../components/Input";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  createOrUpdateDealsAndCategories,
  getHamiDealCategories,
} from "../../../integrations/hami/actions";
import { setSnackBarMessage } from "../../../stores/ui/actions";
import { createStructuredSelector } from "reselect";
import { makeSelectBusinessId } from "../../../stores/business/selector";
import CalenderModal from "../OrdersReport/components/CalenderModal";
import moment from "moment-jalaali";
import CheckBox from "../../components/CheckBox";

function HamiSettings({ _setSnackBarMessage, businessId }) {
  const [notifChecked, setNotifChecked] = useState(
    localStorage.getItem("hamiAllowVitrinNotification") === "true"
  );
  const [inventory, setInventory] = useState(
    localStorage.getItem("hamiKeepTracking") === "true"
  );

  return (
    <>
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
            <div className="col-6 mt-4">
              <CheckBox
                className="u-fontMedium"
                label="defaultCheck1"
                checked={inventory}
                onChange={(checked) => {
                  setInventory(checked);
                  if (checked) localStorage.setItem("hamiKeepTracking", "true");
                  else localStorage.removeItem("hamiKeepTracking");
                }}
                text="سفارش‌های حامی در موجودی محصولات ویترین اعمال شود."
              />
            </div>
            <div className="col-6 mt-4">
              <CheckBox
                className="u-fontMedium"
                label="defaultCheck2"
                checked={notifChecked}
                onChange={(checked) => {
                  setNotifChecked(checked);
                  if (checked)
                    localStorage.setItem("hamiAllowVitrinNotification", "true");
                  else localStorage.removeItem("hamiAllowVitrinNotification");
                }}
                text="نوتیفیکیشن ویترین زمان ثبت سفارش نمایش داده شود."
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
