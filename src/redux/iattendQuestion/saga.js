import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlIattendQuestion } = Setting;

function iattendquestionPostApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
} 

export function* iattendquestionRequest({payload}) {
  
  try {
    const urlApi = apiUrlIattendQuestion+"getagendaaudienceakar";
    let { data } = yield call(iattendquestionPostApi, urlApi, payload);

    yield put({
      type: actions.IATTENDQUESTION_SUCCESS,
      data: data
    });
      
  } catch (error) {
    yield put({
      type: actions.IATTENDQUESTION_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendquestionError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDQUESTION_REQUEST, iattendquestionRequest),
    yield takeEvery(actions.IATTENDQUESTION_ERROR, iattendquestionError)
  ]);
}