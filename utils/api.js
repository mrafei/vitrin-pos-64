/* eslint-disable prettier/prettier */
export const CDN_BASE_URL =
  'https://hs3-cf.behtarino.com/static/images/behtarino-web/';
const BASE_URL = 'https://api.behtarino.com/api/v1/';

export const EMAIL_API = `${BASE_URL}send_custom_email/`;
export const FILE_SERVER_URL_API = `${BASE_URL}get_minio_url/`;

// User API
export const LOGIN_API = `${BASE_URL}users/phone_verification/`;
export const VERIFY_API = `${BASE_URL}token_sign/`;
export const USER_INFO_API = `${BASE_URL}users/self/`;
export const IS_ADMIN_API = (slug) => `${BASE_URL}businesses/${slug}/is_admin/`;
export const USER_API = `${BASE_URL}users/self/`;
export const USER_ADDRESS_API = `${BASE_URL}user_address/by_user/`;
export const ADDRESS_API = `${BASE_URL}user_address/`;
export const ADDRESS_ID_API = (id) => `${BASE_URL}user_address/${id}`;
export const PUSH_NOTIFICATION_API = `${BASE_URL}push_notification_client/`;
export const ORDER_ANALYTICS_DATA_API = (plugin) =>
  `${BASE_URL}${plugin}_orders/analytics_data/`;

// Business API
export const BUSINESSES_TAGS = `${BASE_URL}businesses/tags/`;
export const BUSINESSES_BY_OWNER_API = `${BASE_URL}businesses/by_owner/`;
export const BUSINESS_BY_SITE_DOMAIN_API = (subDomain) =>
  `${BASE_URL}businesses/${subDomain}/by_site_domain/`;
export const BUSINESS_BY_SLUG_API = (slug) => `${BASE_URL}businesses/${slug}/`;
export const BUSINESS_WORKING_HOURS_API = (id) =>
  `${BASE_URL}businesses/working_hours/${id}/`;
export const BUSINESS_CREATION_ROUTE_PASSED_API = (slug) =>
  `${BASE_URL}businesses/${slug}/creation_route_passed/`;
export const BUSINESS_CUSTOMERS_COUNT_API = (slug) =>
  `${BASE_URL}businesses/${slug}/customers_count/`;

// Posts API
export const POST_IMAGES_API = `${BASE_URL}businesses/images/`;
export const POST_IMAGES_ITEM_API = (id) =>
  `${BASE_URL}businesses/images/${id}/`;
export const POST_VIDEOS_API = `${BASE_URL}businesses/videos/`;
export const POST_VIDEOS_ITEM_API = (id) =>
  `${BASE_URL}businesses/videos/${id}/`;

// Deals API
export const DEALS_API = `${BASE_URL}deals/`;
export const DEALS_IMAGES_API = `${BASE_URL}deals/images/`;
export const DEALS_ITEM_API = (id) => `${BASE_URL}deals/${id}/`;
export const DEALS_IMAGES_ITEM_API = (id) => `${BASE_URL}deals/images/${id}/`;
export const CATEGORIES_API = `${BASE_URL}deal_categories/`;
export const CATEGORIES_ITEMS_API = (id) => `${BASE_URL}deal_categories/${id}/`;
export const CATEGORIES_ITEMS_CHANGE_ORDER_API = (id) =>
  `${BASE_URL}deal_categories/${id}/change_order_by_business`;
export const GROUP_DISCOUNT_ON_DEALS = (id) =>
  `${BASE_URL}deal_categories/${id}/group_discount_on_deals`;
export const BUSINESS_CATEGORIES_API = () =>
  `${BASE_URL}deal_categories/by_business/`;
export const GROUP_DISCOUNT_ON_DEALS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/group_discount_on_deals/`;

// Orders API
export const ORDERS_API = (plugin) => `${BASE_URL}${plugin}_orders/`;
export const USER_ORDERS_API = (plugin) =>
  `${BASE_URL}${plugin}_orders/by_business_by_user/`;
export const USER_ORDERS_ITEMS_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/`;
export const BUSINESS_ORDERS_API = (plugin, page, pageSize) =>
  `${BASE_URL}${plugin}_orders/by_business_site_domain/?page=${page}&page_size=${pageSize}`;
export const BUSINESS_ORDERS_SORTED_BY_DELIVERER_API = (
  plugin,
  page,
  pageSize,
) =>
  `${BASE_URL}${plugin}_orders/by_business_site_domain_deliverer_sort/?page=${page}&page_size=${pageSize}&orders_status=1&orders_status=3`;

export const ORDER_CHANGE_PAYMENT_STATUS_TO_ON_SITE_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/change_payment_status_to_on_site/`;
export const ORDER_STATUS_PROGRESS_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/change_order_status_to_in_progress/`;
export const ORDER_STATUS_CANCELLED_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/change_order_status_to_cancelled/`;
export const ORDER_STATUS_DELIVERED_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/change_order_status_to_delivered/`;
export const ORDER_DELIVERIES_BY_DELIVERER = (page, pageSize) =>
  `${BASE_URL}food_orders/by_deliverer_name/?page=${page}&page_size=${pageSize}`;

export const ORDER_ONLINE_PAYMENT_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/payment_transaction/`;
export const ORDER_DISCOUNT_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/discount_code_action/`;
export const ORDER_DELIVERY_TIME_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/set_delivery_time/`;
export const ORDER_DELIVERER_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/set_deliverer_name/`;

export const ORDERS_LIST_DELIVERER_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/set_orders_list_deliverer/`;

// Plugins API
export const PLUGIN_TRIAL_API = (slug) =>
  `${BASE_URL}businesses/${slug}/enable_plugin_trial/`;
export const PLUGIN_PERSONAL_SITEDOMAIN_API = (slug) =>
  `${BASE_URL}businesses/${slug}/enable_personal_sitedomain/`;
export const BUY_PLUGIN_API = (slug) =>
  `${BASE_URL}businesses/${slug}/buy_plugin_transaction/`;
export const SET_PLUGIN_DATA_API = (slug) =>
  `${BASE_URL}businesses/${slug}/set_plugin_data/`;
export const SET_PLUGIN_PAYMENT_ACCOUNT_INFO_API = (slug) =>
  `${BASE_URL}businesses/${slug}/set_plugin_account_info/`;
export const SET_PLUGIN_PAYMENT_DATA_API = (slug) =>
  `${BASE_URL}businesses/${slug}/set_plugin_payment_data/`;

// Visit Card API
export const SEND_VISIT_CARD_API = (slug) =>
  `${BASE_URL}businesses/${slug}/send_visit_card_to_phone_number/`;
export const SEND_GROUP_VISIT_CARD_API = (slug) =>
  `${BASE_URL}businesses/${slug}/send_visit_card_from_sheet/`;
export const SEND_CUSTOM_VISIT_CARD_API = (slug) =>
  `${BASE_URL}businesses/${slug}/send_custom_visit_card_to_customers/`;
export const BUSINESS_VISIT_CARD_STATS_API = (domain) =>
  `${BASE_URL}business_visit_card_stats/${domain}/`;
export const BUSINESS_BUY_VISIT_CARD_SMS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/buy_visit_card_sms/`;

// Transactions API
export const GET_TRANSACTION_API = (id) => `${BASE_URL}transactions/${id}/`;
export const GET_ORDER_TRANSACTION_API = (id) =>
  `${BASE_URL}order_transactions/${id}/`;

export const TRANSACTION_ZIBAL_API = (id) =>
  `${BASE_URL}order_transactions/${id}/pay_transaction/`;
export const TRANSACTION_API = (id, gateway) =>
  `${BASE_URL}transactions/${id}/${gateway}_gateway`;
export const PAYMENT_API = `${BASE_URL}custom_payment/`;

export const VITRIN_CALL_BUTTON_CLICKS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_call_button_clicks/`;
export const VITRIN_PAGE_VIEWS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_page_views/`;

export const SUBMIT_REVIEW_API = `${BASE_URL}reviews/`;
export const GET_BUSINESS_REVIEWS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/reviews/`;
export const GET_BUSINESS_REVIEW_API = (id) => `${BASE_URL}reviews/${id}/`;
export const SUGGEST_EDIT_API = `${BASE_URL}business_edits/`;
