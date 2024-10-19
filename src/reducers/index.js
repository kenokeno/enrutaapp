import { combineReducers } from 'redux';

import clientes from './clientes'
import rutas from './rutas'
import productos from './productos'

//export const reducers = combineReducers({
export default combineReducers({
    clientes,
    rutas,
    productos,
});