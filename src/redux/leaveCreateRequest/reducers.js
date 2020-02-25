import actions from './actions';

const initState = {
  result: false,
  // result: [], Kalo array pakai ini
  loading: false,
  error: false,
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.CREATE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actions.CREATE_LEAVE_SUCCESS:
      // console.log(action)
      return {
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.CREATE_LEAVE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
