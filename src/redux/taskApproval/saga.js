import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard"; 

const { apiUrlTasRequest } = Setting;

function taskApi(urlx,payload) {
  return axios.request({
    method: 'get',
    url: urlx,
    data: payload
  });
}

export function* taskRequest({payload}) {
  
  try {
    const urlApi = apiUrlTasRequest+"?userId="+payload.userId+"&PAGEN_1="+payload.offset+"";
    let { data } = yield call(taskApi, urlApi, payload);

    let iu = [];


      if (data.result.length !== '0') {
        // console.log("masuk", data.result.data);

        data.result.data.map((item, index, key)=>(
          // console.log("Looping datanya : "+ JSON.stringify(item))
          // console.log("looping datanya : " + item.group_id)

          // item.DATA.CONTENT.TITLE == 'Leave Request' && item.DATA.CONTENT.DATA.STATUS == "Participated 0% (0 of 1)" ? 
          
          iu.push(item)

          // : null

        ));

        // console.log("Looping datanya aja : "+ JSON.stringify(iu)) ;

        // iu.push(data.result);
        // console.log("masuk", iu);

        yield put({
          type: actions.TASK_SUCCESS,
          data: iu 
        });

      } else {
        yield put({
          type: actions.TASK_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TASK_ERROR,
      // payload: { token: null }
    });
  }
}


export function* taskError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.TASK_REQUEST, taskRequest),
    yield takeEvery(actions.TASK_ERROR, taskError)
  ]);
}