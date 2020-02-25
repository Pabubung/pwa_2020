const actions = {
    IATTENDHOME_REQUEST: 'IATTENDHOME_REQUEST',
    IATTENDHOME_SUCCESS: 'IATTENDHOME_SUCCESS',
    IATTENDHOME_ERROR: 'IATTENDHOME_ERROR',

    IATTENDHOME_LIST_REQUEST: (payload) => ({
      type: actions.IATTENDHOME_REQUEST,
      payload
    }),

  };
  export default actions;
  