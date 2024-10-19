import actionTypes from './../constants/actionTypes';

export const getCentrosDistribucion = payload => ({
    type: actionTypes.GET_CENTROS_DISTRIBUCION_START,
    payload: { model: 'CentroDistribucion' }
});

export const deleteCentroDistribucion = ceDist => ({
    type: actionTypes.DELETE_CENTRO_DISTRIBUCION_START,
    payload: { registry: ceDist, model: 'CentroDistribucion' }
});

export const createCentroDistribucion = ceDist => ({
    type: actionTypes.CREATE_CENTRO_DISTRIBUCION_START,
    payload: { registry: ceDist, model: 'CentroDistribucion' }
});

export const updateCentroDistribucion = ceDist => ({
    type: actionTypes.UPDATE_CENTRO_DISTRIBUCION_START,
    payload: { registry: ceDist, model: 'CentroDistribucion' }
});


