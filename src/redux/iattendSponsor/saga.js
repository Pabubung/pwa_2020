import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

const { apiUrlApprovalRequest, apiUrlApprovalButtonApproveRequest, apiUrlApprovalButtonRejectRequest } = Setting;

function iattendSponsorApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
}

export function* iattendsponsorRequest({payload}) {
  
  try {

      // console.log("disini");

      let payload3 = {
        eventId: payload.eventid
      };
      

      const urlApi = "https://eventapp.dexagroup.com/apisponsorbyeventaudienceakar";
      let data = yield call(iattendSponsorApi, urlApi, payload3);

      // console.log("ooo",data.length);

      let iu = [];


      if (data.length === undefined) {
        // console.log("masuk", data.data);

        // data.map((item, index, key)=>(
        //   // console.log("Looping datanya : "+ item.DATA.CONTENT.TITLE)
        //   iu.push(item)
        // ));


        yield put({
          type: actions.IATTENDSPONSOR_SUCCESS,
          data: data.data 
        });

      } else {
        yield put({
          type: actions.IATTENDSPONSOR_ERROR,
          // payload: { token: null }
        });
      }

  } catch (error) {
    yield put({
      type: actions.IATTENDSPONSOR_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendsponsorError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDSPONSOR_REQUEST, iattendsponsorRequest),
    yield takeEvery(actions.IATTENDSPONSOR_ERROR, iattendsponsorError)
  ]);
}