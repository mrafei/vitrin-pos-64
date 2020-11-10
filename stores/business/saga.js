import { call, put, takeLatest, select } from "@redux-saga/core/effects";
import {
  setPrinterOptions,
  startLoading,
  startProgressLoading,
  stopLoading,
  stopProgressLoading,
} from "../../src/containers/App/actions";
import request from "../../utils/request";
import {
  CATEGORIES_API,
  CATEGORIES_ITEMS_API,
  DEALS_API,
  DEALS_ITEM_API,
  DEALS_IMAGES_ITEM_API,
  DEALS_IMAGES_API,
  SET_PLUGIN_DATA_API,
  ORDER_DELIVERIES_BY_DELIVERER,
  BUSINESS_LIGHT_BY_SITE_DOMAIN_API,
  GROUP_PACKAGING_PRICE_ON_DEALS_API,
  GROUP_DISCOUNT_ON_DEALS,
  DEALS_EXTRA_ITEMS_ITEM_API,
  DEALS_EXTRA_ITEMS_API,
} from "../../utils/api";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_BUSINESS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_IMAGE_FROM_PRODUCT,
  SET_PLUGIN_DATA,
  GET_DELIVERIES,
  DELIVERIES_PAGE_SIZE,
  GET_DEAL,
} from "./constants";
import { applyCategory, setBusiness, setDeal, setDeliveries } from "./actions";
import { makeSelectSubDomain } from "../../src/containers/App/selectors";
import { reloadPage, setSnackBarMessage } from "../ui/actions";
import { makeSelectBusiness, makeSelectBusinessSlug } from "./selector";
import { remote } from "electron";

export function* getBusinessData() {
  try {
    yield put(startProgressLoading());

    const subdomain = yield select(makeSelectSubDomain());
    const {
      response: { data: business },
    } = yield call(
      request,
      BUSINESS_LIGHT_BY_SITE_DOMAIN_API(subdomain),
      {},
      "GET"
    );
    yield put(setBusiness(business));
    if (localStorage.getItem("printerOptions"))
      yield put(
        setPrinterOptions(JSON.parse(localStorage.getItem("printerOptions")))
      );
    else {
      const defaultPrinter = remote
        .getCurrentWebContents()
        .getPrinters()
        .find((p) => p.isDefault);
      let printers = [];
      if (defaultPrinter)
        printers.push({
          id: 1,
          title: `چاپگر ۱`,
          device: defaultPrinter.name,
          isActive: true,
          copies: 1,
          factor: {},
        });
      yield put(
        setPrinterOptions({
          title: business.revised_title,
          phone: business.phone_zero_starts,
          website: business.get_vitrin_absolute_url,
          printers,
        })
      );
    }
    yield put(stopProgressLoading());
  } catch (err) {
    console.log(err);
    yield put(stopProgressLoading());
  }
}

export function* createCategory(action) {
  const {
    data: { name },
    history,
  } = action;
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, CATEGORIES_API, action.data, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(`دسته‌بندی ${name} با موفقیت اضافه شد.`, "success")
      );
      yield put(applyCategory(data, "create"));
      yield call(history.goBack);
    } else
      yield put(
        setSnackBarMessage(`ثبت دسته‌بندی ${name} ناموفق بود!`, "fail")
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`ثبت دسته‌بندی ${name} ناموفق بود!`, "fail"));
    yield put(stopLoading());
  }
}
export function* updateCategory(action) {
  const { id, name, packagingPrice, discount } = action.data;
  try {
    yield put(startLoading());

    const {
      response: { meta },
    } = yield call(request, CATEGORIES_ITEMS_API(id), { name }, "PATCH");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          `ویرایش دسته‌بندی ${name} با موفقیت انجام شد.`,
          "success"
        )
      );
      yield put(applyCategory(action.data, "update"));
    } else
      yield put(
        setSnackBarMessage(`ویرایش دسته‌بندی ${name} ناموفق بود!`, "fail")
      );
    yield call(
      request,
      GROUP_DISCOUNT_ON_DEALS(id),
      {
        percent: +discount,
      },
      "PATCH"
    );
    yield call(
      request,
      GROUP_PACKAGING_PRICE_ON_DEALS_API(id),
      {
        amount: +packagingPrice,
      },
      "PATCH"
    );
    yield put(reloadPage());
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage(`ویرایش دسته‌بندی ${name} ناموفق بود!`, "fail")
    );
    yield put(stopLoading());
  }
}

export function* deleteCategory(action) {
  const { name, id } = action.data;
  const { history } = action;
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, CATEGORIES_ITEMS_API(id), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(`دسته‌بندی ${name} با موفقیت حذف شد.`, "success")
      );
      yield call(history.goBack);
      yield put(applyCategory({ id: action.data }, "delete"));
    } else
      yield put(
        setSnackBarMessage(`حذف دسته‌بندی ${name} ناموفق بود!`, "fail")
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`حذف دسته‌بندی ${name} ناموفق بود!`, "fail"));
    yield put(stopLoading());
  }
}

export function* createProduct(action) {
  try {
    yield put(startLoading());
    yield put(startProgressLoading());
    const { product, images, history } = action.data;

    const {
      response: { meta, data: deal },
    } = yield call(request, DEALS_API, product, "POST");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      for (let image = 0; image < images.length; image += 1) {
        const dto = {
          image: `${images[image].folder_name}/${images[image].file_name}`,
          deal: deal.id,
        };
        yield call(request, DEALS_IMAGES_API, dto, "POST");
      }
      yield put(setSnackBarMessage("محصول با موفقیت اضافه شد.", "success"));
      yield call(history.goBack);
    } else yield put(setSnackBarMessage("ثبت محصول ناموفق بود!", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("ثبت محصول ناموفق بود!", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  }
}

export function* updateProduct(action) {
  try {
    yield put(startLoading());
    yield put(startProgressLoading());
    const { id, product, images, callback, extraItems } = action.data;

    const {
      response: { meta },
    } = yield call(request, DEALS_ITEM_API(id), product, "PATCH");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      for (let image = 0; image < images.length; image += 1) {
        const dto = {
          image: `${images[image].folder_name}/${images[image].file_name}`,
          deal: id,
        };
        yield call(request, DEALS_IMAGES_API, dto, "POST");
      }
      if (extraItems) {
        for (let item = 0; item < extraItems.length; item += 1) {
          const { title, price, id: _id, deals } = extraItems[item];
          if (!_id) {
            yield call(
              request,
              DEALS_EXTRA_ITEMS_API,
              { title, price, deals: [id] },
              "POST"
            );
          } else {
            yield call(
              request,
              DEALS_EXTRA_ITEMS_ITEM_API(_id),
              { title, price, deals: [...deals, id] },
              "PATCH"
            );
          }
        }
        for (let item = 0; item < product.extra_items.length; item += 1) {
          const { id: _id, deals } = product.extra_items[item];
          if (!extraItems.map((i) => i.id || null).includes(_id)) {
            yield call(
              request,
              DEALS_EXTRA_ITEMS_ITEM_API(_id),
              {
                deals: deals.filter((deal) => deal !== id),
              },
              "PATCH"
            );
          }
        }
      }
      yield put(
        setSnackBarMessage("ویرایش محصول با موفقیت انجام شد", "success")
      );
      if (callback) yield call(callback);
    } else yield put(setSnackBarMessage("ویرایش محصول ناموفق بود", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("ویرایش محصول ناموفق بود", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  }
}

export function* deleteProduct(action) {
  try {
    yield put(startProgressLoading());
    yield put(startLoading());
    const { id, history } = action.data;
    const {
      response: { meta },
    } = yield call(request, DEALS_ITEM_API(id), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("محصول مورد نظر حذف شد.", "success"));
      yield call(history.goBack);
    } else yield put(setSnackBarMessage("حذف محصول ناموفق بود!", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  } catch (err) {
    yield put(setSnackBarMessage("حذف محصول ناموفق بود!", "fail"));
    yield put(stopLoading());
    yield put(stopProgressLoading());
  }
}

export function* deleteImageFromProduct(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    const {
      response: { meta },
    } = yield call(request, DEALS_IMAGES_ITEM_API(id), {}, "DELETE");
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* setPluginData(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const business = yield select(makeSelectBusiness());
    const {
      response: { data },
    } = yield call(request, SET_PLUGIN_DATA_API(slug), action.data, "PATCH");
    if (data) {
      yield put(setBusiness({ ...business, ...data }));
      yield put(setSnackBarMessage(action.successMessage, "success"));
    } else yield put(setSnackBarMessage(action.errorMessage, "fail"));

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(action.errorMessage, "fail"));
    yield put(stopLoading());
  }
}

export function* getDeliveries(action) {
  try {
    yield put(startProgressLoading());
    yield put(startLoading());
    const domain = yield select(makeSelectSubDomain());
    const page = action.data.page || 1;
    const {
      response: { data, pagination },
    } = yield call(
      request,
      ORDER_DELIVERIES_BY_DELIVERER(page, DELIVERIES_PAGE_SIZE),
      { domain, deliverer_name: action.data.deliverer },
      "GET"
    );
    const pagesCount = Math.ceil(pagination.count / DELIVERIES_PAGE_SIZE);

    if (data) {
      yield put(setDeliveries(data, { ...pagination, pagesCount }));
    }
    yield put(stopProgressLoading());
    yield put(stopLoading());
  } catch (err) {
    yield put(stopProgressLoading());
    yield put(stopLoading());
  }
}
export function* getProductSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;

    const {
      response: { meta, data },
    } = yield call(request, DEALS_ITEM_API(id), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setDeal({
          ...data,
          extra_data: {
            ...data.extra_data,
            complementary: data.extra_data.complementary || "",
            only_on_day: data.extra_data.only_on_day || [],
          },
        })
      );
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export default [
  takeLatest(GET_BUSINESS, getBusinessData),
  takeLatest(CREATE_CATEGORY, createCategory),
  takeLatest(UPDATE_CATEGORY, updateCategory),
  takeLatest(DELETE_CATEGORY, deleteCategory),
  takeLatest(CREATE_PRODUCT, createProduct),
  takeLatest(UPDATE_PRODUCT, updateProduct),
  takeLatest(DELETE_PRODUCT, deleteProduct),
  takeLatest(DELETE_IMAGE_FROM_PRODUCT, deleteImageFromProduct),
  takeLatest(SET_PLUGIN_DATA, setPluginData),
  takeLatest(GET_DELIVERIES, getDeliveries),
  takeLatest(GET_DEAL, getProductSaga),
];
