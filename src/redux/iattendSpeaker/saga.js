import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

const { apiUrlApprovalRequest, apiUrlApprovalButtonApproveRequest, apiUrlApprovalButtonRejectRequest } = Setting;

function iattendSpeakerApi(urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload
  });
}

export function* iattendspeakerRequest({payload}) {
  
  try {

      // console.log("disini");

      let payload3 = {
        eventId: payload.eventid
      };
      

      const urlApi = "https://eventapp.dexagroup.com/apispeakerbyeventaudienceakar";
      let data = yield call(iattendSpeakerApi, urlApi, payload3);

      // console.log("ooo",data.length);

      let iu = [];


      if (data.length === undefined) {
        // console.log("masuk", data.data);

        // data.map((item, index, key)=>(
        //   // console.log("Looping datanya : "+ item.DATA.CONTENT.TITLE)
        //   iu.push(item)
        // ));


        yield put({
          type: actions.IATTENDSPEAKER_SUCCESS,
          data: data.data 
        });

      } else {
        yield put({
          type: actions.IATTENDSPEAKER_ERROR,
          // payload: { token: null }
        });
      }

  } catch (error) {
    yield put({
      type: actions.IATTENDSPEAKER_ERROR,
      // payload: { token: null }
    });
  }
}


export function* iattendspeakerError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.IATTENDSPEAKER_REQUEST, iattendspeakerRequest),
    yield takeEvery(actions.IATTENDSPEAKER_ERROR, iattendspeakerError)
  ]);
}