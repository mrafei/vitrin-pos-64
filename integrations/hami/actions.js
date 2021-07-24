import request from "../../utils/request";
import {
  getHamiDealCategoriesApi,
  getHamiDealItemApi,
  submitHamiOrderApi,
} from "./api";
import moment from "moment-jalaali";
import { CATEGORIES_API } from "../../utils/api";
const fs = require("fs");

export const init = () => {};

export const submitHamiOrder = (order) => {
  const orderDateObject = new Date(order.submitted_at);
  const orderDate = moment(order.submitted_at).format("jYYYY/jMM/jDD");
  const orderTime = `${`0${orderDateObject.getHours()}`.slice(
    -2
  )}:${`0${orderDateObject.getMinutes()}`.slice(
    -2
  )}:${`0${orderDateObject.getSeconds()}`.slice(-2)}`;

  request(
    submitHamiOrderApi(localStorage.getItem("hamiIp")),
    {
      Invoice: {
        OrderId: parseInt(order.order_id),
        BranchId: 1,
        OrderDate: orderDate,
        OrderTime: orderTime,
        CustomerCode: `${order.user_id}`,
        FirstName: order.user_address.name,
        LastName: "",
        Phone: order.user_address.phone,
        CellPhone: order.user_address.phone,
        LocationId: 0,
        DeliveryAddress: order.user_address.address,
        Comments: order.description,
        OrderType: 1,
        Price: order.total_items_price,
        DeliveryPrice: order.delivery_price,
        PackingPrice: order.total_packaging_price,
        Discount: order.total_discount,
        Tax: order.taxing_price,
        Duty: 0,
        Addition: 0,
        Rounded: 0,
        Payable: order.final_price,
        Remaining: 0,
        CommissionPrice: 0,
        PaymentTypeId: parseInt(order.payment_status) === 1 ? 1 : 3,
        DiscountCode: "",
        Latitude: `${order.user_address.latitude}`,
        Longitude: `${order.user_address.longitude}`,
        Items: order.items.map((item) => ({
          OrderItemId: parseInt(`${order.order_id}000${item.deal.pos_id}`),
          OrderId: parseInt(order.order_id),
          ProductId: parseInt(item.deal.pos_id),
          ProductCode: parseInt(item.deal.pos_code),
          ProductTitle: item.deal.title,
          ProductPrice: item.deal.initial_price,
          Quantity: item.amount,
          DescriptionPrice: 0,
          SumPrice: item.deal.initial_price,
          ProductDiscount: item.deal.initial_price - item.deal.discounted_price,
          Addition: 0,
          ProductTax: 0,
          ProductDuty: 0,
          TotalPrice: item.deal.discounted_price,
          Description: "",
        })),
        ItemsTopping: [],
      },
    },
    "POST"
  );
};
export const getHamiDeals = async () => {
  return await request(getHamiDealItemApi(localStorage.getItem("hamiIp")));
};
export const getHamiDealCategories = async () => {
  return await request(
    getHamiDealCategoriesApi(localStorage.getItem("hamiIp"))
  );
};

export const createOrUpdateHamiDealCategories = async () => {
  let exception = false;
  const result = await getHamiDealCategories();
  if (!result || !result.response) return null;
  fs.writeFile(
    "categories.json",
    JSON.stringify(result.response),
    { flag: "w" },
    function (err) {
      if (err) {
        exception = true;
        console.log(err);
      }
    }
  );
  if (exception) return null;
  return await request(CATEGORIES_API, [], "POST");
};
export const createOrUpdateHamiDeals = async () => {
  const result = await getHamiDeals();
  if (!result || !result.response) return null;
  fs.writeFile(
    "deals.json",
    JSON.stringify(result.response),
    { flag: "w" },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
};
export const createOrUpdateDealsAndCategories = async () => {
  const categoriesResult = await createOrUpdateHamiDealCategories();
  const dealsResult = await createOrUpdateHamiDeals();
  return categoriesResult && dealsResult;
};
