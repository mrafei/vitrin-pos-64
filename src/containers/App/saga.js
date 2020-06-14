import { all } from 'redux-saga/effects';
import userSaga from '../../../stores/user/saga';
import businessSaga from '../../../stores/business/saga';
import transactionSaga from '../../../stores/transaction/saga';

export default function* generalSaga() {
  yield all([
    ...userSaga,
    ...businessSaga,
    ...transactionSaga
  ]);
}
