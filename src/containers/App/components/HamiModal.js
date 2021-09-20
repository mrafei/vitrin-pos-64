import React, { memo, useState } from "react";
import Icon from "../../../components/Icon";
import { ICONS } from "../../../../assets/images/icons";
import Modal from "../../../components/Modal";
import Button from "@material-ui/core/Button";
import {
  createOrUpdateHamiCRMMemberships,
  createOrUpdateHamiOrders,
} from "../../../../integrations/hami/actions";
import { createStructuredSelector } from "reselect";
import {
  makeSelectBusinessId,
  makeSelectBusinessSiteDomain,
  makeSelectPOSDevices,
} from "../../../../stores/business/selector";
import { setSnackBarMessage } from "../../../../stores/ui/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import moment from "moment-jalaali";
import {
  makeSelectBusinesses,
  makeSelectUser,
} from "../../../../stores/user/selector";
import request from "../../../../utils/request";
import { UPDATE_DEVICE_API } from "../../../../utils/api";
function HamiModal({
  isOpen,
  _onClose,
  _setSnackBarMessage,
  businessId,
  user,
  devices,
  businesses,
  siteDomain,
}) {
  const device = devices && devices[0];
  const branchId = businesses?.find(
    (business) => business.site_domain === siteDomain
  )?.extra_data?.pos_id;
  return (
    <>
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
                  let result = true;
                  const a = moment(`1375/01/01`, "jYYYY/jMM/jDD");
                  const b = moment();
                  for (
                    let m = moment(b);
                    m.isAfter(a);
                    m.subtract(1, "months")
                  ) {
                    result =
                      result &&
                      (await createOrUpdateHamiCRMMemberships(
                        businessId,
                        branchId,
                        m.startOf("month").format("jYYYY/jMM/jDD"),
                        m.endOf("month").format("jYYYY/jMM/jDD")
                      ));
                  }

                  if (result) {
                    if (localStorage.getItem("hamiSecurityKey"))
                      await request(
                        UPDATE_DEVICE_API(
                          localStorage.getItem("hamiSecurityKey")
                        ),
                        {
                          extra_data: {
                            last_users_update: moment().unix(),
                          },
                        },
                        "PATCH"
                      );

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
                  let result = true;
                  const a = moment(`1375/01/01`, "jYYYY/jMM/jDD");
                  const b = moment();
                  for (
                    let m = moment(b);
                    m.isAfter(a);
                    m.subtract(1, "months")
                  ) {
                    result =
                      result &&
                      (await createOrUpdateHamiOrders(
                        businessId,
                        branchId,
                        user.id,
                        m.startOf("month").format("jYYYY/jMM/jDD"),
                        m.endOf("month").format("jYYYY/jMM/jDD")
                      ));
                  }
                  if (result) {
                    if (localStorage.getItem("hamiSecurityKey"))
                      await request(
                        UPDATE_DEVICE_API(
                          localStorage.getItem("hamiSecurityKey")
                        ),
                        {
                          extra_data: {
                            last_orders_update: moment().unix(),
                          },
                        },
                        "PATCH"
                      );
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
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  businessId: makeSelectBusinessId(),
  user: makeSelectUser(),
  devices: makeSelectPOSDevices(),
  businesses: makeSelectBusinesses(),
  siteDomain: makeSelectBusinessSiteDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(HamiModal);
