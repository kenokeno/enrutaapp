import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
//import { getAllRegistries, createRegistry, updateRegistry, deleteRegistry } from './../controllers/clientes';
import { getAllRegistries, createRegistry, updateRegistry, deleteRegistry } from './../api';
import actionTypes from './../constants/actionTypes';

export function* getAll(payload) {
    try {
        const data = yield call(getAllRegistries, payload.payload);
        const clientes = yield data.result;
        yield put({ type: actionTypes.GET_CLIENTES_SUCCESS, results: clientes });
    } catch (error) {
        yield put({ type: actionTypes.GET_CLIENTES_ERROR, error });
    }
}

export function* remove(payload) {
    try {
        const data = yield call(deleteRegistry, payload.payload);
        const msg = yield data.result;
        yield put({ type: actionTypes.DELETE_CLIENTE_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_CLIENTE_ERROR, error });
    }
}

export function* add(payload) {
    try {
        let data = yield call(createRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.CREATE_CLIENTE_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_CLIENTE_ERROR, error });
    }
}

export function* update(payload) {
    try {
        const data = yield call(updateRegistry, payload.payload);
        const msg = yield data;
        yield put({ type: actionTypes.UPDATE_CLIENTE_SUCCESS, results: msg });
    } catch (error) {
        yield put({ type: actionTypes.UPDATE_CLIENTE_ERROR, error });
    }
}

export default function* clientes() {
    yield takeEvery(actionTypes.GET_CLIENTES_START, getAll);
    yield takeLatest(actionTypes.DELETE_CLIENTE_START, remove);
    yield takeLatest(actionTypes.CREATE_CLIENTE_START, add);
    yield takeEvery(actionTypes.UPDATE_CLIENTE_START, update);
}