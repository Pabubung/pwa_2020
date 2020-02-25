import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlIattendAgenda } = Setting;

function iattendagendaPostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
} 

export function* iattendagendaRequest({payload}) {
  
  try {
    const urlApi = apiUrlIattendAgenda+"getagendaaudienceakar";
    let { data } = yield call(iattendagendaPostApi, urlApi, payload);

    yield put({
      type: actions.IATTENDAGENDA_SUCCESS,
      data: data
    });
      
  } catch (error) {
    yield put({
      type: actions.IATTENDAGENDA_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendagendaError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDAGENDA_REQUEST, iattendagendaRequest),
    yield takeEvery(actions.IATTENDAGENDA_ERROR, iattendagendaError)
  ]);
}