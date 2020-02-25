import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlMyLeaveRequest } = Setting;

function LeavePostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
}

export function* leaveRequest({payload}) {
  try {

    // console.log("leave req nih", payload);
    const urlApi = apiUrlMyLeaveRequest;
    let { data } = yield call(LeavePostApi, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.LEAVE_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.LEAVE_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.LEAVE_ERROR,
      // payload: { token: null }
    });
  }
}

export function* leaveError() {
  console.log("error")
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.LEAVE_REQUEST, leaveRequest),
    yield takeEvery(actions.LEAVE_ERROR, leaveError),
  ]);
}