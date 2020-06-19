import React, {memo} from 'react';
import {NavLink} from 'react-router-dom';
import Icon from '../Icon';
import {ICONS} from '../../../assets/images/icons';
import logo from "../../../assets/images/vitrin-blue.png";

const routes = [
  {id: 1, disabled: false, title: 'سفارش آنلاین', path: '/online-orders', icon: ICONS.GLOBAL},
  {id: 2, disabled: true, title: 'سفارش تلفنی', path: '/phone-orders', icon: ICONS.PHONE},
  {id: 3, disabled: true, title: 'سفارش سالن و بیرون‌بر', path: '/takeout-orders', icon: ICONS.ORDER},
  {id: 4, disabled: true, title: 'مدیریت منو رستوران', path: 'products', icon: ICONS.LIST},
  {id: 5, disabled: true, title: 'لیست مشترکین', path: '/users', icon: ICONS.PROFILE}
];

function Layout({children, location, title}) {
  if (location.pathname === '/login')
    return children;
  return <div className="w-100">
    <div className="d-flex u-background-white u-height-64 align-items-center" style={{
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px 0px 8px 8px'
    }}>
      <div className="d-flex flex-1">
        {routes.map(route => {
          const isActive = location.pathname.includes(route.path);
          if (route.disabled)
            return <div style={{opacity: 0.5}} className="pr-4 py-1" key={`menu-link-${route.id}`}>
              <Icon icon={route.icon} size={24} color={isActive ? '#168fd5' : '#4F595B'} className="ml-1"/>
              <span className="u-text-darkest-grey">{route.title}</span>
            </div>
          return <NavLink to={route.path} key={`menu-link-${route.id}`} className="pr-4 py-1">
            <Icon icon={route.icon} size={24} color={isActive ? '#168fd5' : '#4F595B'} className="ml-1"/>
            <span className={isActive ? 'u-text-primary-blue' : 'u-text-darkest-grey'}>{route.title}</span>
          </NavLink>;
        })}
      </div>
      <div className="px-3 u-fontWeightBold">{title}</div>
      <div style={{width: 1, background: "#C8CBD0", height: 'calc(100% - 30px)'}}/>
      <img className="mx-5" src={logo} style={{height: 29, width: 76}}/>
    </div>
    {children}
  </div>;
}

export default memo(Layout);
