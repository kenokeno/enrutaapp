import actionTypes from './../constants/actionTypes'

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_RUTAS_START:
            console.log(action);
            return { ...state };
            break;
        case actionTypes.GET_RUTAS_SUCCESS:
            console.log(action);
            return { ...state, rutas: action.results };
            break;
        case actionTypes.GET_RUTAS_ERROR:
            console.log(action);
            return { ...state, rutas: null, error: action.error };
            break;
        case actionTypes.DELETE_RUTA_START:
            return { ...state };
            break;
        case actionTypes.DELETE_RUTA_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.DELETE_RUTA_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.CREATE_RUTA_START:
            return { ...state };
            break;
        case actionTypes.CREATE_RUTA_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.CREATE_RUTA_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.UPDATE_RUTA_START:
            return { ...state };
            break;
        case actionTypes.UPDATE_RUTA_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.UPDATE_RUTA_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        default:
            return { ...state };
    }
}