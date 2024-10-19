import { takeLatest, takeEvery, call, put, join, fork } from 'redux-saga/effects';

import { getAllRegistries, createRegistry, updateRegistry, deleteRegistry } from './../api';
import actionTypes from './../constants/actionTypes';

export function* getAll({ payload }) {
    try {
        const data = yield call(getAllRegistries, payload);
        const response = yield data;
        yield put({ type: actionTypes.GET_PRODUCTOS_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.GET_PRODUCTOS_ERROR, error });
    }
}

export function* remove({ payload }) {
    try {
        const data = yield call(deleteRegistry, payload);
        const response = yield data;
        yield put({ type: actionTypes.DELETE_PRODUCTO_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_PRODUCTO_ERROR, error });
    }
}

//https://docs.mongodb.com/realm/sdk/react-native/data-types/embedded-objects/#create-an-embedded-object
export function* add({ payload }) {
    try {
        const data = yield fork(createRegistry, payload);
        const response = yield join(data);
        yield put({ type: actionTypes.CREATE_PRODUCTO_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_PRODUCTO_ERROR, error });
    }
}

/*
export function* add({ payload }) {
    try {
        const { producto, preciosVenta, claves } = payload;
        const data = yield fork(createRegistry, { registry: producto, model: 'Producto' });
        const response = yield join(data);
        const precios = preciosVenta.map(element => {
            element.producto = response.result;
            return element;
        });

        for (const i in precios) {
            if (precios.hasOwnProperty(i)) {
                const task = yield fork(createRegistry, { registry: precios[i], model: 'PrecioVenta' });
            }
        }

        const clvs = claves.map(element => {
            element.producto = response.result;
            return element
        });

        for (const i in clvs) {
            if (clvs.hasOwnProperty(i)) {
                const task = yield fork(createRegistry, { registry: clvs[i], model: 'Clave' });
            }
        }
        yield put({ type: actionTypes.CREATE_PRODUCTO_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_PRODUCTO_ERROR, error });
    }
}*/

export function* update({ payload }) {
    try {
        const data = yield call(updateRegistry, payload);
        const response = yield data;
        yield put({ type: actionTypes.UPDATE_PRODUCTO_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.UPDATE_PRODUCTO_ERROR, error });
    }
}

export function* validarCodigo({ payload }) {
    try {
        const { codigo, producto, model } = payload;
        const data = yield call(getAllRegistries, { model: model });
        const response = yield data;
        const productos = response.result;
        let valido = true;
        productos.forEach(p => {
            if (p.id !== producto.id) {
                p.claves.forEach(clave => {
                    if (clave.codigo === codigo) {
                        response.message = 'El código ya existe';
                        valido = false;
                    }
                });
            }
        });
        response.result = valido;
        yield put({ type: actionTypes.VALIDAR_CODIGO_PRODUCTO_SUCCESS, results: response });
    } catch (error) {
        yield put({ type: actionTypes.VALIDAR_CODIGO_PRODUCTO_ERROR, error });
    }
}

export default function* productos() {
    yield takeEvery(actionTypes.GET_PRODUCTOS_START, getAll);
    yield takeLatest(actionTypes.DELETE_PRODUCTO_START, remove);
    yield takeEvery(actionTypes.CREATE_PRODUCTO_START, add);
    yield takeEvery(actionTypes.UPDATE_PRODUCTO_START, update);
    yield takeLatest(actionTypes.VALIDAR_CODIGO_PRODUCTO_START, validarCodigo);
}