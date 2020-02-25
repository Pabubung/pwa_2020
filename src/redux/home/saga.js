import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import Setting from '../../settings';

const { apiUrl, apiUrlHome } = Setting;

// const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";
const urlApi = apiUrlHome;

function HomeApi() {
  return axios.request({
    method: 'POST',
    url: urlApi,
  });
}

// function HomePostApi(headers,method,payload,urlx) {
//   return axios.request({
//     method: method,
//     url: urlx,
//     data: payload,
//     headers: headers
//   });
// }

export function* homeRequest() {
    try {
        let { data } = yield call(HomeApi);
        // console.log("test data bitrix iattend",data);

        if (data.length === undefined) {
          yield put({
            type: actions.HOME_SUCCESS,
            result: data
          });
        } else {
          yield put({
            type: actions.HOME_ERROR
          });
        }

        // Ini untuk ambil data dari bitrix //
        // if (data.result) {
        //   yield put({
        //     type: actions.HOME_SUCCESS,
        //     result: data.result
        //   });
        // } else {
        //   yield put({
        //     type: actions.HOME_ERROR
        //   });
        // }
    } catch (error) {
        console.log(error)
        yield put({
            type: actions.HOME_ERROR
        });
    }
}

// export function* homeLifeRequest(payload) {
//   const urlx = "https://portaltest.dexagroup.com/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.detailDexanLife";
//   try {
//       let { data } = yield call(HomePostApi,{},"POST",payload,urlx);
//       if (data.result) {
//         yield put({
//           type: actions.HOME_LIFE_SUCCESS,
//           result: data.result
//         });
//       } else {
//         yield put({
//           type: actions.HOME_ERROR
//         });
//       }
//   } catch (error) {
//       yield put({
//           type: actions.HOME_ERROR
//       });
//   }
// }

// export function* homeSehatRequest(payload) {
  
//   const urlx = 'https://api.guesehat.com/requestdata/detail?slug='+payload.slugs;
//   let headers = {
//     "DeviceID": "1234567890",
//     "PushToken": "AAAAAAAAAAAA",
//     "Content-Type": "application/json",
//     "Authorization": "Basic JDJhJDExJEdLWmlFaEhOeDcuZGQzV2dhckg0Zy5lckdVakI1bktleWVxZnEuTFYyRExCQzdPdW5zazhHOnB4YTVxYmpaQVVYOElFV1c3TTVyeGNmeXFDME41bk5sSnBvYnI4eXE0R0NMeWF1WHJs"
//   }
//   try {
//       let { data } = yield call(HomePostApi,headers,"GET",{},urlx);
//       // console.log(data)
//       // if (data.result) {
//       //   yield put({
//       //     type: actions.HOME_SEHAT_SUCCESS,
//       //     result: data.result
//       //   });
//       // } else {
//       //   yield put({
//       //     type: actions.HOME_ERROR
//       //   });
//       // }
//   } catch (error) {
//     console.log(error)
//       yield put({
//           type: actions.HOME_ERROR
//       });
//   }
// }

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.HOME_REQUEST, homeRequest)
    // yield takeEvery(actions.HOME_LIFE_REQUEST, homeLifeRequest),
    // yield takeEvery(actions.HOME_SEHAT_REQUEST, homeSehatRequest),
  ]);
}