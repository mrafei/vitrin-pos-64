/*
 *
 * Admin constants
 *
 */

export const DEFAULT_ACTION = 'app/AdminPanelApp/DEFAULT_ACTION';
export const SET_GROUP_DISCOUNT = 'app/AdminPanelApp/SET_GROUP_DISCOUNT';
export const NEW_SECTION_ORDERING = 'app/AdminPanelApp/NEW_SECTION_ORDERING';
export const CHANGE_CATEGORY_ORDER = 'app/AdminPanelApp/CHANGE_CATEGORY_ORDER';
export const GET_FOOD_ADMIN_ORDERS = 'app/AdminPanelApp/GET_FOOD_ADMIN_ORDERS';
export const GET_ECOMMERCE_ADMIN_ORDERS =
  'app/AdminPanelApp/GET_ECOMMERCE_ADMIN_ORDERS';
export const SET_FOOD_ADMIN_ORDERS = 'app/AdminPanelApp/SET_FOOD_ADMIN_ORDERS';
export const SET_ECOMMERCE_ADMIN_ORDERS =
  'app/AdminPanelApp/SET_ECOMMERCE_ADMIN_ORDERS';
export const GET_FOOD_ADMIN_ORDER = 'app/AdminPanelApp/GET_FOOD_ADMIN_ORDER';
export const GET_ECOMMERCE_ADMIN_ORDER =
  'app/AdminPanelApp/GET_ECOMMERCE_ADMIN_ORDER';
export const SET_FOOD_ADMIN_ORDER = 'app/AdminPanelApp/SET_FOOD_ADMIN_ORDER';
export const SET_ECOMMERCE_ADMIN_ORDER =
  'app/AdminPanelApp/SET_ECOMMERCE_ADMIN_ORDER';
export const ACCEPT_FOOD_ORDER = 'app/AdminPanelApp/ACCEPT_FOOD_ORDER';
export const ACCEPT_ECOMMERCE_ORDER =
  'app/AdminPanelApp/ACCEPT_ECOMMERCE_ORDER';
export const CANCEL_FOOD_ORDER = 'app/AdminPanelApp/CANCEL_FOOD_ORDER';
export const CANCEL_ECOMMERCE_ORDER =
  'app/AdminPanelApp/CANCEL_ECOMMERCE_ORDER';
export const BUY_PLUGIN = 'app/AdminPanelApp/BUY_PLUGIN';
export const ACTIVATE_TRIAL = 'app/AdminPanelApp/ACTIVATE_TRIAL';

export const GET_VITRIN_CALL_BUTTON_CLICKS =
  'app/AdminPanelApp/GET_VITRIN_CALL_BUTTON_CLICKS';
export const GET_VITRIN_PAGE_VIEWS = 'app/AdminPanelApp/GET_VITRIN_PAGE_VIEWS';
export const SET_VITRIN_CALL_BUTTON_CLICKS =
  'app/AdminPanelApp/SET_VITRIN_CALL_BUTTON_CLICKS';
export const SET_VITRIN_PAGE_VIEWS = 'app/AdminPanelApp/SET_VITRIN_PAGE_VIEWS';

export const GET_SUPERMARKET_ORDERS =
  'app/AdminSupermarketOrders/GET_SUPERMARKET_ORDERS';
export const SET_SUPERMARKET_ORDERS =
  'app/AdminSupermarketOrders/SET_SUPERMARKET_ORDERS';
export const GET_SUPERMARKET_ORDER =
  'app/AdminSupermarketOrders/GET_SUPERMARKET_ORDER';
export const SET_SUPERMARKET_ORDER =
  'app/AdminSupermarketOrders/SET_SUPERMARKET_ORDER';
export const GET_ADMIN_REVIEWS = 'app/AdminPanelApp/GET_ADMIN_REVIEWS';
export const SET_ADMIN_REVIEWS = 'app/AdminPanelApp/SET_ADMIN_REVIEWS';
export const GET_ADMIN_REVIEW = 'app/AdminPanelApp/GET_ADMIN_REVIEW';
export const SET_ADMIN_REVIEW = 'app/AdminPanelApp/SET_ADMIN_REVIEW';

export const ACCEPT_SUPERMARKET_ORDER =
  'app/AdminSupermarketOrders/ACCEPT_SUPERMARKET_ORDER';
export const CANCEL_SUPERMARKET_ORDER =
  'app/AdminSupermarketOrders/CANCEL_SUPERMARKET_ORDER';

export const SEND_VISIT_CARD = 'app/VisitCardPluginApp/SEND_VISIT_CARD';
export const SEND_GROUP_VISIT_CARD =
  'app/VisitCardPluginApp/SEND_GROUP_VISIT_CARD';
export const SEND_CUSTOM_VISIT_CARD =
  'app/VisitCardPluginApp/SEND_CUSTOM_VISIT_CARD';

export const SET_SELECTED_DELIVERY_DATE =
  'app/AdminPanelApp/SET_SELECTED_DELIVERY_DATE';
export const SET_DELIVERY_TIME = 'app/AdminPanelApp/SET_DELIVERY_TIME';
export const defaultDiscounts = [
  { id: 0, text: '۰ درصد', discount: 0 },
  { id: 1, text: '۱ درصد', discount: 1 },
  { id: 2, text: '۲ درصد', discount: 2 },
  { id: 3, text: '۳ درصد', discount: 3 },
  { id: 4, text: '۴ درصد', discount: 4 },
  { id: 5, text: '۵ درصد', discount: 5 },
  { id: 6, text: '۱۰ درصد', discount: 10 },
  { id: 7, text: '۱۵ درصد', discount: 15 },
  { id: 8, text: '۲۰ درصد', discount: 20 },
  { id: 9, text: '۳۰ درصد', discount: 30 },
];

export const SET_PRINTER_OPTIONS = 'app/AdminPanelApp/SET_PRINTER_OPTIONS';

export const defaultOrderDurations = [
  { id: 0, text: 'نیم ساعت', duration: 0.5 * 60 * 60 },
  { id: 0, text: 'یک ساعت', duration: 1 * 60 * 60 },
  { id: 0, text: 'یک و نیم ساعت', duration: 1.5 * 60 * 60 },
  { id: 0, text: 'دو ساعت', duration: 2 * 60 * 60 },
];

export const defaultMinimumFreeDeliveryPrices = [
  { id: 0, text: 'به طور کلی رایگان', cost: 0 },
  { id: 1, text: 'بالای ۱۰۰۰۰ تومان', cost: 10000 },
  { id: 2, text: 'بالای ۱۵۰۰۰ تومان', cost: 15000 },
  { id: 3, text: 'بالای ۲۰۰۰۰ تومان', cost: 20000 },
  { id: 4, text: 'بالای ۲۵۰۰۰ تومان', cost: 25000 },
  { id: 5, text: 'بالای ۳۰۰۰۰ تومان', cost: 30000 },
  { id: 6, text: 'بالای ۳۵۰۰۰ تومان', cost: 35000 },
  { id: 7, text: 'بالای ۴۰۰۰۰ تومان', cost: 40000 },
  { id: 8, text: 'بالای ۴۵۰۰۰ تومان', cost: 45000 },
  { id: 9, text: 'بالای ۵۰۰۰۰ تومان', cost: 50000 },
];

export const defaultInventories = [
  { id: 0, text: 'نامحدود', count: null },
  { id: 1, text: '۱ عدد', count: 1 },
  { id: 2, text: '۲ عدد', count: 2 },
  { id: 3, text: '۳ عدد', count: 3 },
  { id: 4, text: '۴ عدد', count: 4 },
  { id: 5, text: '۵ عدد', count: 5 },
  { id: 6, text: '۶ عدد', count: 6 },
  { id: 7, text: '۷ عدد', count: 7 },
  { id: 8, text: '۸ عدد', count: 8 },
  { id: 9, text: '۹ عدد', count: 9 },
];

export const SMSPricingOptions = [
  {
    credit: 2000,
    price: 120000,
    creditText: '۲ هزار',
    priceText: '۱۲۰ هزار',
    tax: 10800,
    finalPrice: 130800,
  },
  {
    credit: 5000,
    price: 280000,
    creditText: '۵ هزار',
    priceText: '۲۸۰ هزار',
    tax: 25200,
    finalPrice: 305200,
  },
  {
    credit: 10000,
    price: 540000,
    creditText: '۱۰ هزار',
    priceText: '۵۴۰ هزار',
    tax: 48600,
    finalPrice: 588600,
  },
  {
    credit: 20000,
    price: 1000000,
    creditText: '۲۰ هزار',
    priceText: '۱ میلیون',
    tax: 90000,
    finalPrice: 1090000,
  },
  {
    credit: 50000,
    price: 2500000,
    creditText: '۵۰ هزار',
    priceText: '۲.۵ میلیون',
    tax: 225000,
    finalPrice: 2725000,
  },
];

export const defaultDeliveryTimes = {
  '6': [
    {
      from: '09:00',
      to: '12:00',
    },
  ],
  '7': [
    {
      from: '09:00',
      to: '12:00',
    },
  ],
  '1': [
    {
      from: '09:00',
      to: '12:00',
    },
  ],
  '2': [
    {
      from: '09:00',
      to: '12:00',
    },
  ],
  '3': [
    {
      from: '09:00',
      to: '12:00',
    },
  ],
  '4': [],
  '5': [],
};

export const START_LOADING = 'vitrin/App/START_LOADING';
export const STOP_LOADING = 'vitrin/App/STOP_LOADING';
export const ADMIN_ORDERS_PAGE_SIZE = 20;
