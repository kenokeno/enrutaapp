import actionTypes from './../constants/actionTypes';

export const getRutas = () => ({
    type: actionTypes.GET_RUTAS_START,
    payload: { model: 'Ruta' }
});

export const deleteCliente = cliente => ({
    type: actionTypes.DELETE_RUTA_START,
    payload: { registry: rutas, model: 'Ruta' }
});

export const createCliente = cliente => ({
    type: actionTypes.CREATE_RUTA_START,
    payload: { registry: rutas, model: 'Ruta' }
});

export const updateCliente = cliente => ({
    type: actionTypes.UPDATE_RUTA_START,
    payload: { registry: rutas, model: 'Ruta' }
});


