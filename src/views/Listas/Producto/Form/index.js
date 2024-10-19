import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, PermissionsAndroid } from 'react-native';
import {
    VStack, Center, FormControl, Select, CheckIcon, Icon, AlertDialog,
    Input, Button, Modal, useToast, Text, Heading, Stack, HStack, Box
} from 'native-base';
import { Avatar } from 'react-native-elements';
import { size, isEmpty, isNull, isUndefined, remove, find, map, forEach } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconMaterialcommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

import { styles } from './styles';
import paths from '../../../../constants/paths';
import colors from './../../../../constants/colors';
import labels from './../../../../constants/labels';
import messages from './../../../../constants/messages';
import { createProducto, updateProducto, validarCodigoProducto, getProductos } from './../../../../actions/productos';
import { getAllRegistries } from './../../../../api';
import { TIME_TOAST } from '../../../../constants';
import Producto from '../../../../models/Listas/ProductoModel';
import PrecioVenta from './../../../../models/Listas/PrecioVentaModel';
import Clave from './../../../../models/Listas/ClaveModel';
import { currencyFormat, isNumberFormatValidate } from './../../../../api/validations';
import Title from './../../../../components/Title';

export default function ProductoForm(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.productos.productos);
    const [producto, setProducto] = useState(new Producto());
    const [imagesProducto, setImagesProducto] = useState();
    const [imageProducto, setImageProducto] = useState();
    const [lineas] = useState(getAllRegistries({ model: 'Linea' }).result);
    const [proveedores] = useState(getAllRegistries({ model: 'Proveedor' }).result);
    const [impuestos] = useState(getAllRegistries({ model: 'Impuesto' }).result);
    const [preciosVenta, setPreciosVenta] = useState([]);
    const [precioVenta, setPrecioVenta] = useState(null);
    const [linea, setLinea] = useState();
    const [claves, setClaves] = useState([]);
    const [clave, setClave] = useState(null);
    const [proveedor, setProveedor] = useState();
    const [errorNombre, setErrorNombre] = useState();
    const [errorLinea, setErrorLinea] = useState();
    const [errorUnidadMedida, setErrorUnidadMedida] = useState();
    const [errorUnidadCompra, setErrorUnidadCompra] = useState();
    const [errorContenido, setErrorContenido] = useState();
    const [errorPreciosVenta, setErrorPreciosVenta] = useState();
    const [errorClaves, setErrorClaves] = useState();
    const [errorProveedor, setErrorProveedor] = useState();
    const [errorImpuestos, setErrorImpuestos] = useState();
    const [saving, setSaving] = useState(false);
    const [showModalListaPrecio, setShowModalListaPrecio] = useState(false)
    const [showModalListaClave, setShowModalListaClave] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();

    useEffect(() => {
        if (!isNull(props.route.params.producto)) {
            setProducto(props.route.params.producto);
            const precios = props.route.params.producto.precios_venta.map(x => {
                return JSON.parse(JSON.stringify(x));
            });
            setPreciosVenta(precios);
            const clvs = props.route.params.producto.claves.map(x => {
                return JSON.parse(JSON.stringify(x));
            });
            setClaves(clvs);
            setLinea(props.route.params.producto.linea.id);
            setProveedor(props.route.params.producto.proveedor.id);
            if (!isNull(props.route.params.producto.imagen)) {
                const images = [];
                images.push(props.route.params.producto.imagen);
                setImagesProducto(images);
            }
        } else {
            cleanForm();
        }
    }, [props.route.params.producto]);

    useEffect(() => {
        if (response && saving) {
            setSaving(false);
            cleanForm();
            savingSuccess();
        }
    });

    function cleanForm() {
        setProducto(new Producto());
        setPreciosVenta([]);
        setClaves([]);
        setLinea([]);
        setProveedor([]);
        setImagesProducto([]);
    }

    const isValidate = () => {
        if (!producto) return saving;
        return isValidateFieldNombre()
            && isValidateSelectLinea()
            && isValidateFieldUnidadMedida()
            && isValidateFieldUnidadCompra()
            && isValidateFieldContenido()
            && isValidateListPreciosVenta()
            && isValidateListClaves()
            && isValidateSelectProveedor();
    };

    const isValidateFieldNombre = () => {
        const arre = [];
        let sizeMin = 4;
        let value = producto.nombre;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        if (size(value) < sizeMin) arre.push(messages.CAMPO_TAMANIO_MIN, sizeMin);
        setErrorNombre(arre);
        return isEmpty(arre);
    };

    const isValidateSelectLinea = () => {
        const arre = [];
        if (linea === []) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorLinea(arre);
        return isEmpty(arre);
    };

    const isValidateFieldUnidadMedida = () => {
        const arre = [];
        let value = producto.unidad_medida;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorUnidadMedida(arre);
        return isEmpty(arre);
    };

    const isValidateFieldUnidadCompra = () => {
        const arre = [];
        let value = producto.unidad_compra;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorUnidadCompra(arre);
        return isEmpty(arre);
    };

    const isValidateFieldContenido = () => {
        const arre = [];
        let value = producto.contenido;
        if (isUndefined(value) || value < 1) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorContenido(arre);
        return isEmpty(arre);
    };

    const isValidateListPreciosVenta = () => {
        const arre = [];
        let value = preciosVenta;
        let valido = false;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        //Script para validar que se ha agregado el precio de lista
        // En este caso se ha definido id=1 para el precio de lista, pero pudiera cambiar su definición
        forEach(value, function (precio_venta) {
            if (precio_venta.lista_precios.id === 1) valido = true;
        });
        if (!valido) arre.push(messages.PRECIO_LISTA_OBLIGATORIO);
        setErrorPreciosVenta(arre);
        return isEmpty(arre);
    };

    const isValidateListClaves = () => {
        const arre = [];
        let value = claves;
        let valido = false;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        //Script para validar que se ha agregado la clave principal al producto
        // En este caso se ha definido id=1 para la clave principal, pero pudiera cambiar su definición
        forEach(value, function (clave) {
            if (clave.rol.id === 1) valido = true;
        });
        if (!valido) arre.push(messages.CLAVE_PRINCIPAL_OBLIGATORIO);
        setErrorClaves(arre);
        return isEmpty(arre);
    };

    const isValidateSelectProveedor = () => {
        const arre = [];
        if (proveedor === []) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorProveedor(arre);
        return isEmpty(arre);
    };

    const isValidateListImpuestos = () => {
        const arre = [];
        let value = producto.impuestos;

        if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
        setErrorImpuestos(arre);
        return isEmpty(arre);
    };

    const onChange = (e, type) => {
        setProducto({ ...producto, [type]: e.nativeEvent.text })
    };

    const renderListErrors = (campo) => {
        switch (campo) {
            case 'nombre':
                return errorNombre && !isEmpty(errorNombre) ? errorNombre.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'linea':
                return errorLinea && !isEmpty(errorLinea) ? errorLinea.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'unidad_medida':
                return errorUnidadMedida && !isEmpty(errorUnidadMedida) ? errorUnidadMedida.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'unidad_compra':
                return errorUnidadCompra && !isEmpty(errorUnidadCompra) ? errorUnidadCompra.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'contenido':
                return errorContenido && !isEmpty(errorContenido) ? errorContenido.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'precios_venta':
                return errorPreciosVenta && !isEmpty(errorPreciosVenta) ? errorPreciosVenta.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'claves':
                return errorClaves && !isEmpty(errorClaves) ? errorClaves.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'proveedor':
                return errorProveedor && !isEmpty(errorProveedor) ? errorProveedor.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            case 'impuestos':
                return errorImpuestos && !isEmpty(errorImpuestos) ? errorImpuestos.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                break;
            default:
                return null;
        }
    }

    const onSubmit = () => {
        if (isValidate()) {
            //constructor(id = 1,nombre = '',imagen = '',linea = new Linea(),unidad_medida = 1,unidad_compra = 1,
            //contenido = 1, precios_venta = [],claves = [],clasificadores = new ClasificadorProducto(),proveedor = new Proveedor(),
            //impuestos = [],notas = '',activo = true,) {
            let p = new Producto();
            p.id = producto['id'];
            p.nombre = producto['nombre'];
            p.imagen = imagesProducto ? imagesProducto[0] : null;//esto debe cambiar si el requisito es varias imagenes en un producto
            p.linea = lineas[linea - 1];//rutas[ruta - 1];
            p.unidad_medida = producto['unidad_medida'];
            p.unidad_compra = producto['unidad_compra'];
            p.contenido = parseInt(producto['contenido']);
            p.precios_venta = preciosVenta;
            p.claves = claves;
            p.clasificadores = null;
            p.proveedor = proveedores[proveedor - 1];//rutas[ruta - 1];
            p.impuestos = impuestos;
            if (props.route.params.producto) {
                dispatch(updateProducto(p));
            } else {
                dispatch(createProducto(p));
            }
            dispatch(getProductos());
            setSaving(true);
        }
    }

    const savingSuccess = () => {
        let update = props.route.params.producto;
        if (response.result) {
            toast.show({
                title: update ? labels.REGISTRO_ACTUALIZADO_TITLE : labels.REGISTRO_GUARDADO_TITLE,
                status: "success",
                description: response.message,
                duration: TIME_TOAST,
            });
        } else {
            toast.show({
                title: labels.REGISTRO_ERROR_TITLE,
                status: "error",
                description: response.message,
                duration: TIME_TOAST,
            });
        }
        Keyboard.dismiss();
        const { navigate } = props.navigation;
        navigate(paths.PRODUCTO_LOADING, { navigation: props.navigation })
    }

    const renderDetailPreciosVenta = (item) => {
        //let pv = new PrecioVenta(item['id'], item['producto'], item['lista_precios'], item['precio_c_impuesto'], item['precio_s_impuesto'])
        return (
            <Center key={item.lista_precios.id}>
                <Box
                    bg={colors.TERTIARY_COLOR}
                    shadow={2}
                    rounded="lg"
                    width="100%"
                    p="2"
                    direction="row"
                >
                    <Stack space={2}>
                        <Heading size="sm" noOfLines={2}>
                            {item.lista_precios.nombre}
                        </Heading>
                        <HStack space={2} alignItems="center">
                            <VStack px={1}>
                                <Text style={styles.generalFontSize} color="gray.700">Precio con impuesto: {currencyFormat(item.precio_c_impuesto)}</Text>
                                <Text style={styles.generalFontSize} color="gray.700">Precio sin impuesto: {currencyFormat(item.precio_s_impuesto)}</Text>
                            </VStack>
                            <HStack
                                flex={1}
                                justifyContent='flex-end'
                                width='100%'
                            >
                                <IconMaterialcommunityIcons
                                    name='delete-circle'
                                    style={styles.icon}
                                    color={colors.INDICATOR_COLOR}
                                    size={25}
                                    onPress={() => handleRemoveListaPrecios(item)}
                                />
                                <IconFontAwesome
                                    name='edit'
                                    style={styles.icon}
                                    color={colors.INDICATOR_COLOR}
                                    size={25}
                                    onPress={() => handleUpdateListaPrecios(item)}
                                />
                            </HStack>
                        </HStack>
                    </Stack>
                </Box>
            </Center>
        )
    }

    const renderFooterPrecios = () => {
        //ghost
        return (
            <Center>
                <Button
                    size="sm"
                    variant="link"
                    onPress={() => { setPrecioVenta(null); setShowModalListaPrecio(true); }}
                >
                    Agregar precio
                </Button>
            </Center>
        );
    }

    const renderDetailClaves = (item) => {
        //let pv = new PrecioVenta(item['id'], item['producto'], item['lista_precios'], item['precio_c_impuesto'], item['precio_s_impuesto'])
        return (
            <Center key={item.rol.id}>
                <Box
                    bg={colors.TERTIARY_COLOR}
                    shadow={2}
                    rounded="lg"
                    width="100%"
                    p="2"
                    direction="row"
                >
                    <Stack space={2}>
                        <Heading size="sm" noOfLines={2}>
                            {item.rol.nombre}
                        </Heading>
                        <HStack space={2} alignItems="center">
                            <VStack px={1}>
                                <Text style={styles.generalFontSize} color="gray.700">Código: {item.codigo}</Text>
                            </VStack>
                            <HStack
                                flex={1}
                                justifyContent='flex-end'
                                width='100%'>
                                <IconMaterialcommunityIcons
                                    name='delete-circle'
                                    style={styles.icon}
                                    color={colors.INDICATOR_COLOR}
                                    size={25}
                                    onPress={() => handleRemoveListaClaves(item)}
                                />
                                <IconFontAwesome
                                    name='edit'
                                    style={styles.icon}
                                    color={colors.INDICATOR_COLOR}
                                    size={25}
                                    onPress={() => handleUpdateListaClaves(item)}
                                />
                            </HStack>
                        </HStack>
                    </Stack>
                </Box>
            </Center >
        )
    }

    const renderFooterClaves = () => {
        //ghost
        return (
            <Center>
                <Button
                    size="sm"
                    variant="link"
                    onPress={() => { setClave(null); setShowModalListaClave(true); }}
                >
                    Agregar Clave
                </Button>
            </Center>
        );
    }

    const handleRemoveListaPrecios = (item) => {
        remove(preciosVenta, function (n) {
            return n.lista_precios.id === item.lista_precios.id;
        });
        setPreciosVenta(preciosVenta);
        toast.show({
            title: labels.REGISTRO_ELIMINADO_TITLE,
            status: "error",
            description: messages.REGISTRO_ELIMINADO,
            duration: TIME_TOAST,
        });
    }

    const handleUpdateListaPrecios = (item) => {
        setPrecioVenta(item);
        setShowModalListaPrecio(true);
    }

    const handleRemoveListaClaves = (item) => {
        remove(claves, function (n) {
            return n.codigo === item.codigo;
        });
        setClaves(claves);
        toast.show({
            title: labels.REGISTRO_ELIMINADO_TITLE,
            status: "error",
            description: messages.REGISTRO_ELIMINADO,
            duration: TIME_TOAST,
        });
    }

    const handleUpdateListaClaves = (item) => {
        setClave(item);
        setShowModalListaClave(true);
    }

    const onClose = () => {
        setIsOpen(!isOpen);
    }
    //https://effectussoftware.com/blog/react-native-image-picker/
    //https://www.npmjs.com/package/react-native-image-picker
    //https://www.codegrepper.com/code-examples/javascript/display+base64+image+in+react+native
    function UploadImage() {
        const imageSelect = async () => {
            let images = [];
            let options = {
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                includeBase64: true,
            };
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    toast.show({
                        title: labels.GALERIA_GUARDADO_TITLE,
                        status: "error",
                        description: messages.GALERIA_ERROR,
                        duration: TIME_TOAST,
                    });
                } else {
                    launchImageLibrary(options, (res) => {
                        if (res.assets && size(imagesProducto) == 0) {
                            res.assets.forEach(image => {
                                const i = "data:" + image.type + ";base64," + image.base64;
                                images.push(i);
                            });
                            setImagesProducto(images);
                        }
                    });
                }
            } catch (err) {
                console.warn(err)
            }
        }

        return (
            <Icon
                as={
                    <IconFontAwesome
                        name='photo'
                        style={styles.icon}
                        color={colors.INDICATOR_COLOR}
                        size={25}
                        onPress={isEmpty(imagesProducto) ? imageSelect : null}
                    />
                }
            />
        );
    }
    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    /************************MODAL PRECIOS************************* */
    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    function FormPrecioVenta(props) {
        const {
            showModalListaPrecio,
            setShowModalListaPrecio,
            preciosVenta,
            setPreciosVenta,
            precio_venta } = props; //precio_venta = el precio que se quiere modificar
        const [lista_precios, setListaPrecios] = useState(getAllRegistries({ model: 'ListaPrecios' }).result);
        const [listaPrecio, setListaPrecio] = useState();
        const [precioVenta, setPrecioVenta] = useState();
        const [errorListaPrecio, setErrorListaPrecio] = useState();
        const [errorPrecioVenta, setErrorPrecioVenta] = useState();

        useEffect(() => {
            if (!isNull(precio_venta)) {
                //console.log("precio_v: ", precio_venta.precio_c_impuesto);
                setListaPrecio(precio_venta.lista_precios.id);
                setPrecioVenta(precio_venta.precio_c_impuesto.toString());
            }
        }, [precio_venta]);

        useEffect(() => {
            let list = [];
            if (size(preciosVenta) > 0) {
                list = lista_precios.filter(function (lista) {
                    return isUndefined(find(preciosVenta, function (o) {
                        return o.lista_precios.id === lista.id;
                    }));
                });
                if (!isNull(precio_venta)) list.push(precio_venta.lista_precios);
                setListaPrecios(list);
            }
        }, []);

        const onChange = (e, type) => {
            setPrecioVenta(e.nativeEvent.text);
        };

        const isValidate = () => {
            return isValidateSelectListaPrecio() && isValidateFieldPrecioVenta();
        };

        const isValidateSelectListaPrecio = () => {
            const arre = [];
            if (isUndefined(listaPrecio)) arre.push(messages.CAMPO_OBLIGATORIO);
            setErrorListaPrecio(arre);
            return isEmpty(arre);
        };

        const isValidateFieldPrecioVenta = () => {
            const arre = [];
            let value = precioVenta;
            if (isUndefined(value) || isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
            if (!isNumberFormatValidate(value)) arre.push(messages.CAMPO_NUMERICO_FLOAT);
            setErrorPrecioVenta(arre);
            return isEmpty(arre);
        };

        const renderListErrors = (campo) => {
            switch (campo) {
                case 'lista_precio':
                    return errorListaPrecio && !isEmpty(errorListaPrecio) ? errorListaPrecio.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                    break;
                case 'precio_venta':
                    return errorPrecioVenta && !isEmpty(errorPrecioVenta) ? errorPrecioVenta.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                    break;
                default:
                    return null;
            }
        };

        const save = () => {
            //constructor(lista_precios = new ListaPrecio(), precio_c_impuesto = 1, precio_s_impuesto = 1) {
            if (isValidate()) {
                const lista_precio = find(lista_precios, ['id', listaPrecio]);
                let pv = new PrecioVenta();
                //pv.id = lista_precio.id;//size(preciosVenta) == 0 ? 1 : last(preciosVenta).id + 1;
                pv.lista_precios = lista_precio;
                pv.precio_c_impuesto = parseFloat(precioVenta);
                pv.precio_s_impuesto = precioVenta * 0.84;
                if (isNull(precio_venta)) {
                    preciosVenta.push(pv);
                } else {
                    const preciosVentaUpdate = preciosVenta.map((item) => {
                        if (size(preciosVenta) === 1 || item.lista_precios.id == pv.lista_precios.id) {
                            item = pv;
                        }
                        return item;
                    })
                    setPreciosVenta(preciosVentaUpdate);
                }
                setShowModalListaPrecio(false);
            }
        }

        return (
            <Modal isOpen={showModalListaPrecio} onClose={() => setShowModalListaPrecio(false)} size="lg" >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Precios de Venta</Modal.Header>
                    <Modal.Body>
                        <VStack width="90%" mx={3} py={2} space={2}>
                            <FormControl isRequired isInvalid={!isEmpty(errorListaPrecio)}>
                                <FormControl.Label _text={{ bold: true }}>Lista de Precios: </FormControl.Label>
                                <Select
                                    selectedValue={listaPrecio}
                                    minWidth={200}
                                    style={[styles.select, styles.generalFontSize]}
                                    accessibilityLabel="Selecciona una lista de precios"
                                    placeholder="Selecciona una lista de precios"
                                    onValueChange={(itemValue) => {
                                        setListaPrecio(itemValue);
                                        setErrorListaPrecio([]);
                                    }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={5} />,
                                    }}
                                    mt={1}
                                >
                                    {
                                        lista_precios.map((item) =>
                                            <Select.Item key={item.id} label={item.nombre} value={item.id} />)
                                    }
                                </Select>
                                {!isEmpty(errorListaPrecio) ?
                                    <FormControl.ErrorMessage>
                                        {renderListErrors('lista_precio')}
                                    </FormControl.ErrorMessage>
                                    :
                                    null
                                }
                            </FormControl>
                            <FormControl isRequired isInvalid={!isEmpty(errorPrecioVenta)}>
                                <FormControl.Label _text={{ bold: true }}>Precio de Venta: </FormControl.Label>
                                <Input
                                    value={precioVenta}
                                    type='numeric'
                                    keyboardType="numeric"
                                    placeholder='Precio de venta del producto...'
                                    style={[styles.input, styles.generalFontSize]}
                                    _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                                    onChange={(e) => onChange(e, 'precio_venta')}
                                    onBlur={() => {
                                        isValidateFieldPrecioVenta();
                                        renderListErrors('precio_venta')
                                    }}
                                />
                                {!isEmpty(errorPrecioVenta) ?
                                    <FormControl.ErrorMessage>
                                        {renderListErrors('precio_venta')}
                                    </FormControl.ErrorMessage>
                                    :
                                    null
                                }
                            </FormControl>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button
                                onPress={() => {
                                    setShowModalListaPrecio(false);
                                }}
                            >{labels.BTN_CERRAR_LABEL}</Button>
                            <Button
                                onPress={() => {
                                    save();
                                }}
                            >{labels.BTN_GUARDAR_LABEL}
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal >
        );
    }

    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    /************************MODAL CLAVES************************** */
    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    function FormClaves(props) {
        const {
            showModalListaClave,
            setShowModalListaClave,
            claves,
            setClaves,
            clave,
            producto } = props;  //producto para validar si no hay otro producto con la misma clave
        const [lista_roles, setListaRoles] = useState(getAllRegistries({ model: 'Rol' }).result);
        const code = useSelector((state) => state.productos.codigo);
        const [listaRol, setListaRol] = useState();
        const [codigo, setCodigo] = useState();
        const [errorListaRoles, setErrorListaRoles] = useState();
        const [errorCodigo, setErrorCodigo] = useState();

        useEffect(() => {
            // Actualizar el registro de alguna clave de un producto
            if (!isNull(clave)) {
                setListaRol(clave.rol.id);
                setCodigo(clave.codigo);
            }
        }, [clave]);

        useEffect(() => {
            const arre = [];
            // si el codigo no es unico de este producto
            if (code && !code.result) arre.push(messages.CLAVE_EXISTENTE);
            setErrorCodigo(arre);
        }, [code])

        useEffect(() => {
            // reducir los roles de la clave si ya existe una clave con ese rol
            let list = [];
            if (size(claves) > 0) {
                list = lista_roles.filter(function (lista) {
                    return isUndefined(find(claves, function (c) {
                        return c.rol.id === lista.id;
                    }));
                });
                if (!isNull(clave)) list.push(clave.rol);
                setListaRoles(list);
            }
        }, []);

        const onChange = (e, type) => {
            setCodigo(e.nativeEvent.text);
        };

        const isValidate = () => {
            return isValidateSelectListaRol() && isValidateFieldCodigo();
        };

        const isValidateSelectListaRol = () => {
            const arre = [];
            if (isUndefined(listaRol)) arre.push(messages.CAMPO_OBLIGATORIO);
            setErrorListaRoles(arre);
            return isEmpty(arre);
        };

        const isValidateFieldCodigo = () => {
            const arre = [];
            let value = codigo;
            if (isUndefined(value) || isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
            if (isEmpty(value)) arre.push(messages.CAMPO_OBLIGATORIO);
            dispatch(validarCodigoProducto(value, producto));
            setErrorCodigo(arre);
            return isEmpty(arre);
        }

        const renderListErrors = (campo) => {
            switch (campo) {
                case 'lista_rol':
                    return errorListaRoles && !isEmpty(errorListaRoles) ? errorListaRoles.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                    break;
                case 'codigo':
                    return errorCodigo && !isEmpty(errorCodigo) ? errorCodigo.map((item, index) => <Text key={index} style={styles.errors}>{item}</Text>) : null;
                    break;
                default:
                    return null;
            }
        }

        const save = () => {
            //constructor(id = 1, codigo = '', rol = new Rol(), producto = new Producto()) {
            if (isValidate()) {
                const rol = find(lista_roles, ['id', listaRol]);
                let c = new Clave();
                c.rol = rol;
                c.codigo = codigo;
                if (isNull(clave)) {
                    claves.push(c);
                } else {
                    const clavesUpdate = claves.map((item) => {
                        if (item.rol.id == c.rol.id) {
                            item = c;
                        }
                        return item;
                    })
                    setClaves(clavesUpdate);
                }
                setShowModalListaClave(false);
            }
        }

        return (
            <Modal isOpen={showModalListaClave} onClose={() => setShowModalListaClave(false)} size="lg" >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Claves del Producto</Modal.Header>
                    <Modal.Body>
                        <VStack width="90%" mx={3} py={2} space={2}>
                            <FormControl isRequired isInvalid={!isEmpty(errorListaRoles)}>
                                <FormControl.Label _text={{ bold: true }}>Lista de roles: </FormControl.Label>
                                <Select
                                    selectedValue={listaRol}
                                    minWidth={200}
                                    style={[styles.select, styles.generalFontSize]}
                                    accessibilityLabel="Selecciona un rol para la clave"
                                    placeholder="Selecciona un rol para la clave"
                                    onValueChange={(itemValue) => {
                                        setListaRol(itemValue);
                                        setErrorListaRoles([]);
                                    }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={5} />,
                                    }}
                                    mt={1}
                                >
                                    {
                                        lista_roles.map((item) =>
                                            <Select.Item key={item.id} label={item.nombre} value={item.id} />)
                                    }
                                </Select>
                                {!isEmpty(errorListaRoles) ?
                                    <FormControl.ErrorMessage>
                                        {renderListErrors('lista_rol')}
                                    </FormControl.ErrorMessage>
                                    :
                                    null
                                }
                            </FormControl>
                            <FormControl isRequired isInvalid={!isEmpty(errorCodigo)}>
                                <FormControl.Label _text={{ bold: true }}>Código: </FormControl.Label>
                                <Input
                                    value={codigo}
                                    type='numeric'
                                    keyboardType="numeric"
                                    placeholder='Código del producto...'
                                    style={[styles.input, styles.generalFontSize]}
                                    _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                                    onChange={(e) => onChange(e, 'codigo')}
                                    onBlur={() => {
                                        isValidateFieldCodigo();
                                        renderListErrors('codigo')
                                    }}
                                />
                                {!isEmpty(errorCodigo) ?
                                    <FormControl.ErrorMessage>
                                        {renderListErrors('codigo')}
                                    </FormControl.ErrorMessage>
                                    :
                                    null
                                }
                            </FormControl>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button
                                onPress={() => {
                                    setShowModalListaClave(false);
                                }}
                            >{labels.BTN_CERRAR_LABEL}</Button>
                            <Button
                                onPress={() => {
                                    save();
                                }}
                            >{labels.BTN_GUARDAR_LABEL}
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal >
        );
    }

    const removeImage = (item) => {
        setImageProducto(item);
        setIsOpen(!isOpen);
    };

    const handeDelete = (item) => {
        // Esto deberia cambiar si el requisitos es varias imagenes de un producto.
        setImageProducto([]);
        setImagesProducto([]);
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Title titulo={'Nuevo Producto'} navigation={props.navigation} />
            <KeyboardAwareScrollView>
                <VStack width="90%" mx={3} p={4} space={4}>
                    <FormControl isRequired isInvalid={!isEmpty(errorNombre)}>
                        <FormControl.Label _text={{ bold: true }}>Nombre: </FormControl.Label>
                        <Input
                            value={producto.nombre}
                            placeholder='Nombre del producto...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            InputRightElement={UploadImage()}
                            onChange={(e) => onChange(e, 'nombre')}
                            onBlur={() => {
                                isValidateFieldNombre();
                                renderListErrors('nombre')
                            }}
                        />
                        <HStack
                            flex={1}
                            justifyContent='center'
                        >
                            {map(imagesProducto, (image, index) => (
                                <Avatar
                                    key={index}
                                    style={styles.miniatureImage}
                                    source={{ uri: image }}
                                    onPress={() => removeImage(image)}
                                />
                            ))}
                        </HStack>
                        {!isEmpty(errorNombre) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('nombre')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorLinea)}>
                        <FormControl.Label _text={{ bold: true }}>Linea: </FormControl.Label>
                        <Select
                            selectedValue={linea}
                            minWidth={200}
                            style={[styles.select, styles.generalFontSize]}
                            accessibilityLabel="Selecciona la linea del producto"
                            placeholder="Selecciona la linea del producto"
                            onValueChange={(itemValue) => {
                                setLinea(itemValue);
                                setErrorLinea([]);
                            }}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt={1}
                        >
                            {
                                lineas.map((item) =>
                                    <Select.Item key={item.id} label={item.nombre} value={item.id} />)
                            }
                        </Select>
                        {!isEmpty(errorLinea) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('linea')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorUnidadMedida)}>
                        <FormControl.Label _text={{ bold: true }}>Unidad de Medida: </FormControl.Label>
                        <Input
                            value={producto.unidad_medida}
                            placeholder='Unidad de medida del producto...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'unidad_medida')}
                            onBlur={() => {
                                isValidateFieldUnidadMedida();
                                renderListErrors('unidad_medida');
                            }}
                        />
                        {!isEmpty(errorUnidadMedida) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('unidad_medida')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorUnidadCompra)}>
                        <FormControl.Label _text={{ bold: true }}>Unidad de Compra: </FormControl.Label>
                        <Input
                            value={producto.unidad_compra}
                            placeholder='Unidad de compra del producto...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'unidad_compra')}
                            onBlur={() => {
                                isValidateFieldUnidadCompra();
                                renderListErrors('unidad_compra');
                            }}
                        />
                        {!isEmpty(errorUnidadCompra) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('unidad_medida')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorContenido)}>
                        <FormControl.Label _text={{ bold: true }}>Contenido: </FormControl.Label>
                        {//https://stackoverflow.com/questions/63126430/nativebase-react-native-why-cant-i-pass-a-number-on-an-input
                        }
                        <Input
                            value={producto.contenido === 0 ? '' : producto.contenido.toString()}
                            type='numeric'
                            keyboardType="numeric"
                            placeholder='Contenido del producto...'
                            style={[styles.input, styles.generalFontSize]}
                            _focus={{ backgroundColor: colors.BACKGROUND_INPUT_COLOR, borderRadius: 15 }}
                            onChange={(e) => onChange(e, 'contenido')}
                            onBlur={() => {
                                isValidateFieldContenido();
                                renderListErrors('contenido');
                            }}
                        />
                        {!isEmpty(errorContenido) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('contenido')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorPreciosVenta)}>
                        <FormControl.Label _text={{ bold: true }}>Precios de Venta: </FormControl.Label>
                        {
                            preciosVenta.map((item) => {
                                return renderDetailPreciosVenta(item);
                            })
                        }
                        {
                            renderFooterPrecios()
                        }
                        {!isEmpty(errorPreciosVenta) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('precios_venta')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorClaves)}>
                        <FormControl.Label _text={{ bold: true }}>Claves del producto: </FormControl.Label>
                        {
                            claves.map((item) => {
                                return renderDetailClaves(item);
                            })
                        }
                        {
                            renderFooterClaves()
                        }
                        {!isEmpty(errorClaves) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('claves')}
                            </FormControl.ErrorMessage>
                            :
                            null
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={!isEmpty(errorProveedor)}>
                        <FormControl.Label _text={{ bold: true }}>Proveedor: </FormControl.Label>
                        <Select
                            selectedValue={proveedor}
                            minWidth={200}
                            style={[styles.select, styles.generalFontSize]}
                            accessibilityLabel="Selecciona el proveedor del producto"
                            placeholder="Selecciona el proveedor del producto"
                            onValueChange={(itemValue) => {
                                setProveedor(itemValue);
                                setErrorProveedor([]);
                            }}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt={1}
                        >
                            {
                                proveedores.map((item) =>
                                    <Select.Item key={item.id} label={item.nombre} value={item.id} />)
                            }
                        </Select>
                        {!isEmpty(errorProveedor) ?
                            <FormControl.ErrorMessage>
                                {renderListErrors('proveedor')}
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
                    <FormPrecioVenta
                        showModalListaPrecio={showModalListaPrecio}
                        setShowModalListaPrecio={setShowModalListaPrecio}
                        preciosVenta={preciosVenta}
                        setPreciosVenta={setPreciosVenta}
                        precio_venta={precioVenta}
                    />
                    <FormClaves
                        showModalListaClave={showModalListaClave}
                        setShowModalListaClave={setShowModalListaClave}
                        claves={claves}
                        setClaves={setClaves}
                        clave={clave}
                        producto={producto}
                    />
                    <Center>
                        <AlertDialog
                            motionPreset="fade"
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialog.Content backgroundColor={colors.QUATERNARY_COLOR}>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>{messages.REGISTRO_ELIMINAR_CONFIRM}</AlertDialog.Header>
                                <AlertDialog.Body>
                                    {messages.REGISTRO_ELIMINAR_DETAIL}
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button bgColor={colors.QUINARY_COLOR} onPress={onClose}>
                                        No
                                    </Button>
                                    <Button bgColor={colors.PRIMARY_COLOR} ml={3} onPress={() => handeDelete()}>
                                        {' Si '}
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>
                    </Center>
                </VStack>
            </KeyboardAwareScrollView>
        </>
    )
}

