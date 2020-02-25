import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

// const urlApi = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

const { apiUrlMyTiket, apiUrlMyTiketApprove, apiUrlticketSubmitRequest, apiUrlticketOpenRequest, apiUrlticketCloseRequest } = Setting;

function LeavePostApi(config,urlx,payload) {
  return axios.request({
    method: 'post',
    url: urlx,
    data: payload,
    config: config
  });
}
 
export function* ticketRequest({payload}) {
  try {
    const urlApi = apiUrlMyTiket;
    let { data } = yield call(LeavePostApi, {}, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.TICKET_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.TICKET_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TICKET_ERROR,
      // payload: { token: null }
    });
  }
}

export function* ticketRequestApproval({payload}) {
  try {
    const urlApi = apiUrlMyTiketApprove;
    let { data } = yield call(LeavePostApi, {}, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.TICKET_SUBMIT_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.TICKET_SUBMIT_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TICKET_SUBMIT_ERROR,
      // payload: { token: null }
    });
  }
}

export function* ticketSubmitRequest({payload}) {
  try {
    const urlApi = apiUrlticketSubmitRequest;
    // let form_data = new FormData();

    // for ( let key in payload ) {
    //     form_data.append(key, payload[key]);
    // }
    // let { data } = yield call(LeavePostApi, {headers: { 'Content-Type': 'multipart/form-data' }}, urlApi, form_data);

      let { data } = yield call(LeavePostApi, {}, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.TICKET_SUBMIT_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.TICKET_SUBMIT_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TICKET_SUBMIT_ERROR,
      // payload: { token: null }
    });
  }
}

export function* ticketOpenRequest({payload}) {
  try {
    const urlApi = apiUrlticketOpenRequest;
    // let form_data = new FormData();

    // for ( let key in payload ) {
    //     form_data.append(key, payload[key]);
    // }
    // let { data } = yield call(LeavePostApi, {headers: { 'Content-Type': 'multipart/form-data' }}, urlApi, form_data);

    let { data } = yield call(LeavePostApi, {}, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.TICKET_SUBMIT_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.TICKET_SUBMIT_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TICKET_SUBMIT_ERROR,
      // payload: { token: null }
    });
  }
}

export function* ticketCloseRequest({payload}) {
  try {
    const urlApi = apiUrlticketCloseRequest;
    // let form_data = new FormData();

    // for ( let key in payload ) {
    //     form_data.append(key, payload[key]);
    // }
    // let { data } = yield call(LeavePostApi, {headers: { 'Content-Type': 'multipart/form-data' }}, urlApi, form_data);

    let { data } = yield call(LeavePostApi, {}, urlApi, payload);

      // console.log(data);
      if (data.acknowledge) {
        yield put({
          type: actions.TICKET_SUBMIT_SUCCESS,
          data: data 
        });
      } else {
        yield put({
          type: actions.TICKET_SUBMIT_ERROR,
          // payload: { token: null }
        });
      }
  } catch (error) {
    yield put({
      type: actions.TICKET_SUBMIT_ERROR,
      // payload: { token: null }
    });
  }
}

export function* ticketError() {
  console.log("error")
}



export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.TICKET_REQUEST, ticketRequest),
    yield takeEvery(actions.TICKET_SUBMIT_REQUEST, ticketSubmitRequest),
    yield takeEvery(actions.TICKET_REQUEST_APPROVAL, ticketRequestApproval),
    yield takeEvery(actions.TICKET_OPEN_TICKET, ticketOpenRequest),
    yield takeEvery(actions.TICKET_CLOSE_TICKET, ticketCloseRequest),
    yield takeEvery(actions.TICKET_ERROR, ticketError),
  ]);
}