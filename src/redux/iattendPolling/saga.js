import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

function iattendpollingPostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
} 

export function* iattendpollingRequest({payload}) {
  
  try {
    const urlApi = "https://eventapp.dexagroup.com/apimobileIattend_polling";
    let { data } = yield call(iattendpollingPostApi, urlApi, payload);

    yield put({
      type: actions.IATTENDPOLLING_SUCCESS,
      data: data
    });
      
  } catch (error) {
    yield put({
      type: actions.IATTENDPOLLING_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendpollingError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDPOLLING_REQUEST, iattendpollingRequest),
    yield takeEvery(actions.IATTENDPOLLING_ERROR, iattendpollingError)
  ]);
}