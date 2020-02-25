import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

const { apiUrl, apiUrlGueSehat } = Setting;

// const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";
const urlApi = apiUrlGueSehat;

function HomeApi() {
  return axios.request({
    method: 'POST',
    url: urlApi,
  });
}

export function* guesehatRequest() {
    try {
        let { data } = yield call(HomeApi);
        if (data.result) {
          yield put({
            type: actions.GUESEHAT_SUCCESS,
            result: data.result
          });
        } else {
          yield put({
            type: actions.GUESEHAT_ERROR
          });
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: actions.GUESEHAT_ERROR
        });
    }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GUESEHAT_REQUEST, guesehatRequest)
    // yield takeEvery(actions.HOME_LIFE_REQUEST, homeLifeRequest),
    // yield takeEvery(actions.HOME_SEHAT_REQUEST, homeSehatRequest),
  ]);
}