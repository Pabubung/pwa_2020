import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken, getToken, getData } from '../../helpers/utility';
import actions from './actions';
import axios from 'axios';
import base64 from 'base-64';
import utf8 from 'utf8';
import Setting from '../../settings'; 

const { apiUrl, apiUrlLoginBitrix, apiUrlLoginIT138 } = Setting;
const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

function loginApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
}

export function* loginRequest({payload}) {
  try {
    const urlApi = apiUrlLoginBitrix;
    let { data } = yield call(loginApi, urlApi, payload);
      // console.log("ooo",data);
      if (data.data.result.exist) {

        yield put({
          type: actions.LOGIN_SUCCESS,
          payload: { data: {bitrix: data.data, it138: '', token:data.token, audienceid:'', userLogin:{ username: payload.email, password: payload.password } } }
        });


        // let urlxs = apiUrlLoginIT138
        // let payload2 = {
        //   // password: utf8.encode(base64.encode(payload.password)),
        //   password: payload.password,
        //   username: payload.email
        // };
        
        // let resp = yield call(loginApi, urlxs, payload2);
        // // console.log("ppp",resp);
        // if(resp.data.acknowledge){

        //   let urlIattend = "https://eventapp.dexagroup.com/apipwaIattend_registerevent";
        //   let payload3 = {
        //     userPassword: payload.password,
        //     userEmail: payload.email,
        //     userName: data.result.data.NAME,
        //     userCompany: data.result.data.CCOMPANY_ID,
        //     userPhone: data.result.data.PERSONAL_MOBILE,
        //     userJabatan: data.result.data.PERSONAL_PROFESSION

        //   };
          
        //   let iattend = yield call(loginApi, urlIattend, payload3);
        //   // console.log("iattend", iattend);

        //   if(iattend.data.acknowledge){

        //     yield put({
        //       type: actions.LOGIN_SUCCESS,
        //       payload: { token: resp.data.token, data: {bitrix: data, it138: resp.data.result, audienceid:iattend.data.datanya[0].id } }
        //     });

        //   }

        // }else{
        //   yield put({
        //     type: actions.LOGIN_ERROR,
        //     payload: { token: null }
        //   });
        // }


      } else {
        yield put({
          type: actions.LOGIN_ERROR,
          payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.LOGIN_ERROR,
      payload: { token: null }
    });
  }
}

export function* loginSuccess({ payload }) {
  yield localStorage.setItem('id_token', payload.token);
  yield localStorage.setItem('data', JSON.stringify(payload.data));
}

export function* loginError() {
  // console.log("error")
}

export function* logout() {
  clearToken();
  yield put(push('/'));
}
export function* checkAuthorization() {
  const token = getToken();
  const data = getData();
  if (token) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: { token,data },
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    yield takeEvery(actions.LOGIN_REQUEST, loginRequest),
    yield takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(actions.LOGIN_ERROR, loginError),
    yield takeEvery(actions.LOGOUT, logout),
  ]);
}
