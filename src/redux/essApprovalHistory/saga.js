import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlApprovalRequest, apiUrlApprovalButtonApproveRequest, apiUrlApprovalButtonRejectRequest } = Setting;

function eesPostApi(urlx,payload) {
  return axios.request({
    method: 'get',
    url: urlx,
    data: payload
  });
}

function eesPostButtonApprovalApi(urlx,payload) {
  return axios.request({
    method: 'get',
    url: urlx,
    data: payload
  });
}

export function* eesapprovalhistoryRequest({payload}) {
  
  try {
    const urlApi = apiUrlApprovalRequest+"?userId="+payload.userId+"&PAGEN_1="+payload.offset+"";
    let { data } = yield call(eesPostApi, urlApi, payload);

    let iu = [];


      if (data.result.length !== '0') {
        // console.log("masuk", data.result);

        data.result.map((item, index, key)=>(
          // console.log("Looping datanya : "+ item.DATA.CONTENT.TITLE + " : " + item.DATA.CONTENT.DATA.STATUS)

          item.DATA.CONTENT.TITLE == 'Leave Request' && item.DATA.CONTENT.DATA.STATUS == "Completed" ? 
          
          iu.push(item)

          : null

        ));

        // console.log("Looping datanya aja : "+ JSON.stringify(iu)) ;

        // iu.push(data.result);
        // console.log("masuk", iu);

        yield put({
          type: actions.EESAPPROVAL_HISTORY_SUCCESS,
          data: iu 
        });

      } else {
        yield put({
          type: actions.EESAPPROVAL_HISTORY_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.EESAPPROVAL_HISTORY_ERROR,
      // payload: { token: null }
    });
  }
}

export function* eesapprovalbuttonhistoryRequest({payload}) {

  if(payload.buttonId == '1'){

    try {
      const urlApi = apiUrlApprovalButtonApproveRequest+"?userId="+payload.userId+"&workflowId="+payload.workflowId+"&buttonId="+payload.buttonId+"";
      let { data } = yield call(eesPostButtonApprovalApi, urlApi, payload);
  
        // console.log("eesapprovalbuttonRequest", payload, data);
  
        yield put({
          type: actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_SUCCESS,
          button:true
        });
  
  
  
    } catch (error) {
      // console.log("disini", error);
      yield put({
        type: actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR,
        // payload: { token: null }
      });
    }

  }else{

    try {
      const urlApi = apiUrlApprovalButtonRejectRequest+"?userId="+payload.userId+"&workflowId="+payload.workflowId+"&buttonId="+payload.buttonId+"";
      let { data } = yield call(eesPostButtonApprovalApi, urlApi, payload);
  
        // console.log("eesapprovalbuttonRequest", payload, data);
  
        yield put({
          type: actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_SUCCESS,
          button: true
        });
  
  
  
    } catch (error) {
        // console.log("disini", error);
      yield put({
        type: actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR,
        // payload: { token: null }
      });
    }    

  }

}


export function* eesapprovalhistoryError() {
  console.log("error")
}

export function* eesapprovalbuttonhistoryError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.EESAPPROVAL_HISTORY_REQUEST, eesapprovalhistoryRequest),
    yield takeEvery(actions.EESAPPROVAL_HISTORY_ERROR, eesapprovalhistoryError),
    yield takeEvery(actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_REQUEST, eesapprovalbuttonhistoryRequest),
    yield takeEvery(actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR, eesapprovalbuttonhistoryError),
  ]);
}