import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import { ICONS } from "../../../assets/images/icons";
import logo from "../../../assets/images/vitrin-blue.png";
import { remote } from "electron";

const routes = [
  { id: 1, disabled: false, title: "مدیریت سفارش‌ها", path: "/orders", icon: ICONS.LIST },
  { id: 2, disabled: false, title: "مدیریت منو رستوران", path: "/products", icon: ICONS.GRID },
  { id: 3, disabled: true, title: "لیست مشترکین", path: "/users", icon: ICONS.PROFILE },
  { id: 4, disabled: false, title: "مدیریت پیک‌ها", path: "/delivery", icon: ICONS.DELIVERY },
  { id: 5, disabled: false, title: "تنظیمات", path: "/settings", icon: ICONS.SETTING },
  { id: 6, disabled: false, title: "تحلیل‌ها", path: "/analytics", icon: ICONS.ANALYTICS },
];
const subRoutes = [
  [{ id: 1, title: "همه سفارش‌ها", path: "/orders/all" }],
  [{ id: 1, title: "همه محصولات", path: "/products/all" }],
  [],
  [
    { id: 1, title: "تخصیص پیک", path: "/delivery/assign" },
    { id: 2, title: "لیست پیک‌ها", path: "/delivery/deliverers" },
    {
      id: 3,
      title: "لیست تحویل‌ها",
      path: "/delivery/deliveries",
    },
  ],
  [{ id: 1, title: "تنظیمات چاپگر", path: "settings/printer", icon: ICONS.PRINT }],
  [],
];

function Layout({ children, location, title, loading }) {
  if (location.pathname === "/login") return children;
  const activeRouteIndex = routes.findIndex((route) => location.pathname.includes(route.path));
  return (
    <div className="w-100 overflow-hidden">
      <div
        className="d-flex u-background-white u-height-64 align-items-center position-relative z-index-2"
        style={
          activeRouteIndex > -1 && subRoutes[activeRouteIndex].length
            ? { borderBottom: "1px solid #F0F1F6" }
            : {
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "0px 0px 8px 8px",
              }
        }>
        <div className="d-flex flex-1">
          {routes.map((route) => {
            const isActive = location.pathname.includes(route.path);
            if (!route.disabled)
              // return <div style={{opacity: 0.5}} className="pr-4 py-1" key={`menu-link-${route.id}`}>
              //   <Icon icon={route.icon} size={24} color={isActive ? '#168fd5' : '#4F595B'} className="ml-1"/>
              //   <span className="u-text-darkest-grey">{route.title}</span>
              // </div>
              return (
                <NavLink
                  to={route.path}
                  key={`menu-link-${route.id}`}
                  className="d-flex align-items-center pr-4 py-1">
                  <Icon
                    icon={route.icon}
                    size={24}
                    color={isActive ? "#168fd5" : "#4F595B"}
                    className="ml-1"
                  />
                  <span
                    className={
                      isActive ? "u-text-primary-blue u-fontWeightBold" : "u-text-darkest-grey"
                    }>
                    {route.title}
                  </span>
                </NavLink>
              );
          })}
        </div>

        <div className="px-3 u-fontWeightBold">{title}</div>
        <div style={{ width: 1, background: "#C8CBD0", height: "calc(100% - 30px)" }} />
        <div className="u-height-36">
          <img className="mr-5 ml-2" src={logo} style={{ height: 29, width: 76 }} />
        </div>
        <Icon
          icon={ICONS.REFRESH}
          size={36}
          color="#65BBEE"
          className="ml-5 u-cursor-pointer"
          onClick={() => {
            remote.getCurrentWindow().reload();
          }}
        />
      </div>
      {activeRouteIndex > -1 && subRoutes[activeRouteIndex].length ? (
        <div
          className="d-flex flex-1 u-background-white py-1 position-relative"
          style={{
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
            borderRadius:
              activeRouteIndex > -1 && subRoutes[activeRouteIndex].length ? "" : "0px 0px 8px 8px",
          }}>
          {subRoutes[activeRouteIndex].map((route) => {
            const isActive = location.pathname.includes(route.path);
            return (
              <NavLink to={route.path} key={`menu-link-${route.id}`} className="pr-4 py-1">
                <span
                  className={
                    isActive ? "u-text-primary-blue u-fontWeightBold" : "u-text-darkest-grey"
                  }>
                  {route.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      ) : null}
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
      {children}
    </div>
  );
}

export default memo(Layout);
