import React, { memo, useState } from "react";
import Input from "../../components/Input";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { setPrinterOptions } from "../App/actions";
import Button from "@material-ui/core/Button";
import { getHamiDealCategories } from "../../../integrations/hami/actions";
import { setSnackBarMessage } from "../../../stores/ui/actions";

function HamiSettings({ _setSnackBarMessage }) {
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
                  if (result.response)
                    _setSnackBarMessage(
                      "برقراری ارتباط با سرور حامی با موفقیت انجام شد.",
                      "success"
                    );
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
          </div>
        </div>
      </div>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(HamiSettings);
