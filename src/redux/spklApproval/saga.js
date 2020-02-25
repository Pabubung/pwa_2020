import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlApproval_spklRequest, apiUrlApproval_spklButtonApproveRequest, apiUrlApproval_spklButtonRejectRequest } = Setting;

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

export function* eesapprovalRequest({payload}) {
  
  try {
    const urlApi = apiUrlApproval_spklRequest+"?userId="+payload.userId+"&PAGEN_1="+payload.offset+"";
    // const urlApi = apiUrlApproval_spklRequest+"?userId=8504&PAGEN_1="+payload.offset+"";
    let { data } = yield call(eesPostApi, urlApi, payload);

    let iu = [];


      if (data.result.length !== '0') {
        // console.log("masuk", data.result);

        data.result.map((item, index, key)=>(
          // console.log("Looping datanya : "+ item.DATA.CONTENT.TITLE)

          // item.DATA.CONTENT.TITLE == 'SPKL' && item.DATA.CONTENT.DATA.STATUS == "Participated 0% (0 of 1)" ? 
          item.DATA.CONTENT.TITLE == 'SPKL' && item.DATA.CONTENT.DATA.STATUS == "Participated 0% (0 of 1)" ?
          // item.DATA.CONTENT.TITLE == 'SPKL' ?
          
          iu.push(item)

          : null

        ));

        // console.log("Looping datanya aja : "+ JSON.stringify(iu)) ;

        // iu.push(data.result);
        // console.log("masuk", iu);

        yield put({
          type: actions.SPKLAPPROVAL_SUCCESS,
          data: iu 
        });

      } else {
        yield put({
          type: actions.SPKLAPPROVAL_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.SPKLAPPROVAL_ERROR,
      // payload: { token: null }
    });
  }
}

export function* eesapprovalbuttonRequest({payload}) {

  if(payload.buttonId == '1'){

    try {
      const urlApi = apiUrlApproval_spklButtonApproveRequest+"?userId="+payload.userId+"&workflowId="+payload.workflowId+"&buttonId="+payload.buttonId+"";
      let { data } = yield call(eesPostButtonApprovalApi, urlApi, payload);
  
        // console.log("eesapprovalbuttonRequest", payload, data);
  
        yield put({
          type: actions.SPKLAPPROVAL_BUTTONAPPROVAL_SUCCESS,
          button:true
        });
  
  
  
    } catch (error) {
      // console.log("disini", error);
      yield put({
        type: actions.SPKLAPPROVAL_BUTTONAPPROVAL_ERROR,
        // payload: { token: null }
      });
    }

  }else{

    try {
      const urlApi = apiUrlApproval_spklButtonRejectRequest+"?userId="+payload.userId+"&workflowId="+payload.workflowId+"&buttonId="+payload.buttonId+"&remarks="+payload.remarks+"";
      let { data } = yield call(eesPostButtonApprovalApi, urlApi, payload);
  
        console.log("eesapprovalbuttonRequest", payload, data);
  
        yield put({
          type: actions.SPKLAPPROVAL_BUTTONAPPROVAL_SUCCESS,
          button: true
        });
  
  
  
    } catch (error) {
        // console.log("disini", error);
      yield put({
        type: actions.SPKLAPPROVAL_BUTTONAPPROVAL_ERROR,
        // payload: { token: null }
      });
    }    

  }

}


export function* eesapprovalError() {
  console.log("error")
}

export function* eesapprovalbuttonError() {
  console.log("error")
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.SPKLAPPROVAL_REQUEST, eesapprovalRequest),
    yield takeEvery(actions.SPKLAPPROVAL_ERROR, eesapprovalError),
    yield takeEvery(actions.SPKLAPPROVAL_BUTTONAPPROVAL_REQUEST, eesapprovalbuttonRequest),
    yield takeEvery(actions.SPKLAPPROVAL_BUTTONAPPROVAL_ERROR, eesapprovalbuttonError),
  ]);
}