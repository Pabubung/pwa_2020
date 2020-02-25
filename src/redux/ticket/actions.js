const actions = {
    TICKET_REQUEST: 'TICKET_REQUEST',
    TICKET_SUCCESS: 'TICKET_SUCCESS',
    TICKET_ERROR: 'TICKET_ERROR',
    TICKET_SUBMIT_REQUEST: 'TICKET_SUBMIT_REQUEST',
    TICKET_SUBMIT_ERROR: 'TICKET_SUBMIT_ERROR',
    TICKET_SUBMIT_SUCCESS: 'TICKET_SUBMIT_SUCCESS',
    TICKET_REQUEST_APPROVAL: 'TICKET_REQUEST_APPROVAL',
    TICKET_OPEN_TICKET: 'TICKET_OPEN_TICKET', 
    TICKET_CLOSE_TICKET: 'TICKET_CLOSE_TICKET', 
    TICKET_LIST_REQUEST: (payload) => ({
      type: actions.TICKET_REQUEST,
      payload
    }),
    TICKET_SUBMIT: (payload) => ({
      type: actions.TICKET_SUBMIT_REQUEST,
      payload
    }),
    TICKET_APPROVAL: (payload) => ({
      type: actions.TICKET_REQUEST_APPROVAL,
      payload
    }),
    TICKET_OPEN: (payload) => ({
      type: actions.TICKET_OPEN_TICKET,
      payload
    }),
    TICKET_CLOSE: (payload) => ({
      type: actions.TICKET_CLOSE_TICKET,
      payload
    }),
  };
  export default actions;
  