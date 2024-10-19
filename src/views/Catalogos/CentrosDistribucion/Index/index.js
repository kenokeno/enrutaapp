import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
//import { EventEmitter } from 'events';

import { styles } from './styles';
import { getCentrosDistribucion, deleteCentroDistribucion } from './../../../../actions/centrosDistribucion';
import paths from './../../../../constants/paths';
import SwipeList from '../../../../components/SwipeList';
import CentroDistribucionModel from './../../../../models/Catalogos/CentroDistribucionModel';

export default function CentrosDistribucionIndex({ navigation }) {
    const dispatch = useDispatch();
    const datos = useSelector((state) => { return state.centrosDistribucion.centros });

    const initListCentrosDistribucion = () => {
        dispatch(getCentrosDistribucion());
    }

    const renderCentrosDistribucion = (ceDist) => {
        if (ceDist) {
            return <Text>{ceDist.nombre}: {ceDist.direccion}, {ceDist.ciudad}</Text>
        }
    }

    const deleteCeDist = (item) => {
        if (!item)
            return;

        dispatch(deleteCentroDistribucion(item));
        initListCentrosDistribucion();
    }

    const handleAdd = () => {
        const { navigate } = navigation;
        //navigate(CENTRO_DISTRIBUCION_FORM, { centroDistribucion: null, event: { event } });
        navigate(paths.CENTRO_DISTRIBUCION_FORM, { centroDistribucion: null });
    }

    const goToScreenUpdateCeDist = (item) => {
        if (!item)
            return;
        let cD = new CentroDistribucionModel(item['id'], item['nombre'], item['ciudad'], item['direccion']);
        const { navigate } = navigation;
        navigate(paths.CENTRO_DISTRIBUCION_FORM, { centroDistribucion: cD });
    }

    return (
        <>
            <SwipeList
                centrosDistribucion={datos}
                renderDetail={renderCentrosDistribucion}
                delete={deleteCeDist}
                update={goToScreenUpdateCeDist}
                new={handleAdd}
                titulo="Centros de Distribución" />
        </>
    );
}