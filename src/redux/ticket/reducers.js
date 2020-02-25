import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
  loadingSubmit: false,
  resultSubmit:[]
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.TICKET_REQUEST:
      return {
        ...state,
        resultSubmit: [],
        loading: true,
        error: false
      };
    case actions.TICKET_SUCCESS:
      return {
        ...state,
        resultSubmit: [],
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.TICKET_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actions.TICKET_SUBMIT_REQUEST:
      return {
        ...state,
        resultSubmit:[],
        loadingSubmit: true,
        error: false
      };
    case actions.TICKET_OPEN_TICKET:
      return {
        ...state,
        resultSubmit:[],
        loadingSubmit: true,
        error: false
      };
    case actions.TICKET_CLOSE_TICKET:
      return {
        ...state,
        resultSubmit:[],
        loadingSubmit: true,
        error: false
      };
    case actions.TICKET_REQUEST_APPROVAL:
      return {
        ...state,
        resultSubmit: [],
        loadingSubmit: true,
        error: false
      };
    case actions.TICKET_SUBMIT_SUCCESS:
      return {
        ...state,
        resultSubmit: action.data,
        loadingSubmit: false,
        error: false
      };
    case actions.TICKET_SUBMIT_ERROR:
      return {
        ...state,
        loadingSubmit: false,
        error: true
      };
    default:
      return state;
  }
}
