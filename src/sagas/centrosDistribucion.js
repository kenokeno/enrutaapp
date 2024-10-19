import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

//import { getAllCentroDistribucion, deleteCentroDistribucionCO, createCentroDistribucionCO, updateCentroDistribucionCO } from './../controllers/Catalogos/CentroDistribucionController';
import { getAllRegistries, createRegistry, updateRegistry, deleteRegistry } from './../api';
import actionTypes from './../constants/actionTypes';

/*
export function* getCentrosDistribucion() {
    try {
        const data = yield call(getAllCentroDistribucion);
        const centrosDist = yield data.result;
        yield put({ type: actionTypes.GET_CENTROS_DISTRIBUCION_SUCCESS, results: centrosDist });
    } catch (error) {
        yield put({ type: actionTypes.GET_CENTROS_DISTRIBUCION_ERROR, error });
    }
}*/

export function* getAll(payload) {
    try {
        const data = yield call(getAllRegistries, payload.payload);
        const centrosDist = yield data.result;
        yield put({ type: actionTypes.GET_CENTROS_DISTRIBUCION_SUCCESS, results: centrosDist });
    } catch (error) {
        yield put({ type: actionTypes.GET_CENTROS_DISTRIBUCION_ERROR, error });
    }
}
/*
export function* deleteCentroDistribucion(centroDistribucion) {
    try {
        const data = yield call(deleteCentroDistribucionCO, centroDistribucion.payload);
        const msg = yield data.result;
        yield put({ type: actionTypes.DELETE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}*/

export function* remove(payload) {
    try {
        const data = yield call(deleteRegistry, payload.payload);
        const msg = yield data.result;
        yield put({ type: actionTypes.DELETE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}
/*
export function* createCentroDistribucion(centroDistribucion) {
    try {
        const data = yield call(createCentroDistribucionCO, centroDistribucion.payload);
        const msg = yield data;
        yield put({ type: actionTypes.CREATE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}*/

export function* add(payload) {
    try {
        const data = yield call(createRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.CREATE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}
/*
export function* updateCentroDistribucion(centroDistribucion) {
    try {
        const data = yield call(updateCentroDistribucionCO, centroDistribucion.payload);
        const msg = yield data;
        yield put({ type: actionTypes.UPDATE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.UPDATE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}*/

export function* update(payload) {
    try {
        const data = yield call(updateRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.UPDATE_CENTRO_DISTRIBUCION_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.UPDATE_CENTRO_DISTRIBUCION_ERROR, error });
    }
}

export default function* centrosDistribucion() {
    //yield takeEvery(actionTypes.GET_CENTROS_DISTRIBUCION_START, getCentrosDistribucion);
    yield takeEvery(actionTypes.GET_CENTROS_DISTRIBUCION_START, getAll);
    //yield takeLatest(actionTypes.DELETE_CENTRO_DISTRIBUCION_START, deleteCentroDistribucion);
    yield takeLatest(actionTypes.DELETE_CENTRO_DISTRIBUCION_START, remove);
    //yield takeLatest(actionTypes.CREATE_CENTRO_DISTRIBUCION_START, createCentroDistribucion);
    yield takeLatest(actionTypes.CREATE_CENTRO_DISTRIBUCION_START, add);
    //yield takeLatest(actionTypes.UPDATE_CENTRO_DISTRIBUCION_START, updateCentroDistribucion);
    yield takeEvery(actionTypes.UPDATE_CENTRO_DISTRIBUCION_START, update);
}