const actions = {
    EESAPPROVAL_HISTORY_REQUEST: 'EESAPPROVAL_HISTORY_REQUEST',
    EESAPPROVAL_HISTORY_SUCCESS: 'EESAPPROVAL_HISTORY_SUCCESS',
    EESAPPROVAL_HISTORY_ERROR: 'EESAPPROVAL_HISTORY_ERROR',

    EESAPPROVAL_BUTTONAPPROVAL_HISTORY_REQUEST: 'EESAPPROVAL_BUTTONAPPROVAL_HISTORY_REQUEST',
    EESAPPROVAL_BUTTONAPPROVAL_HISTORY_SUCCESS: 'EESAPPROVAL_BUTTONAPPROVAL_HISTORY_SUCCESS',
    EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR: 'EESAPPROVAL_BUTTONAPPROVAL_HISTORY_ERROR',

    EESAPPROVAL_LIST_HISTORY_REQUEST: (payload) => ({
      type: actions.EESAPPROVAL_HISTORY_REQUEST,
      payload
    }),

    EESAPPROVAL_LIST_BUTTONAPPROVAL_HISTORY_REQUEST: (payload) => ({
      type: actions.EESAPPROVAL_BUTTONAPPROVAL_HISTORY_REQUEST,
      payload
    }),

  };
  export default actions;
  