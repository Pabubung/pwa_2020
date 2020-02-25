import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
  detailLife: [],
  detailSehat: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.HOME_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actions.HOME_LIFE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actions.HOME_LIFE_SUCCESS:
      return {
        ...state,
        detailLife: action.result,
        loading: false
      };
    case actions.HOME_SEHAT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actions.HOME_SEHAT_SUCCESS:
      return {
        ...state,
        detailSehat: action.result,
        loading: false
      };
    case actions.HOME_SUCCESS:
      return {
        result: action.result,
        loading: false,
        error: false
      };
    case actions.HOME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
