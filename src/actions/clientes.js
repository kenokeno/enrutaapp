import actionTypes from './../constants/actionTypes';

export const getClientes = () => ({
    type: actionTypes.GET_CLIENTES_START,
    payload: { model: 'Cliente' }
});

export const deleteCliente = cliente => ({
    type: actionTypes.DELETE_CLIENTE_START,
    payload: { registry: cliente, model: 'Cliente' }
});

export const createCliente = cliente => ({
    type: actionTypes.CREATE_CLIENTE_START,
    payload: { registry: cliente, model: 'Cliente' }
});

export const updateCliente = cliente => ({
    type: actionTypes.UPDATE_CLIENTE_START,
    payload: { registry: cliente, model: 'Cliente' }
});


