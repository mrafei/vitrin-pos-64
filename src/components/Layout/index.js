import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "../Icon";
import { ICONS } from "../../../assets/images/icons";
import MenuItem from "./MenuItem";
import logo from "../../../assets/images/vitrin-blue.png";

const drawerWidth = 250;
const drawerClosedWidth = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: drawerClosedWidth,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
}));
const routes = [
  {
    id: 1,
    disabled: false,
    title: "مدیریت سفارش‌ها",
    path: "/orders",
    icon: ICONS.LIST,
  },
  {
    id: 2,
    disabled: false,
    title: "مدیریت منو رستوران",
    path: "/products",
    icon: ICONS.GRID,
  },
  // {
  //   id: 3,
  //   disabled: true,
  //   title: 'لیست مشترکین',
  //   path: '/users',
  //   icon: ICONS.PROFILE,
  // },
  {
    id: 4,
    disabled: false,
    title: "مدیریت پیک‌ها",
    path: "/delivery",
    icon: ICONS.DELIVERY,
  },
  {
    id: 5,
    disabled: false,
    title: "تنظیمات",
    path: "/settings",
    icon: ICONS.SETTING,
  },
  {
    id: 6,
    disabled: false,
    title: "گزارش‌ها",
    path: "/reports",
    icon: ICONS.ANALYTICS,
  },
];
const subRoutes = [
  [{ id: 1, title: "همه سفارش‌ها", path: "/orders/all", icon: ICONS.ITEMS }],
  [{ id: 1, title: "همه محصولات", path: "/products/all", icon: ICONS.ITEMS }],
  // [],
  [
    { id: 1, title: "تخصیص پیک", path: "/delivery/assign", icon: ICONS.ITEMS },
    {
      id: 2,
      title: "لیست پیک‌ها",
      path: "/delivery/deliverers",
      icon: ICONS.ITEMS,
    },
    {
      id: 3,
      title: "لیست تحویل‌ها",
      path: "/delivery/deliveries",
      icon: ICONS.ITEMS,
    },
  ],
  [
    {
      id: 1,
      title: "تنظیمات چاپگر",
      path: "/settings/printer",
      icon: ICONS.PRINT,
    },
  ],
  [
    {
      id: 1,
      title: "گزارش کلی",
      path: "/reports/analytics",
      icon: ICONS.ITEMS,
    },
    {
      id: 2,
      title: "گزارش سفارش‌ها",
      path: "/reports/orders",
      icon: ICONS.ITEMS,
    },
  ],
];
function Layout({ children, loading, location, title, history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      {location.pathname !== "/login" && (
        <Drawer
          anchor="right"
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <List className="d-flex flex-1 flex-column">
            {routes.map((route, index) => (
              <MenuItem
                open={open}
                setOpen={setOpen}
                key={route.path}
                route={route}
                subRoutes={subRoutes[index]}
                history={history}
              />
            ))}
          </List>
          <ListItem button key={title} onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <div style={open ? {} : { transform: "rotate(180deg)" }}>
                <Icon icon={ICONS.SWIPE} size={24} color="#667e8a" />
              </div>
            </ListItemIcon>
            <ListItemText className="text-right" primary="بستن منو" />
          </ListItem>
        </Drawer>
      )}
      <main
        style={{
          width: `calc(100% - ${
            open ? drawerWidth + "px" : drawerClosedWidth + "px"
          })`,
        }}
        className={classes.content}
      >
        <div
          style={{ borderBottom: "1px solid #f0f2f3" }}
          className="d-flex u-background-white u-height-64 align-items-center justify-content-between position-relative z-index-2"
        >
          <div
            onClick={() => {
              const pathname = history.location.pathname;
              history.push({ pathname: "/empty" });
              setTimeout(() => {
                history.replace({ pathname });
              }, 0);
            }}
            className="d-flex mr-4 px-3 py-2 u-border-radius-8 u-cursor-pointer"
            style={{ boxShadow: "0px 0px 20px rgba(79, 89, 91, 0.1)" }}
          >
            <span className="u-text-primary-blue">به‌روزرسانی</span>
            <Icon icon={ICONS.SPINNER} size={24} color="#0050FF" />
          </div>
          <div className="d-flex align-items-center h-100">
            <div className="px-3 u-fontWeightBold u-text-primary-blue">
              {title}
            </div>
            <div
              style={{
                width: 4,
                borderRadius: 3,
                background: "#0050FF",
                height: "calc(100% - 30px)",
              }}
            />
            <img
              alt="logo"
              className="mx-4"
              src={logo}
              style={{ height: 25, width: 70 }}
            />
          </div>
        </div>
        {loading ? (
          <div className="overflow-hidden" style={{ height: 6 }}>
            <div className="progress">
              <div className="line" />
              <div className="subline inc" />
              <div className="subline dec" />
            </div>
          </div>
        ) : (
          <div style={{ height: 6, width: "100%" }} />
        )}
        <div className="d-flex flex-column p-4 h-100 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default memo(withRouter(Layout));
