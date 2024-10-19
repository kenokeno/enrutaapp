import actionTypes from './../constants/actionTypes'

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_CLIENTES_START:
            console.log(action);
            return { ...state };
            break;
        case actionTypes.GET_CLIENTES_SUCCESS:
            console.log(action);
            return { ...state, clientes: action.results };
            break;
        case actionTypes.GET_CLIENTES_ERROR:
            console.log(action);
            return { ...state, clientes: null, error: action.error };
            break;
        case actionTypes.DELETE_CLIENTE_START:
            return { ...state };
            break;
        case actionTypes.DELETE_CLIENTE_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.DELETE_CLIENTE_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.CREATE_CLIENTE_START:
            return { ...state };
            break;
        case actionTypes.CREATE_CLIENTE_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.CREATE_CLIENTE_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.UPDATE_CLIENTE_START:
            return { ...state };
            break;
        case actionTypes.UPDATE_CLIENTE_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.UPDATE_CLIENTE_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        default:
            return { ...state };
    }
}