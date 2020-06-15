import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import { ICONS } from '../../../assets/images/icons';

const routes = [
  { id: 1, title: 'سفارش آنلاین', path: '/online-orders', icon: ICONS.PHONE },
  { id: 2, title: 'سفارش تلفنی', path: '/phone-orders', icon: ICONS.GLOBAL },
  { id: 3, title: 'سفارش سالن و بیرون‌بر', path: '/takeout-orders', icon: ICONS.ORDER },
  { id: 4, title: 'مدیریت منو رستوران', path: 'products', icon: ICONS.LIST },
  { id: 5, title: 'لیست مشترکین', path: '/users', icon: ICONS.PROFILE }
];

function Layout({ children, location }) {
  return <div className="w-100">
    <div className="d-flex u-background-white" style={{
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px 0px 8px 8px'
    }}>
      {routes.map(route => {
        const isActive = location.pathname.includes(route.path);
        return <NavLink to={route.path} key={`menu-link-${route.id}`} className="pr-4 py-1">
          <Icon icon={route.icon} size={24} color={isActive ? '#168fd5' : '#4F595B'} className="ml-1"/>
          <span className={isActive ? 'u-text-primary-blue' : 'u-text-darkest-grey'}>{route.title}</span>
        </NavLink>;
      })}

    </div>
    {children}
  </div>;
}

export default memo(Layout);
