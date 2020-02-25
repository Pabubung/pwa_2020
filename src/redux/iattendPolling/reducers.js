import actions from './actions';

const initState = {
  result: [],
  loading: false,
  error: false,
  button:false
};

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case actions.IATTENDPOLLING_REQUEST:
      return {
        // ...state,
        result:[],
        loading: true,
        error: false,
        button:false
      };  
    case actions.IATTENDPOLLING_SUCCESS:
      //console.log("sdsdsd",action.data);
      return {
        result: action.data,
        loading: false,
        error: false
      };  
    case actions.IATTENDPOLLING_ERROR:
        return {
          ...state,
          loading: false,
          error: true
    }; 
    default:
      return state;
  }
}
