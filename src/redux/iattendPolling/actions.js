const actions = {
    IATTENDPOLLING_REQUEST: 'IATTENDPOLLING_REQUEST',
    IATTENDPOLLING_SUCCESS: 'IATTENDPOLLING_SUCCESS',
    IATTENDPOLLING_ERROR: 'IATTENDPOLLING_ERROR',

    IATTENDPOLLING_LIST_REQUEST: (payload) => ({
      type: actions.IATTENDPOLLING_REQUEST,
      payload
    }),

  };
  export default actions;
  