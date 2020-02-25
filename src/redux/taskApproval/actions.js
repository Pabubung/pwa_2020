const actions = {
    TASK_REQUEST: 'TASK_REQUEST',
    TASK_SUCCESS: 'TASK_SUCCESS',
    TASK_ERROR: 'TASK_ERROR',


    TASK_LIST_REQUEST: (payload) => ({
      type: actions.TASK_REQUEST,
      payload
    })
 
  };
  export default actions;
  