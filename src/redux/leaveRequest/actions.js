const actions = {
    LEAVE_REQUEST: 'LEAVE_REQUEST',
    LEAVE_SUCCESS: 'LEAVE_SUCCESS',
    LEAVE_ERROR: 'LEAVE_ERROR',
    LEAVE_LIST_REQUEST: (payload) => ({
      type: actions.LEAVE_REQUEST,
      payload
    }),
  };
  export default actions;
  