import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
  button:false
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.EESAPPROVAL_HISTORY_REQUEST:
      return {
        // ...state,
        result:[],
        loading: true,
        error: false,
        button:false
      };
    case actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        button:false
      };  
    case actions.EESAPPROVAL_HISTORY_SUCCESS:
      return {
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_SUCCESS:
      return {
        result: [],
        loading: false,
        error: false,
        button:true
      };        
    case actions.EESAPPROVAL_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
