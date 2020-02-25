import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
  button:false
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.SPKLAPPROVAL_REQUEST:
      return {
        // ...state,
        result:[],
        loading: true,
        error: false,
        button:false
      };
    case actions.SPKLAPPROVAL_BUTTONAPPROVAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        button:false
      };  
    case actions.SPKLAPPROVAL_SUCCESS:
      return {
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.SPKLAPPROVAL_BUTTONAPPROVAL_SUCCESS:
      return {
        result: [],
        loading: false,
        error: false,
        button:true
      };        
    case actions.SPKLAPPROVAL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actions.SPKLAPPROVAL_BUTTONAPPROVAL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
