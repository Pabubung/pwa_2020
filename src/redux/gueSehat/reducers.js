import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false
  // detailLife: [],
  // detailSehat: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GUESEHAT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actions.GUESEHAT_SUCCESS:
      return {
        result: action.result,
        loading: false,
        error: false
      };
    case actions.GUESEHAT_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
