/**
 * Gets the repositories of the user from Github
 */
import Axios from 'axios';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { setSiteDomain, startLoading, stopLoading } from '../../src/containers/App/actions';
import request from '../../utils/request';
import {
  BUSINESSES_BY_OWNER_API,
  LOGIN_API,
  USER_INFO_API,
  VERIFY_API
} from '../../utils/api';
import { GET_BUSINESSES, LOGIN, UPDATE_PROFILE, VERIFICATION } from './constants';
import { toggleModal, setSnackBarMessage } from '../ui/actions';
import { VERIFICATION_MODAL } from '../ui/constants';
import { setLoginCallBack, setToken, setUser } from './actions';
import { makeSelectLoginCallBack } from './selector';

export function* login(payload) {
  try {
    yield put(startLoading());
    const { data } = payload;
    const dto = {
      phone: data
    };
    yield call(request, LOGIN_API, dto, 'POST');
    yield put(toggleModal(VERIFICATION_MODAL, true, true));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* verify(action) {
  try {
    yield put(startLoading());
    const {
      data: { username, password }
    } = action;
    const dto = {
      username,
      password
    };
    const {
      response: { meta, data: userToken }
    } = yield call(request, VERIFY_API, dto, 'POST');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const { token, user } = userToken;
      yield put(setToken(token));
      yield put(setUser(user));
      localStorage.setItem('token', token);
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
      yield call(getBusinesses, { history: action.history });
      yield put(stopLoading());
      const callBack = yield select(makeSelectLoginCallBack());
      yield call(callBack);
      yield put(setLoginCallBack(() => {
      }));
    } else yield put(setSnackBarMessage('کد تایید نادرست است', 'fail'));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getBusinesses(action) {
  try {
    yield put(startLoading());

    const {
      response: { meta, data }
    } = yield call(request, BUSINESSES_BY_OWNER_API);
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const businessesWithVitrin = data.filter(b => b.get_vitrin_absolute_url);
      if (businessesWithVitrin.length === 0)
        window.location.href = 'https://panel.vitrin.site';
      else {
        // yield put(setSiteDomain(businessesWithVitrin[0].get_vitrin_absolute_url));
        yield put(setSiteDomain('olddowntown'));
        action.history.push('/online-orders');
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateProfile(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta }
    } = yield call(request, USER_INFO_API, action.data, 'PATCH');
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage('ویرایش اطلاعات با موفقیت انجام شد', 'success')
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
  takeLatest(GET_BUSINESSES, getBusinesses)
];
