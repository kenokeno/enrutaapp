import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductos } from './../../../actions/productos';
import ProductosIndex from './Index';
import Loading from './../../../components/Loading';
import messages from './../../../constants/messages';

export default function Producto({ navigation }) {
    const dispatch = useDispatch();
    const datos = useSelector((state) => state.productos.productos);

    useEffect(() => {
        dispatch(getProductos());
    }, []);

    if (datos === undefined) { return <Loading isVisible={true} text={messages.CARGANDO_DATOS} />; }

    return <ProductosIndex navigation={navigation} />;
}