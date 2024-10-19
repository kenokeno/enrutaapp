import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCentrosDistribucion } from './../../../actions/centrosDistribucion';
import CentrosDistribucionIndex from './Index';
import Loading from './../../../components/Loading';

export default function CentroDistribucion({ navigation }) {
    const dispatch = useDispatch();
    const datos = useSelector((state) => state.centrosDistribucion.centros);

    useEffect(() => {
        dispatch(getCentrosDistribucion());
    }, [])

    if (datos === undefined) { return <Loading isVisible={true} text="Cargando Datos..." />; }

    return <CentrosDistribucionIndex navigation={navigation} />;
}