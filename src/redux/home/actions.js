const actions = {
    HOME_REQUEST: 'HOME_REQUEST',
    HOME_LIFE_REQUEST: 'HOME_LIFE_REQUEST',
    HOME_SEHAT_REQUEST: 'HOME_SEHAT_REQUEST',
    HOME_LIFE_SUCCESS: 'HOME_LIFE_SUCCESS',
    HOME_SEHAT_SUCCESS: 'HOME_SEHAT_SUCCESS',
    HOME_SUCCESS: 'HOME_SUCCESS',
    HOME_ERROR: 'HOME_ERROR',
    HOME_GET: () => ({
      type: actions.HOME_REQUEST
    }),
    HOME_DETAIL_LIFE_REQUEST: (payload) => ({
      type: actions.HOME_LIFE_REQUEST,
      ...payload
    }),
    HOME_DETAIL_SEHAT_REQUEST: (payload) => ({
      type: actions.HOME_SEHAT_REQUEST,
      ...payload
    }),
  };
  export default actions;
  