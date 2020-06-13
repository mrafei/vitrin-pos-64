/**
 * Gets the repositories of the user from Github
 */
import Axios from 'axios';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { startLoading, stopLoading } from '../../src/containers/App/actions';
import request from '../../utils/request';
import {
  LOGIN_API,
  USER_INFO_API,
  VERIFY_API,
  IS_ADMIN_API,
  USER_API,
} from '../../utils/api';
import { LOGIN, UPDATE_PROFILE, VERIFICATION } from './constants';
import { toggleModal, closeModals, setSnackBarMessage } from '../ui/actions';
import { VERIFICATION_MODAL } from '../ui/constants';
import { setLoginCallBack, setToken, setUser, setAdmin } from './actions';
import { makeSelectLoginCallBack } from './selector';
import {
  makeSelectBusiness,
  makeSelectBusinessSlug,
} from '../business/selector';

export function* login(payload) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const { data } = payload;
    const dto = {
      phone: data,
    };
    yield call(request, LOGIN_API(slug), dto, 'POST');
    yield put(toggleModal(VERIFICATION_MODAL, true, true));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* verify(payload) {
  try {
    yield put(startLoading());
    const {
      data: { username, password },
    } = payload;
    const dto = {
      username,
      password,
    };
    const {
      response: { meta, data: userToken },
    } = yield call(request, VERIFY_API, dto, 'POST');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const { token, user } = userToken;
      yield put(setToken(token));
      yield put(setUser(user));
      localStorage.setItem('token', token);
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      const business = yield select(makeSelectBusiness());
      const {
        response: { data: _user },
      } = yield call(request, USER_API, {}, 'GET');

      yield put(setUser(_user));

      const {
        response: { data },
      } = yield call(request, IS_ADMIN_API(business.slug), {}, 'GET');
      yield put(setAdmin(data));
      yield put(closeModals());
      yield put(stopLoading());
      const callBack = yield select(makeSelectLoginCallBack());
      yield call(callBack);
      yield put(setLoginCallBack(() => {}));
    } else yield put(setSnackBarMessage('کد تایید نادرست است', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateProfile(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(request, USER_INFO_API, action.data, 'PATCH');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage('ویرایش اطلاعات با موفقیت انجام شد', 'success'),
      );
      yield put(setUser(data));
    } else yield put(setSnackBarMessage('ویرایش اطلاعات ناموفق بود', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage('ویرایش اطلاعات ناموفق بود', 'fail'));
    yield put(stopLoading());
  }
}

export default [
  takeLatest(LOGIN, login),
  takeLatest(VERIFICATION, verify),
  takeLatest(UPDATE_PROFILE, updateProfile),
];
