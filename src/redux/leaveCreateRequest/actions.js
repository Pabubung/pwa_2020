const actions = {
    CREATE_LEAVE_REQUEST: 'CREATE_LEAVE_REQUEST',
    CREATE_LEAVE_SUCCESS: 'CREATE_LEAVE_SUCCESS',
    CREATE_LEAVE_ERROR: 'CREATE_LEAVE_ERROR',
    CREATE_LEAVE_LIST_REQUEST: (payload) => ({
      type: actions.CREATE_LEAVE_REQUEST,
      payload
    }),
  };
  export default actions;
  