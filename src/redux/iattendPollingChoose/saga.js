import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

function iattendpollingchoosePostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
} 

export function* iattendpollingchooseRequest({payload}) {
  
  try {
    const urlApi = "https://eventapp.dexagroup.com/apimobileIattend_polling_detail";
    let { data } = yield call(iattendpollingchoosePostApi, urlApi, payload);

    yield put({
      type: actions.IATTENDPOLLINGCHOOSE_SUCCESS,
      data: data
    });
      
  } catch (error) {
    yield put({
      type: actions.IATTENDPOLLINGCHOOSE_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendpollingchooseError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDPOLLINGCHOOSE_REQUEST, iattendpollingchooseRequest),
    yield takeEvery(actions.IATTENDPOLLINGCHOOSE_ERROR, iattendpollingchooseError)
  ]);
}