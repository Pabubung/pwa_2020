import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlIattendHome } = Setting;

function iattendhomePostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
} 

export function* iattendhomeRequest({payload}) {
  
  try {
    const urlApi = apiUrlIattendHome+"mobileIattend_listevent";
    let { data } = yield call(iattendhomePostApi, urlApi, payload);

    yield put({
      type: actions.IATTENDHOME_SUCCESS,
      data: data
    });
      
  } catch (error) {
    yield put({
      type: actions.IATTENDHOME_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendhomeError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDHOME_REQUEST, iattendhomeRequest),
    yield takeEvery(actions.IATTENDHOME_ERROR, iattendhomeError)
  ]);
}