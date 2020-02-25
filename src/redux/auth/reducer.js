import actions from "./actions";

const initState = { idToken: null, loading: false };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        loading: false
      };
    case actions.LOGIN_REQUEST:
      return {
        idToken: null,
        loading: true
      };
    case actions.LOGIN_ERROR:
      return initState;
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
