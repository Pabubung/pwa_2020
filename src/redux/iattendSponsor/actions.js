const actions = {
    IATTENDSPONSOR_REQUEST: 'IATTENDSPONSOR_REQUEST',
    IATTENDSPONSOR_SUCCESS: 'IATTENDSPONSOR_SUCCESS',
    IATTENDSPONSOR_ERROR: 'IATTENDSPONSOR_ERROR',

    IATTENDSPONSOR_SPONSOR_REQUEST: (payload) => ({
      type: actions.IATTENDSPONSOR_REQUEST,
      payload
    }),

  };
  export default actions;
  