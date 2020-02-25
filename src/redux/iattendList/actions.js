const actions = {
    IATTENDLIST_REQUEST: 'IATTENDLIST_REQUEST',
    IATTENDLIST_SUCCESS: 'IATTENDLIST_SUCCESS',
    IATTENDLIST_ERROR: 'IATTENDLIST_ERROR',

    IATTENDLIST_LIST_REQUEST: (payload) => ({
      type: actions.IATTENDLIST_REQUEST,
      payload
    }),

  };
  export default actions;
  