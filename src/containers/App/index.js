import "../../../styles/_main.scss";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import React, { memo, useEffect, useRef, useState } from "react";
import { createStructuredSelector } from "reselect";
import Snackbar from "@material-ui/core/esm/Snackbar";
import { connect } from "react-redux";
import Axios from "axios";
const { ipcRenderer } = require("electron");
const { getCurrentWebContents } = require("@electron/remote");

import { useInjectReducer } from "../../../utils/injectReducer";
import { useInjectSaga } from "../../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import OnlineOrders from "../OnlineOrders";
import Login from "../Login";
import { getBusinesses, setUser } from "../../../stores/user/actions";
import {
  makeSelectBusinesses,
  makeSelectUser,
} from "../../../stores/user/selector";

import Layout from "../../components/Layout";
import OnlineOrder from "../OnlineOrder";
import {
  makeSelectHamiModal,
  makeSelectProgressLoading,
  makeSelectSubDomain,
} from "./selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import { reloadPage, setSnackBarMessage } from "../../../stores/ui/actions";
import { makeSelectSnackBarMessage } from "../../../stores/ui/selector";
import initPushNotification from "../pushNotification";
import { getAdminOrders } from "../OnlineOrders/actions";
import {
  makeSelectBusinessId,
  makeSelectBusinessTitle,
} from "../../../stores/business/selector";
import DeliverersList from "../DeliverersList";
import CreateDeliverer from "../CreateDeliverer";
import EditDeliverer from "../EditDeliverer";
import DeliveriesList from "../DeliveriesList";
import PrinterSettings from "../PrinterSettings";
import AssignDeliverer from "../AssignDeliverer";
import Products from "../Products";
import EditProduct from "../EditProduct";
import EditVariant from "../EditVariant";
import Analytics from "../Analytics";
import OrdersReport from "../OrdersReport";
import { acceptOrder, setSiteDomain, toggleHamiModal } from "./actions";
import { getBusiness } from "../../../stores/business/actions";
import UploadCustomers from "../UploadCustomers";
import SoundSettings from "../SoundSettings";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import HamiSettings from "../HamiSettings";
import HamiModal from "./components/HamiModal";
import {
  createOrUpdateHamiCRMMemberships,
  createOrUpdateHamiOrders,
} from "../../../integrations/hami/actions";
import moment from "moment-jalaali";
import request from "../../../utils/request";
import { USER_INFO_API } from "../../../utils/api";

const App = function ({
  history,
  _getBusinesses,
  location,
  siteDomain,
  _setSnackBarMessage,
  snackBarMessage,
  _getAdminOrders,
  businessTitle,
  progressLoading,
  _setSiteDomain,
  businesses,
  _getBusiness,
  reload,
  _toggleHamiModal,
  showHamiModal,
  _acceptOrder,
  businessId,
  user,
  _setUser,
}) {
  useInjectReducer({ key: "app", reducer });
  useInjectSaga({ key: "app", saga });
  const [dialog, setDialog] = useState(false);
  const orderInterval = useRef(null);
  const customersInterval = useRef(null);
  const productsInterval = useRef(null);
  const getUserInfo = async () => {
    const {
      response: {
        data,
        meta: { status_code },
      },
    } = await request(USER_INFO_API);
    if (status_code === 200) {
      _setUser(data);
    }
  };
  useEffect(() => {
    ipcRenderer.send("disable-close");
    const token = localStorage.getItem("token");
    if (token) {
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      getUserInfo();
      _getBusinesses();
    } else history.push("/login");
    document.addEventListener("keydown", function (zEvent) {
      if (zEvent.ctrlKey && zEvent.shiftKey && zEvent.key === "X") {
        delete Axios.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
        history.push("/login");
      }
      if (zEvent.ctrlKey && zEvent.shiftKey && zEvent.key === "I") {
        getCurrentWebContents().openDevTools();
      }
      if (zEvent.ctrlKey && zEvent.shiftKey && zEvent.key === "~") {
        _toggleHamiModal(true);
      }
    });
    ipcRenderer.on("closePrompt", () => {
      setDialog(true);
    });
  }, []);

  useEffect(() => {
    clearInterval(orderInterval.current);
    clearInterval(customersInterval.current);
    if (siteDomain) {
      _getBusiness();
      initPushNotification(
        _setSnackBarMessage,
        history,
        _getAdminOrders,
        siteDomain,
        _acceptOrder
      );
    }
    if (siteDomain && localStorage.getItem("integrateed" === "hami")) {
      orderInterval.current = setInterval(() => {
        _getAdminOrders({ status: 0 });
      }, 120 * 1000);
      customersInterval.current = setInterval(() => {
        // createOrUpdateHamiCRMMemberships(
        //   businessId,
        //   "1375/01/01",
        //   moment().format("jYYYY/jMM/jDD")
        // );
        // createOrUpdateHamiOrders(
        //   businessId,
        //   user.id,
        //   "1375/01/01",
        //   moment().format("jYYYY/jMM/jDD")
        // );
      }, 120 * 60 * 1000);
    }
    return () => {
      clearInterval(customersInterval.current);
      clearInterval(orderInterval.current);
    };
  }, [siteDomain]);

  if ((!siteDomain || !businessTitle) && location.pathname !== "/login")
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <LoadingIndicator />
      </div>
    );
  return (
    <>
      <div className="u-height-100vh w-100 u-background-melo-grey d-flex h-100">
        <Layout
          reload={reload}
          location={location}
          title={businessTitle}
          loading={progressLoading}
          changeBusiness={_setSiteDomain}
          businesses={businesses}
        >
          <Switch>
            <Route exact path="/empty" component={LoadingIndicator} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reports/analytics" component={Analytics} />
            <Route exact path="/reports/orders" component={OrdersReport} />

            <Route exact path="/orders/all" component={OnlineOrders} />
            <Route exact path="/orders/:id" component={OnlineOrder} />

            <Route
              exact
              path="/delivery/deliverers/new"
              component={CreateDeliverer}
            />
            <Route
              exact
              path="/delivery/deliverers/:id"
              component={EditDeliverer}
            />
            <Route exact path="/delivery/assign" component={AssignDeliverer} />
            <Route
              exact
              path="/delivery/deliverers"
              component={DeliverersList}
            />
            <Route
              exact
              path="/delivery/deliveries"
              component={DeliveriesList}
            />

            <Route exact path="/settings/printer" component={PrinterSettings} />
            <Route exact path="/settings/sound" component={SoundSettings} />
            <Route exact path="/categories/:id" component={Products} />
            <Route
              exact
              path="/products/new/:category"
              component={EditProduct}
            />
            <Route
              exact
              path="/products/:id/variant/:variant"
              component={EditVariant}
            />
            <Route exact path="/products/:id" component={EditProduct} />

            <Route exact path="/users/upload" component={UploadCustomers} />

            <Redirect path="/orders" to="/orders/all" />
            <Redirect path="/users" to="/users/upload" />
            <Redirect path="/categories" to="/categories/all" />
            <Redirect path="/settings" to="/settings/printer" />
            <Redirect path="/delivery" to="/delivery/assign" />
            <Redirect path="/reports" to="/reports/analytics" />
            <Route exact path="/integrations/hami" component={HamiSettings} />
            <Redirect path="/" to="/orders" />
          </Switch>
        </Layout>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{
          anchorOriginBottomLeft: `snackbar ${
            snackBarMessage.type === "success" && "snackbar-success"
          } ${snackBarMessage.type === "fail" && "snackbar-fail"}`,
        }}
        ContentProps={{
          style: { backgroundColor: "#0050FF" },
        }}
        open={!!snackBarMessage.message}
        onClose={() => _setSnackBarMessage("", snackBarMessage.type)}
        autoHideDuration={4000}
        message={snackBarMessage.message}
      />
      <Dialog
        PaperProps={{ style: { minWidth: 400 } }}
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="u-fontWeightBold py-3 px-5">{"خروج از نرم‌افزار"}</div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مایل به بستن نرم‌افزار هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            انصراف
          </Button>
          <Button
            onClick={() => {
              ipcRenderer.send("closeApp");
              setDialog(false);
            }}
            color="primary"
            autoFocus
          >
            خروج
          </Button>
        </DialogActions>
      </Dialog>
      <HamiModal
        _onClose={() => _toggleHamiModal(false)}
        isOpen={showHamiModal}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  siteDomain: makeSelectSubDomain(),
  businessTitle: makeSelectBusinessTitle(),
  businessId: makeSelectBusinessId(),
  snackBarMessage: makeSelectSnackBarMessage(),
  progressLoading: makeSelectProgressLoading(),
  businesses: makeSelectBusinesses(),
  showHamiModal: makeSelectHamiModal(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusiness: () => dispatch(getBusiness()),
    _setSiteDomain: (domain) => dispatch(setSiteDomain(domain)),
    _getBusinesses: () => dispatch(getBusinesses()),
    _getAdminOrders: () => dispatch(getAdminOrders({ page: 1 })),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    reload: () => dispatch(reloadPage()),
    _toggleHamiModal: (show) => dispatch(toggleHamiModal(show)),
    _acceptOrder: (data) => dispatch(acceptOrder(data)),
    _setUser: (data) => dispatch(setUser(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(App);
