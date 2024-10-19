import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClientes } from './../../../actions/clientes';
import ClientesIndex from './Index';
import Loading from './../../../components/Loading';
import messages from './../../../constants/messages';

export default function Cliente({ navigation }) {
    const dispatch = useDispatch();
    const datos = useSelector((state) => state.clientes.clientes);

    useEffect(() => {
        dispatch(getClientes());
    }, [])

    if (datos === undefined) { return <Loading isVisible={true} text={messages.CARGANDO_DATOS} />; }

    return <ClientesIndex navigation={navigation} />;
}