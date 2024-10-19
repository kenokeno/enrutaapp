import { all, fork } from 'redux-saga/effects';

import clientes from './clientes';
import rutas from './rutas';
import productos from './productos';

export default function* rootSaga() {
    //yield all([clientes(), centrosDistribucion()]);
    yield fork(clientes);
    yield fork(rutas);
    yield fork(productos);
}