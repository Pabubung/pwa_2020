import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlCreateLeaveRequest } = Setting;

function CreateLeavePostApi(urlx,payload) {
  return axios.request({
    method: 'POST',
    url: urlx,
    data: payload,
    // config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
}

export function* createleaveRequest({payload}) {
  try {

    // console.log("load dulu",payload);

    const urlApi = apiUrlCreateLeaveRequest;
    let { data } = yield call(CreateLeavePostApi, urlApi, payload);

    // var bodyFormData = new FormData();
    // bodyFormData.set('BPNAME', payload.BPNAME);
    // bodyFormData.set('NAME', payload.NAME);
    // bodyFormData.set('PROPERTY_399', payload.PROPERTY_399);
    // bodyFormData.set('PROPERTY_398', payload.PROPERTY_398);
    // bodyFormData.set('PROPERTY_400', payload.PROPERTY_400);
    // bodyFormData.set('PROPERTY_464', payload.PROPERTY_464);
    // bodyFormData.set('PROPERTY_495', payload.PROPERTY_495);
    // bodyFormData.set('PROPERTY_462', payload.PROPERTY_462);
    // bodyFormData.set('PROPERTY_463', payload.PROPERTY_463);
    // bodyFormData.set('PREVIEW_TEXT', payload.PREVIEW_TEXT);
    // bodyFormData.set('PROPERTY_538', payload.PROPERTY_538);
    // bodyFormData.set('userid', payload.userid);
    // bodyFormData.set('email', payload.email);

    // let { data } = yield call(CreateLeavePostApi, urlApi, bodyFormData);
    // console.log("disini ",data);
    var str1 = data;
    var str2 = 'success":true';
    // if(str1.indexOf(str2) != -1){
    if(data.result.success){
        // console.log(str2 + " found" + data);
        var datas = true;
        // console.log("disini ",data);
        yield put({
          type: actions.CREATE_LEAVE_SUCCESS,
          data: datas 
        });
    } else {
        yield put({
          type: actions.CREATE_LEAVE_ERROR,
        // payload: { token: null }
        });
    }

      // if (data.result.success) {
      //   yield put({
      //     type: actions.CREATE_LEAVE_SUCCESS,
      //     data: data 
      //   });
      // } else {
      //   yield put({
      //     type: actions.CREATE_LEAVE_ERROR,
      //     // payload: { token: null }
      //   });
      // }
  } catch (error) {
    yield put({
      type: actions.CREATE_LEAVE_ERROR,
      // payload: { token: null }
    });
  }
}

export function* createleaveError() {
  console.log("error")
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CREATE_LEAVE_REQUEST, createleaveRequest),
    yield takeEvery(actions.CREATE_LEAVE_ERROR, createleaveError),
  ]);
}