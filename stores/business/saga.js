import {call, put, takeLatest, select} from '@redux-saga/core/effects';
import {
  startLoading,
  stopLoading,
} from '../../src/containers/App/actions';
import request from '../../utils/request';
import {
  BUSINESS_BY_SLUG_API,
  CATEGORIES_API,
  CATEGORIES_ITEMS_API,
  BUSINESS_BY_SITE_DOMAIN_API,
  DEALS_API,
  DEALS_ITEM_API,
  DEALS_IMAGES_ITEM_API,
  DEALS_IMAGES_API,
  POST_IMAGES_API,
  POST_IMAGES_ITEM_API,
  SUGGEST_EDIT_API,
  POST_VIDEOS_API,
  POST_VIDEOS_ITEM_API,
  SET_PLUGIN_DATA_API, ORDER_DELIVERIES_BY_DELIVERER,
} from '../../utils/api';
import {
  UPDATE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_BUSINESS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_IMAGE_FROM_PRODUCT,
  ADD_IMAGE_TO_PRODUCT,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_SECTION,
  SUGGEST_BUSINESS_EDIT, SET_PLUGIN_DATA, GET_DELIVERIES, DELIVERIES_PAGE_SIZE,
} from './constants';
import {setBusiness, setDeliveries} from './actions';
import {makeSelectSubDomain} from '../../src/containers/App/selectors';
import {closeModals, setSnackBarMessage} from '../ui/actions';
import {
  makeSelectBusiness,
  makeSelectBusinessSlug,
  makeSelectBusinessThemeConfig,
} from './selector';
import {sectionNames} from '../../utils/themeConfig/constants';
import {ADMIN_ORDERS_PAGE_SIZE} from "../../src/containers/OnlineOrders/constants";
import {setFoodAdminOrders} from "../../src/containers/OnlineOrders/actions";

export function* getBusinessData() {
  try {
    yield put(startLoading());
    const subdomain = yield select(makeSelectSubDomain());
    const {
      response: {data: business},
    } = yield call(request, BUSINESS_BY_SITE_DOMAIN_API(subdomain), {}, 'GET');
    yield put(closeModals());
    yield put(setBusiness(business));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateBusiness(action) {
  const {successMessage, failMessage} = action;
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: {meta},
    } = yield call(request, BUSINESS_BY_SLUG_API(slug), action.data, 'PATCH');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          successMessage || 'تغییرات شما با موفقیت ذخیره شد.',
          'success',
        ),
      );
      yield call(getBusinessData);
    } else
      yield put(
        setSnackBarMessage(failMessage || 'ثبت تغییرات ناموفق بود!', 'fail'),
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage(failMessage || 'ثبت تغییرات ناموفق بود!', 'fail'),
    );
    yield put(stopLoading());
  }
}

export function* updateBusinessWorkingHour(action) {
  const {data, label} = action;
  const business = yield select(makeSelectBusiness());

  const workingHours = {...business.working_hours};
  workingHours[label] = data.map(shift => ({
    to: `${shift.to}:00`,
    from: `${shift.from}:00`,
  }));
  try {
    yield put(startLoading());
    const {
      response: {meta},
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(business.slug),
      {working_hours: workingHours},
      'PATCH',
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getBusinessData);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createCategory(action) {
  const {name} = action.data;
  try {
    yield put(startLoading());
    const {
      response: {meta},
    } = yield call(request, CATEGORIES_API, action.data, 'POST');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(`دسته‌بندی ${name} با موفقیت اضافه شد.`, 'success'),
      );
      yield call(getBusinessData);
    } else
      yield put(
        setSnackBarMessage(`ثبت دسته‌بندی ${name} ناموفق بود!`, 'fail'),
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`ثبت دسته‌بندی ${name} ناموفق بود!`, 'fail'));
    yield put(stopLoading());
  }
}

export function* updateCategory(action) {
  const {id, name} = action.data;
  try {
    yield put(startLoading());

    const {
      response: {meta},
    } = yield call(request, CATEGORIES_ITEMS_API(id), {name}, 'PATCH');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          `ویرایش دسته‌بندی ${name} با موفقیت انجام شد.`,
          'success',
        ),
      );
      yield call(getBusinessData);
    } else
      yield put(
        setSnackBarMessage(`ویرایش دسته‌بندی ${name} ناموفق بود!`, 'fail'),
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage(`ویرایش دسته‌بندی ${name} ناموفق بود!`, 'fail'),
    );
    yield put(stopLoading());
  }
}

export function* deleteCategory(action) {
  const {name, id} = action.data;
  const {history} = action;
  try {
    yield put(startLoading());
    const {
      response: {meta},
    } = yield call(request, CATEGORIES_ITEMS_API(id), {}, 'DELETE');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(`دسته‌بندی ${name} با موفقیت حذف شد.`, 'success'),
      );
      history.push('/admin/products');
      yield call(getBusinessData);
    } else
      yield put(
        setSnackBarMessage(`حذف دسته‌بندی ${name} ناموفق بود!`, 'fail'),
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`حذف دسته‌بندی ${name} ناموفق بود!`, 'fail'));
    yield put(stopLoading());
  }
}

export function* createProduct(action) {
  try {
    yield put(startLoading());
    const {product, images} = action.data;

    const {
      response: {meta, data: deal},
    } = yield call(request, DEALS_API, product, 'POST');

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      for (let image = 0; image < images.length; image += 1) {
        const dto = {
          image: `${images[image].folder_name}/${images[image].file_name}`,
          deal: deal.id,
        };
        yield call(request, DEALS_IMAGES_API, dto, 'POST');
      }
      yield put(setSnackBarMessage('محصول با موفقیت اضافه شد.', 'success'));
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('ثبت محصول ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ثبت محصول ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* updateProduct(action) {
  try {
    yield put(startLoading());
    const {id, product, images} = action.data;

    const {
      response: {meta},
    } = yield call(request, DEALS_ITEM_API(id), product, 'PATCH');

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      for (let image = 0; image < images.length; image += 1) {
        const dto = {
          image: `${images[image].folder_name}/${images[image].file_name}`,
          deal: id,
        };
        yield call(request, DEALS_IMAGES_API, dto, 'POST');
      }
      yield put(
        setSnackBarMessage('ویرایش محصول با موفقیت انجام شد', 'success'),
      );
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('ویرایش محصول ناموفق بود', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ویرایش محصول ناموفق بود', 'fail'));
    yield put(stopLoading());
  }
}

export function* deleteProduct(action) {
  try {
    yield put(startLoading());
    const {id} = action.data;
    const {
      response: {meta},
    } = yield call(request, DEALS_ITEM_API(id), {}, 'DELETE');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage('محصول مورد نظر حذف شد.', 'success'));
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('حذف محصول ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('حذف محصول ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* addImageToProduct(action) {
  try {
    yield put(startLoading());
    const {
      response: {meta},
    } = yield call(request, DEALS_IMAGES_API, action.data, 'POST');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getBusinessData);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteImageFromProduct(action) {
  try {
    yield put(startLoading());
    const {id} = action.data;
    const {
      response: {meta},
    } = yield call(request, DEALS_IMAGES_ITEM_API(id), {}, 'DELETE');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      // yield call(getBusinessData);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createPost(action) {
  try {
    yield put(startLoading());
    const {post} = action.data;
    const {
      response: {meta},
    } = yield call(
      request,
      action.postType === 'image' ? POST_IMAGES_API : POST_VIDEOS_API,
      post,
      'POST',
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage('پست با موفقیت اضافه شد.', 'success'));
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('ثبت پست ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ثبت پست ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* updatePost(action) {
  try {
    yield put(startLoading());
    const {post} = action.data;

    const {
      response: {meta},
    } = yield call(
      request,
      action.postType === 'image'
        ? POST_IMAGES_ITEM_API(post.id)
        : POST_VIDEOS_ITEM_API(post.id),
      post,
      'PATCH',
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage('ویرایش پست با موفقیت انجام شد', 'success'));
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('ویرایش پست ناموفق بود', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ویرایش پست ناموفق بود', 'fail'));
    yield put(stopLoading());
  }
}

export function* deletePost(action) {
  try {
    yield put(startLoading());
    const {id} = action.data;
    const {
      response: {meta},
    } = yield call(
      request,
      action.postType === 'image'
        ? POST_IMAGES_ITEM_API(id)
        : POST_VIDEOS_ITEM_API(id),
      {},
      'DELETE',
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage('پست مورد نظر حذف شد.', 'success'));
      yield call(getBusinessData);
    } else yield put(setSnackBarMessage('حذف پست ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('حذف محصول ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* changeCategoryOrderFunc(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const {data: sections} = action;
    const {
      response: {meta, data},
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      {theme_config: {...themeConfig, sections_skeleton: sections}},
      'PATCH',
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setBusiness({...business, ...data}));
    } else yield put(setSnackBarMessage('ویرایش ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ویرایش ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* updateSection(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const {sections_skeleton: sections} = themeConfig;
    const {data: updatedSection} = action;
    const sectionIndex = sections.findIndex(
      s => s.name === updatedSection.name,
    );
    sections.splice(sectionIndex, 1, updatedSection);
    const {
      response: {meta, data},
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      {theme_config: {...themeConfig, sections_skeleton: sections}},
      'PATCH',
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          `نمایش بخش ${sectionNames[updatedSection.name]} برای کاربران ${
            updatedSection.is_active ? 'فعال' : 'غیرفعال'
          } شد. `,
          'success',
        ),
      );
      yield put(setBusiness({...business, ...data}));
    } else yield put(setSnackBarMessage('ویرایش ناموفق بود!', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ویرایش ناموفق بود!', 'fail'));
    yield put(stopLoading());
  }
}

export function* suggestEdit(action) {
  try {
    const business = yield select(makeSelectBusiness());
    yield call(
      request,
      SUGGEST_EDIT_API,
      {business: business.id, ...action.data},
      'POST',
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* setPluginData(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const business = yield select(makeSelectBusiness());
    const {
      response: {data},
    } = yield call(request, SET_PLUGIN_DATA_API(slug), action.data, 'PATCH');
    if (data) {
      yield put(setBusiness({...business, ...data}));
      yield put(
        setSnackBarMessage(
          action.successMessage,
          'success',
        ),
      );
    } else yield put(setSnackBarMessage(
      action.errorMessage,
      'fail',
    ));

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(
      action.errorMessage,
      'fail',
    ));
    yield put(stopLoading());
  }
}

export function* getDeliveries(action) {
  try {
    yield put(startLoading());
    const domain = yield select(makeSelectSubDomain());
    const page = action.data.page || 1;
    const {
      response: {data, pagination},
    } = yield call(request, ORDER_DELIVERIES_BY_DELIVERER(page, DELIVERIES_PAGE_SIZE)
      , {domain, deliverer_name: action.data.deliverer}, 'GET');
    const pagesCount = Math.ceil(pagination.count / DELIVERIES_PAGE_SIZE);

    if (data) {
      yield put(setDeliveries(data, {...pagination, pagesCount}));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export default [
  takeLatest(GET_BUSINESS, getBusinessData),
  takeLatest(UPDATE_BUSINESS_REQUEST, updateBusiness),
  takeLatest(UPDATE_BUSINESS_WORKING_HOUR_REQUEST, updateBusinessWorkingHour),
  takeLatest(CREATE_CATEGORY, createCategory),
  takeLatest(UPDATE_CATEGORY, updateCategory),
  takeLatest(DELETE_CATEGORY, deleteCategory),
  takeLatest(CREATE_PRODUCT, createProduct),
  takeLatest(UPDATE_PRODUCT, updateProduct),
  takeLatest(DELETE_PRODUCT, deleteProduct),
  takeLatest(DELETE_IMAGE_FROM_PRODUCT, deleteImageFromProduct),
  takeLatest(ADD_IMAGE_TO_PRODUCT, addImageToProduct),
  takeLatest(CREATE_POST, createPost),
  takeLatest(UPDATE_POST, updatePost),
  takeLatest(DELETE_POST, deletePost),
  takeLatest(UPDATE_SECTION, updateSection),
  takeLatest(SUGGEST_BUSINESS_EDIT, suggestEdit),
  takeLatest(SET_PLUGIN_DATA, setPluginData),
  takeLatest(GET_DELIVERIES, getDeliveries),
];
