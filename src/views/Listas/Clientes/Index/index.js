import React from 'react';
import { Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { getClientes, deleteCliente } from './../../../../actions/clientes';
import paths from './../../../../constants/paths';
import labels from './../../../../constants/labels';
//import { getRutas } from './../../../../actions/rutas';
import SwipeList from '../../../../components/SwipeList';
import Cliente from './../../../../models/Listas/ClienteModel';

export default function ClientesIndex({ navigation }) {
    const dispatch = useDispatch();
    const datos = useSelector((state) => { return state.clientes.clientes });

    const initListClientes = () => {
        dispatch(getClientes());
    }

    const renderClientes = (item) => {
        if (item) {
            return <Text>{item.nombre}: {item.numero}, {item.asentamiento} {item.municipio} </Text>
        }
    }

    const delCliente = (item) => {
        if (!item)
            return;

        dispatch(deleteCliente(item));
        initListClientes();
    }

    const handleAdd = () => {
        //dispatch(getRutas());
        const { navigate } = navigation;
        navigate(paths.CLIENTE_FORM, { cliente: null, navigation: navigation });
    }

    const goToScreenUpdateCliente = (item) => {
        if (!item)
            return;
        //dispatch(getRutas());
        //constructor(id = 1, numero = 1, nombre = '', municipio = '', asentamiento = '', latitud = '', longitud = '', activo = true, ruta = new Ruta(), suministros = []) {
        let cliente = new Cliente(item['id'], item['numero'], item['nombre'], item['municipio'], item['asentamiento'], item['latitud'], item['longitud'], item['activo'], item['ruta']);
        const { navigate } = navigation;
        navigate(paths.CLIENTE_FORM, { cliente: cliente, navigation: navigation });
    }

    return (
        <>
            <SwipeList
                dataSet={datos}
                renderDetail={renderClientes}
                delete={delCliente}
                update={goToScreenUpdateCliente}
                new={handleAdd}
                titulo={labels.LISTA_CLIENTES_TITLE} />
        </>
    );
}