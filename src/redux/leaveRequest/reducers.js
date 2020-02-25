import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actions.LEAVE_SUCCESS:
      return {
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.LEAVE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
