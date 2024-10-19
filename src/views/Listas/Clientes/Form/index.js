import React, { useState, useEffect } from 'react';
import { Keyboard, Text, PermissionsAndroid } from 'react-native';
import { VStack, FormControl, Icon, Input, View, Button, useToast, CheckIcon, Select, Modal } from 'native-base';
import { size, isEmpty, isNull, sortBy, isUndefined } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { styles } from './styles';
import paths from '../../../../constants/paths';
import colors from './../../../../constants/colors';
import labels from './../../../../constants/labels';
import messages from './../../../../constants/messages';
import { createCliente, updateCliente } from './../../../../actions/clientes';
import { getAllRegistries } from './../../../../api';
import Cliente from '../../../../models/Listas/ClienteModel';
import { TIME_TOAST } from '../../../../constants';
import Title from './../../../../components/Title';

export default function ClienteForm(props) {
    const dispatch = useDispatch();
    const [rutas] = useState(getAllRegistries({ model: 'Ruta' }).result);
    const clientes = useSelector((state) => state.clientes.clientes);
    const msg = useSelector((state) => state.clientes.msg);
    //const cli = !isNull(props.route.params.cliente) ? props.route.params.cliente : new Cliente();
    const [cliente, setCliente] = useState(new Cliente());
    //constructor(id = 1, numero = 1, nombre = '', municipio = '', asentamiento = '', latitud = '', longitud = '', activo = true, ruta = new Ruta(), suministros = []) {
    const [errorNombre, setErrorNombre] = useState();
    const [errorCiudad, setErrorCiudad] = useState();
    const [errorDireccion, setErrorDireccion] = useState();
    const [errorRuta, setErrorRuta] = useState();
    const [saving, setSaving] = useState(false);
    //const [ruta, setRuta] = useState(!isNull(props.route.params.cliente) ? props.route.params.cliente.ruta.id : []);//****** */
    const [ruta, setRuta] = useState();//****** */
    const [showMap, setShowMap] = useState(false)
    const [locationCliente, setLocationCliente] = useState(null);
    const toast = useToast();
    //const event = props.navigation.state.params.event.event;
    //const event = props.route.params.event.event;
    //console.log("Ruta:", props.route.params.cliente.ruta);
    //console.log(props.route.params.cliente.ruta);

    useEffect(() => {
        if (!isNull(props.route.params.cliente)) {
            setCliente(props.route.params.cliente);
            setLocationCliente({
                latitude: props.route.params.cliente.latitud,
                longitude: props.route.params.cliente.longitud
            });
            setRuta(props.route.params.cliente.ruta.id);
        } else {
            setCliente(new Cliente());
            setRuta([]);
        }
    }, [props.route.params.cliente]);

    useEffect(() => {
        if (msg && saving) {
            savingSuccess();
            setSaving(false);
            setCliente(new Cliente());
            setRuta([]);
        }
    });

    useEffect(() => {
        if (!isNull(locationCliente)) isValidateFieldDireccion();
    }, [locationCliente]);

    const isValidate = () => {
        if (!cliente) return saving;

        return isValidateFieldNombre()
            && isValidateFieldCiudad()
            && isValidateFieldDireccion()
            && isValidateSelectLocation()
            && isValidateSelectRuta();
    };

    const isValidateFieldNombre = () => {
        const arre = [];
        let sizeMin = 4;
        let value = cliente.nombre;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorNombre(arre);
        return isEmpty(arre);
    };

    const isValidateFieldCiudad = () => {
        const arre = [];
        let sizeMin = 4;
        let value = cliente.municipio;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorCiudad(arre);
        return isEmpty(arre);
    };

    const isValidateFieldDireccion = () => {
        const arre = [];
        let sizeMin = 4;
        let value = cliente.asentamiento;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorDireccion(arre);
        return isEmpty(arre);
    };

    const isValidateSelectLocation = () => {
        const arre = [];
        if (isNull(locationCliente)) arre.push(messages.UBICACION_OBLIGATORIA);
        setErrorDireccion(arre);
        return isEmpty(arre);
    };

    const isValidateSelectRuta = () => {
        const arre = [];
        if (isUndefined(ruta)) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorRuta(arre);
        return isEmpty(arre);
    };

    const onChange = (e, type) => {
        setCliente({ ...cliente, [type]: e.nativeEvent.text })
    };

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
            case 'ruta':
                return errorRuta && !isEmpty(errorRuta) ? errorRuta.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            default:
                return null;
        }
    }

    const onSubmit = () => {
        if (isValidate()) {
            //constructor(id = 1, numero = 1, nombre = '', municipio = '', asentamiento = '', latitud = '', longitud = '', activo = true, ruta = new Ruta(), suministros = []) {            
            let c = new Cliente();
            c.id = cliente['id'];
            c.numero = props.route.params.cliente ? props.route.params.cliente.numero : getNumeroCliente();
            c.nombre = cliente['nombre'];
            c.municipio = cliente['municipio'];
            c.asentamiento = cliente['asentamiento'];
            c.latitud = locationCliente.latitude;
            c.longitud = locationCliente.longitude;
            c.ruta = rutas[ruta - 1];
            if (props.route.params.cliente) {
                dispatch(updateCliente(c));
            } else {
                dispatch(createCliente(c));
            }
            setSaving(true);
        }
    }

    const getNumeroCliente = () => {
        const anio = moment().get('year');
        let month = moment().get('month') + 1;
        let day = moment().get('date');
        const noRuta = ruta < 10 ? `0${ruta}` : ruta;
        let noCliente = isEmpty(clientes) ? 1 : (sortBy(clientes, ['id'])[0].id) + 1;
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        noCliente = noCliente < 10 ? `0${noCliente}` : noCliente;
        const numero = `${anio}${month}${day}${noRuta}${noCliente}`;
        return parseInt(numero);
    }

    const savingSuccess = () => {
        let update = props.route.params.cliente;
        if (msg.result) {
            toast.show({
                title: update ? labels.REGISTRO_ACTUALIZADO_TITLE : labels.REGISTRO_GUARDADO_TITLE,
                status: "success",
                description: msg.message,
                duration: TIME_TOAST,
            });
        } else {
            toast.show({
                title: labels.REGISTRO_ERROR_TITLE,
                status: "error",
                description: msg.message,
                duration: TIME_TOAST,
            });
        }
        Keyboard.dismiss();
        const { navigate } = props.navigation;
        navigate(paths.CLIENTE_LOADING, { navigation: props.navigation })
    }
    //https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md
    function Map(props) {
        const [position, setPosition] = useState(null);
        const { showMap, setShowMap, locationCliente, setLocationCliente } = props;
        const matriz = {
            latitude: 19.511274,
            longitude: -101.619373,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };
        useEffect(() => {
            if (showMap) requestLocationPermission();
        }, []);

        //https://stackoverflow.com/questions/45822318/how-do-i-request-permission-for-android-device-location-in-react-native-at-run-t
        //https://aboutreact.com/react-native-android-permission/
        //https://www.youtube.com/watch?v=4qq0GQPkfjI&t=537s
        //https://www.youtube.com/watch?v=f6AmFD6G7Zg&t=604s   -> revisar los comentarios del video
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    handleUserLocation();
                } else {
                    toast.show({
                        title: labels.UBICACION_GUARDADO_TITLE,
                        status: "error",
                        description: messages.UBICACION_GUARDADO_ERROR,
                        duration: TIME_TOAST,
                    });
                }
            } catch (err) {
                console.warn(err)
            }
        }
        const confirmCoordinate = () => {
            setLocationCliente(position);
            toast.show({
                title: labels.UBICACION_GUARDADO_TITLE,
                status: "success",
                description: messages.UBICACION_GUARDADO_DETAIL,
                duration: TIME_TOAST,
            });
            setShowMap(false);
        }

        const handleUserLocation = () => {
            Geolocation.getCurrentPosition(pos => {
                if (isNull(locationCliente)) {
                    setPosition({ ...pos.coords, latitudeDelta: 0.001, longitudeDelta: 0.001 });
                } else {
                    setPosition({ latitude: locationCliente.latitude, longitude: locationCliente.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 });
                }
            })
        }

        const handleChangePositionMarked = (e) => {
            setPosition({ ...position, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        };

        return (
            <Modal isOpen={showMap} onClose={() => setShowMap(false)} size="xl" >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>{labels.GEOLOCALIZACION_CLIENTE_TITLE}</Modal.Header>
                    <Modal.Body height="300px" width="300px">
                        <View style={styles.containerMap}>
                            {position && (<MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                initialRegion={position}
                                showsUserLocation={true}
                                onRegionChangeComplete={(region) => setPosition(region)}
                            >
                                <Marker coordinate={matriz}>
                                    <FontAwesome size={24} name="map-pin" color={colors.PRIMARY_COLOR} />
                                </Marker>
                                <Marker
                                    coordinate={{
                                        latitude: position.latitude,
                                        longitude: position.longitude,
                                    }}
                                    onDragEnd={(e) => handleChangePositionMarked(e)}
                                    draggable
                                    isPreselected
                                >
                                    <FontAwesome name="map-marker" size={32} color={colors.PRIMARY_COLOR} />
                                    <Callout>
                                        <View width='120px'>
                                            <Text style={{ textAlign: 'center', }}>{messages.MARCA_LOCALIZACION_CLIENTE}</Text>
                                        </View>
                                    </Callout>
                                </Marker>
                            </MapView>
                            )}
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="outline" space={2}>
                            <Button
                                style={{ borderColor: colors.PRIMARY_COLOR }}
                                _text={{
                                    color: colors.PRIMARY_COLOR
                                }}
                                onPress={() => {
                                    setShowMap(false)
                                }}
                            >{labels.BTN_CERRAR_LABEL}</Button>
                            <Button
                                style={{ borderColor: colors.PRIMARY_COLOR }}
                                _text={{
                                    color: colors.PRIMARY_COLOR
                                }}
                                onPress={() => {
                                    confirmCoordinate();
                                }}
                            >{labels.BTN_GUARDAR_LABEL}
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal >
        );
    }

    return (
        <>
            <Title titulo={'Nuevo Cliente'} navigation={props.navigation} />
            <KeyboardAwareScrollView >
                <VStack width="90%" mx={3} p={4} space={4}>
                    <FormControl isRequired isInvalid={!isEmpty(errorNombre)}>
                        <FormControl.Label _text={{ bold: true }}>Nombre: </FormControl.Label>
                        <Input
                            value={cliente.nombre}
                            placeholder='Nombre del cliente...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'nombre')}
                            onBlur={() => {
                                isValidateFieldNombre();
                                renderListErrors('nombre')
                            }}
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
                            value={cliente.municipio}
                            placeholder='Ciudad del cliente...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'municipio')}
                            onBlur={() => {
                                isValidateFieldCiudad();
                                renderListErrors('ciudad');
                            }}
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
                            value={cliente.asentamiento}
                            placeholder='Dirección del cliente...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            InputRightElement={
                                <Icon
                                    size='sm'
                                    m={2}
                                    size={6}
                                    color={locationCliente ? colors.PRIMARY_COLOR : colors.SECONDARY_FONT_COLOR}
                                    onPress={() => setShowMap(true)}
                                    as={<FontAwesome name="map-marker" size={60} />}
                                />
                            }
                            onChange={(e) => onChange(e, 'asentamiento')}
                            onBlur={() => {
                                isValidateFieldDireccion();
                                renderListErrors('direccion');
                            }}
                        />
                        {!isEmpty(errorDireccion) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('direccion')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorRuta)}>
                        <FormControl.Label _text={{ bold: true }}>Ruta: </FormControl.Label>
                        <Select
                            selectedValue={ruta}
                            minWidth={200}
                            accessibilityLabel="Selecciona la ruta del cliente"
                            placeholder="Selecciona la ruta del cliente"
                            onValueChange={(itemValue) => {
                                setRuta(itemValue);
                                setErrorRuta([]);
                            }}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt={1}
                        >
                            {
                                rutas.map((item) =>
                                    <Select.Item key={item.id} label={item.nombre} value={item.id} />)
                            }
                        </Select>
                        {!isEmpty(errorRuta) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('ruta')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <Button
                        isLoading={saving}
                        isLoadingText={labels.GUARDANDO}
                        onPress={onSubmit}
                        mt={5}
                        variant="solid"
                        backgroundColor={colors.PRIMARY_COLOR}>
                        {labels.BTN_GUARDAR_LABEL}
                    </Button>
                    <Map showMap={showMap} setShowMap={setShowMap} locationCliente={locationCliente} setLocationCliente={setLocationCliente} />
                </VStack>
            </KeyboardAwareScrollView>
        </>
    )
}

