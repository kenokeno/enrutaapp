import actionTypes from './../constants/actionTypes'

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_CENTROS_DISTRIBUCION_START:
            return { ...state };
            break;
        case actionTypes.GET_CENTROS_DISTRIBUCION_SUCCESS:
            console.log(action);
            return { ...state, centros: action.results };
            break;
        case actionTypes.GET_CENTROS_DISTRIBUCION_ERROR:
            console.log(action);
            return { ...state, centros: null, error: action.error };
            break;
        case actionTypes.DELETE_CENTRO_DISTRIBUCION_START:
            return { ...state };
            break;
        case actionTypes.DELETE_CENTRO_DISTRIBUCION_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.DELETE_CENTRO_DISTRIBUCION_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.CREATE_CENTRO_DISTRIBUCION_START:
            return { ...state };
            break;
        case actionTypes.CREATE_CENTRO_DISTRIBUCION_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.CREATE_CENTRO_DISTRIBUCION_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        case actionTypes.UPDATE_CENTRO_DISTRIBUCION_START:
            return { ...state };
            break;
        case actionTypes.UPDATE_CENTRO_DISTRIBUCION_SUCCESS:
            console.log(action);
            return { ...state, msg: action.results };
            break;
        case actionTypes.UPDATE_CENTRO_DISTRIBUCION_ERROR:
            console.log(action);
            return { ...state, msg: null, error: action.error };
            break;
        default:
            return { ...state };
    }
}