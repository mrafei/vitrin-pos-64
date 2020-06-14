import React, { memo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import bg1 from '../../../assets/images/login-bg-1.png';
import bg2 from '../../../assets/images/login-bg-2.png';
import logo from '../../../assets/images/vitrin-blue.png';
import { PrimaryButton } from '../../components/Button';
import { validatePhone } from '../../../utils/helper';
import { compose } from 'redux';
import { login, verify } from '../../../stores/user/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading } from '../App/selectors';

function Login({ _login, loading, _verify, history }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const [phoneError, setPhoneError] = useState('');
  return <div className="d-flex flex-1 justify-content-around align-items-center">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: 400 }}>
      <img className="" src={logo} style={{ height: 85, width: 220 }}/>
      <div className="u-text-black u-fontWeightBold u-fontVeryLarge mt-5 text-center">به نرم‌افزار مدیریت فروش ویترین
        خوش آمدید.
      </div>
      <div className="mt-3 text-center u-text-black u-fontLarge">برای ورود شماره تماس و کد تایید پیامک شده به موبایل خود
        را وارد کنید.
      </div>
    </div>
    <div className="d-flex flex-column justify-content-center" style={{ width: 400 }}>
      <input className="u-border-bottom-dark-grey w-100 text-center"
             type="tel"
             onChange={(e) => {
               setPhoneError('');
               if (e.target.value.length > 10)
                 if (!validatePhone(e.target.value))
                   setPhoneError('شماره تلفن را به درستی وارد کنید.');
                 else
                   _login(phone);
               setPhone(e.target.value.slice(0, 11));
             }}
             value={phone}
      />
      <div className="u-text-red text-right mt-2">{phoneError}</div>
      <input className="u-border-bottom-dark-grey w-100 text-center" maxLength="4"
             onChange={(e) => setCode(e.target.value)} style={{ marginTop: 60 }}/>
      <PrimaryButton isLoading={loading} text="تایید و ادامه" style={{ marginTop: 60 }}
                     disabled={code.length !== 4 || !validatePhone(phone)}
                     onClick={() => {
                       _verify(phone, code, history);
                     }}/>
    </div>
    <img className="position-absolute right-0 u-top-0" src={bg1}/>
    <img className="position-absolute left-0 bottom-0" src={bg2}/>

  </div>;
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
  return {
    _login: phone => dispatch(login(phone)),
    _verify: (phone, code, history) => dispatch(verify(phone, code, history))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withRouter,
  withConnect,
  memo
)(Login);
