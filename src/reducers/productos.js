import actionTypes from './../constants/actionTypes'

//productos: para index de productos. Para get y delete
//producto: para form de productos. Para actualizar y crear nuevo
//codigo: para validar codigo de productos en form
export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_PRODUCTOS_START:
            console.log(action);
            return { ...state };
            break;
        case actionTypes.GET_PRODUCTOS_SUCCESS:
            console.log(action);
            return { ...state, productos: action.results };
            break;
        case actionTypes.GET_PRODUCTOS_ERROR:
            console.log(action);
            return { ...state, productos: null, error: action.error };
            break;
        case actionTypes.DELETE_PRODUCTO_START:
            return { ...state };
            break;
        case actionTypes.DELETE_PRODUCTO_SUCCESS:
            console.log(action);
            return { ...state, productos: action.results };
            break;
        case actionTypes.DELETE_PRODUCTO_ERROR:
            console.log(action);
            return { ...state, productos: null, error: action.error };
            break;
        case actionTypes.CREATE_PRODUCTO_START:
            return { ...state };
            break;
        case actionTypes.CREATE_PRODUCTO_SUCCESS:
            console.log(action);
            return { ...state, producto: action.results };
            break;
        case actionTypes.CREATE_PRODUCTO_ERROR:
            console.log(action);
            return { ...state, producto: null, error: action.error };
            break;
        case actionTypes.UPDATE_PRODUCTO_START:
            return { ...state };
            break;
        case actionTypes.UPDATE_PRODUCTO_SUCCESS:
            console.log(action);
            return { ...state, producto: action.results };
            break;
        case actionTypes.UPDATE_PRODUCTO_ERROR:
            console.log(action);
            return { ...state, producto: null, error: action.error };
            break;
        case actionTypes.VALIDAR_CODIGO_PRODUCTO_START:
            return { ...state };
            break;
        case actionTypes.VALIDAR_CODIGO_PRODUCTO_SUCCESS:
            console.log(action);
            return { ...state, codigo: action.results };
            break;
        case actionTypes.VALIDAR_CODIGO_PRODUCTO_ERROR:
            console.log(action);
            return { ...state, codigo: null, error: action.error };
            break;
        default:
            return { ...state };
    }
}