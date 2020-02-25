import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

const { apiUrlApprovalRequest, apiUrlApprovalButtonApproveRequest, apiUrlApprovalButtonRejectRequest } = Setting;

function iattendListApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
}

export function* iattendlistRequest({payload}) {
  
  try {

      // console.log("disini");

      let payload3 = {
        id: payload.eventid
      };
      

      const urlApi = "https://eventapp.dexagroup.com/apimobileIattend_report_attend_again";
      let data = yield call(iattendListApi, urlApi, payload3);

      // console.log("ooo",data.length);

      let iu = [];


      if (data.length === undefined) {
        // console.log("masuk", data.data);

        // data.map((item, index, key)=>(
        //   // console.log("Looping datanya : "+ item.DATA.CONTENT.TITLE)
        //   iu.push(item)
        // ));


        yield put({
          type: actions.IATTENDLIST_SUCCESS,
          data: data.data 
        });

      } else {
        yield put({
          type: actions.IATTENDLIST_ERROR,
          // payload: { token: null }
        });
      }

  } catch (error) {
    yield put({
      type: actions.IATTENDLIST_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendlistError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDLIST_REQUEST, iattendlistRequest),
    yield takeEvery(actions.IATTENDLIST_ERROR, iattendlistError)
  ]);
}