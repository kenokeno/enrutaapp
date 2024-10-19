import actionTypes from './../constants/actionTypes';

export const getProductos = () => ({
    type: actionTypes.GET_PRODUCTOS_START,
    payload: { model: 'Producto' }
});

export const deleteProducto = producto => ({
    type: actionTypes.DELETE_PRODUCTO_START,
    payload: { registry: producto, model: 'Producto' }
});

export const createProducto = producto => ({
    type: actionTypes.CREATE_PRODUCTO_START,
    payload: { registry: producto, model: 'Producto' }
});

export const validarCodigoProducto = (codigo, producto) => ({
    type: actionTypes.VALIDAR_CODIGO_PRODUCTO_START,
    payload: { codigo: codigo, producto: producto, model: 'Producto' }
});

export const updateProducto = producto => ({
    type: actionTypes.UPDATE_PRODUCTO_START,
    payload: { registry: producto, model: 'Producto' }
});


