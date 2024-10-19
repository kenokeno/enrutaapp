import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

import { getAllRegistries, createRegistry, updateRegistry, deleteRegistry } from './../api';
import actionTypes from './../constants/actionTypes';

export function* getAll(payload) {
    try {
        const data = yield call(getAllRegistries, payload.payload);
        const rutas = yield data.result;
        yield put({ type: actionTypes.GET_RUTAS_SUCCESS, results: rutas });
    } catch (error) {
        yield put({ type: actionTypes.GET_RUTAS_ERROR, error });
    }
}

export function* remove(payload) {
    try {
        const data = yield call(deleteRegistry, payload.payload);
        const msg = yield data.result;
        yield put({ type: actionTypes.DELETE_RUTA_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_RUTA_ERROR, error });
    }
}

export function* add(payload) {
    try {
        const data = yield call(createRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.CREATE_RUTA_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_RUTA_ERROR, error });
    }
}

export function* update(payload) {
    try {
        const data = yield call(updateRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.UPDATE_RUTA_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.UPDATE_RUTA_ERROR, error });
    }
}

export default function* rutas() {
    yield takeEvery(actionTypes.GET_RUTAS_START, getAll);
    yield takeLatest(actionTypes.DELETE_RUTA_START, remove);
    yield takeLatest(actionTypes.CREATE_RUTA_START, add);
    yield takeEvery(actionTypes.UPDATE_RUTA_START, update);
}