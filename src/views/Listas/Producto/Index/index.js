import React from 'react';
import { Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { getProductos, deleteProducto } from './../../../../actions/productos';
import paths from './../../../../constants/paths';
import labels from './../../../../constants/labels';
import SwipeList from '../../../../components/SwipeList';
import Producto from './../../../../models/Listas/ProductoModel';

export default function ProductosIndex({ navigation }) {
    const dispatch = useDispatch();
    const response = useSelector((state) => { return state.productos.productos });

    const initListProductos = () => {
        dispatch(getProductos());
    }

    const renderProductos = (item) => {
        if (item) {
            return <Text>{item.nombre}: {item.linea.nombre}, {item.unidad_medida} {item.unidad_compra} </Text>
        }
    }

    const delProducto = (item) => {
        if (!item)
            return;

        dispatch(deleteProducto(item));
        initListProductos();
    }

    const handleAdd = () => {
        const { navigate } = navigation;
        navigate(paths.PRODUCTO_FORM, { producto: null, navigation: navigation });
    }

    const goToScreenUpdateProducto = (item) => {
        if (!item)
            return;
        //constructor(id = 1,nombre = '',imagen = '',linea = new Linea(),unidad_medida = 1,
        //    unidad_compra = 1,contenido = 1,precios_venta = [],claves = [],
        //    clasificadores = new ClasificadorProducto(),proveedor = new Proveedor(),
        //    impuestos = [], notas = '',activo = true,)
        let producto = new Producto(item['id'], item['nombre'], item['imagen'],
            item['linea'], item['unidad_medida'], item['unidad_compra'],
            item['contenido'], item['precios_venta'], item['claves'],
            item['clasificadores'], item['proveedor'], item['impuestos'],
            item['notas'], item['activo']);
        const { navigate } = navigation;
        navigate(paths.PRODUCTO_FORM, { producto: producto, navigation: navigation });
    }

    return (
        <>
            <SwipeList
                dataSet={response.result}
                renderDetail={renderProductos}
                delete={delProducto}
                update={goToScreenUpdateProducto}
                new={handleAdd}
                titulo={labels.LISTA_PRODUCTOS_TITLE} />
        </>
    );
}