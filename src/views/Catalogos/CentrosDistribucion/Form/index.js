import React, { useState, useEffect } from 'react';
import { Keyboard, Text } from 'react-native';
import { VStack, FormControl, Center, Input, Button, useToast } from 'native-base';
import { size, isEmpty, isNull } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { styles } from './styles';
import paths from '../../../../constants/paths';
import colors from './../../../../constants/colors';
import messages from './../../../../constants/messages';
import { createCentroDistribucion, updateCentroDistribucion } from './../../../../actions/centrosDistribucion';
import CentroDistribucion from '../../../../models/Catalogos/CentroDistribucionModel';

export default function CentroDistribucionForm(props) {
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.centrosDistribucion.msg);
    const ceDist = props.route.params.centroDistribucion ? props.route.params.centroDistribucion : new CentroDistribucion();
    const [centroDistribucion, setCentroDistribucion] = useState(ceDist);
    const [errorNombre, setErrorNombre] = useState();
    const [errorDireccion, setErrorDireccion] = useState();
    const [errorCiudad, setErrorCiudad] = useState();
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    //const event = props.navigation.state.params.event.event;
    //const event = props.route.params.event.event;

    useEffect(() => {
        if (!isNull(props.route.params.centroDistribucion))
            setCentroDistribucion(props.route.params.centroDistribucion);
    }, [props.route.params.centroDistribucion])

    useEffect(() => {
        if (msg && saving) {
            savingSuccess();
            setSaving(false);
            setCentroDistribucion(new CentroDistribucion());
        }
    })

    const validate = () => {
        if (!centroDistribucion) return saving;

        validateFieldNombre();
        validateFieldCiudad();
        validateFieldDireccion();

        return !isEmpty(errorNombre) || !isEmpty(errorNombre) || !isEmpty(errorNombre);
    };

    const validateFieldNombre = () => {
        const arre = [];
        let sizeMin = 4;
        let value = centroDistribucion.nombre;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorNombre(arre);
    };

    const validateFieldCiudad = () => {
        const arre = [];
        let sizeMin = 4;
        let value = centroDistribucion.ciudad;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorCiudad(arre);
    };

    const validateFieldDireccion = () => {
        const arre = [];
        let sizeMin = 4;
        let value = centroDistribucion.direccion;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorDireccion(arre);
    };

    const onChange = (e, type) => {
        setCentroDistribucion({ ...centroDistribucion, [type]: e.nativeEvent.text })
    }

    const renderListErrors = (campo) => {
        switch (campo) {
            case 'nombre':
                return errorNombre && !isEmpty(errorNombre) ? errorNombre.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'ciudad':
                return errorCiudad && !isEmpty(errorCiudad) ? errorCiudad.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'direccion':
                return errorDireccion && !isEmpty(errorDireccion) ? errorDireccion.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            default:
                return null;
        }
    }

    const onSubmit = () => {
        if (!validate()) {
            let ceDist = new CentroDistribucion(centroDistribucion['id'], centroDistribucion['nombre'], centroDistribucion['ciudad'], centroDistribucion['direccion']);

            if (props.route.params.centroDistribucion) {
                dispatch(updateCentroDistribucion(ceDist))
            } else {
                dispatch(createCentroDistribucion(ceDist));
            }
            setSaving(true);
        }
    }

    const savingSuccess = () => {
        let update = props.route.params.centroDistribucion;
        if (msg.result) {
            toast.show({
                title: update ? messages.REGISTRO_ACTUALIZADO_TITLE : messages.REGISTRO_GUARDADO_TITLE,
                status: "success",
                description: msg.message,
            });
        } else {
            toast.show({
                title: messages.REGISTRO_ERROR_TITLE,
                status: "error",
                description: msg.message,
            });
        }
        Keyboard.dismiss();
        const { navigate } = props.navigation;
        navigate(paths.CENTRO_DISTRIBUCION_INDEX, { navigation: props.navigation })
    }

    return (
        <>
            <KeyboardAwareScrollView >
                <VStack width="90%" mx={3} p={4} space={4}>
                    <FormControl isRequired isInvalid={!isEmpty(errorNombre)}>
                        <FormControl.Label _text={{ bold: true }}>Nombre: </FormControl.Label>
                        <Input
                            value={centroDistribucion.nombre}
                            placeholder='Nombre del centro de distribución...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'nombre')}
                            onBlur={() => { validateFieldNombre(); renderListErrors('nombre') }}
                        />
                        {!isEmpty(errorNombre) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('nombre')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorCiudad)}>
                        <FormControl.Label _text={{ bold: true }}>Ciudad: </FormControl.Label>
                        <Input
                            value={centroDistribucion.ciudad}
                            placeholder='Nombre del centro de distribución...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'ciudad')}
                            onBlur={() => { validateFieldCiudad(); renderListErrors('ciudad') }}
                        />
                        {!isEmpty(errorCiudad) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('ciudad')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorDireccion)}>
                        <FormControl.Label _text={{ bold: true }}>Dirección: </FormControl.Label>
                        <Input
                            value={centroDistribucion.direccion}
                            placeholder='Dirección del centro de distribución...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'direccion')}
                            onBlur={() => { validateFieldDireccion(); renderListErrors('direccion') }}
                        />
                        {!isEmpty(errorDireccion) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('direccion')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <Button
                        isLoading={saving}
                        isLoadingText="Submitting"
                        onPress={onSubmit}
                        mt={5}
                        variant="solid"
                        backgroundColor={colors.PRIMARY_COLOR}>
                        Guardar
                    </Button>
                </VStack>
            </KeyboardAwareScrollView>
        </>
    )
}