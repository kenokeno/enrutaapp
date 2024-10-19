import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native'
import {
    Divider, Pressable,
    FlatList, Text, Box, Stack, HStack,
    VStack, Spacer, Input, Heading,
    Center, Button, Icon, Checkbox, Modal
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash.filter';
import { sortBy, clone } from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './styles';
//import { getProductos, deleteProducto } from './../../../../actions/productos';
import paths from './../../../../constants/paths';
import labels from './../../../../constants/labels';
import SearchBar from './../../../../components/SearchBar';
import colors from './../../../../constants/colors';
import Inventario from './../../../../models/Ruta/InventarioModel'
import Producto from './../../../../models/Listas/ProductoModel';
import Title from './../../../../components/Title';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { isTerminatorless } from '@babel/types';

export default function RecibirProductosIndex({ navigation }) {
    const dispatch = useDispatch();
    const [inventario, setInventario] = useState([]);
    const [showModalBuscarProducto, setShowModalBuscarProducto] = useState(false);

    const handleChangeCantidad = (event) => {
        console.log("Event: ", event.target.value);

    };

    const handleChangeUnidad = (event) => {
        console.log("Event: ", event.target.value);
    };

    const handleRemoveStock = (item) => {
        console.log("Remove flatlist: ", item.id);
        //const list = inventario.filter(stock => stock.id !== item.id);
        //console.log("List: ", list);
        setInventario(inventario.filter(stock => stock.id !== item.id));
    }

    const renderInventario = ({ item }) => {
        console.log("Inventario: ", item);
        if (item) {
            return (
                <Box
                    _dark={{
                        borderColor: "gray.600",
                    }}
                    borderColor="coolGray.200"
                    alignItems='flex-end'
                    bg={colors.TERTIARY_COLOR}
                    pl="4"
                    pr="5"
                    py="2"
                    rounded={20}
                >
                    <HStack space={2} justifyContent="space-between">
                        <Center>
                            <Icon
                                onPress={() => handleRemoveStock(item)}
                                size='sm'
                                mr={6}
                                color="gray.400"
                                as={<FontAwesome name='remove' color="red" size={60} />}
                            />
                        </Center>
                        <Center>
                            <VStack space={2}>
                                <Text
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    color="coolGray.800"
                                    bold
                                    fontSize={12}
                                >
                                    {item.id} - {item.producto.nombre} '['{item.producto.unidad_medida}']'
                                </Text>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontSize={12}
                                >
                                    {item.producto.claves[0].codigo}
                                </Text>
                            </VStack>
                        </Center>
                        <Spacer />
                        <Input
                            type='numeric'
                            keyboardType='numeric'
                            size='xs'
                            style={{ backgroundColor: colors.BACKGROUND_COLOR }}
                            _focus={{ backgroundColor: colors.BACKGROUND_COLOR }}
                            onChange={(item) => handleChangeCantidad(item)}
                        />
                        <Input
                            size="xs"
                            isDisabled={true}
                            _disabled={{
                                backgroundColor: colors.BACKGROUND_COLOR
                            }}
                        />
                    </HStack>
                </Box >);
        }
    }

    function Footer() {
        return (
            <VStack>
                <Box style={{ backgroundColor: colors.TERTIARY_COLOR }}>
                    <HStack width='100%' alignItems='center' justifyContent="space-between" pt={2}>
                        <View paddingLeft={20}>
                            <FontAwesome
                                name='barcode'
                                style={styles.icon}
                                color={colors.SECONDARY_COLOR}
                                size={40}
                                onPress={() => console.log("Ok")
                                }
                            />
                        </View>
                        <View space={3} alignItems='flex-start' paddingRight={50}>
                            <Text fontSize={14} color={colors.SECONDARY_COLOR} >Unidades  :</Text>
                            <Text fontSize={14} color={colors.SECONDARY_COLOR}>Cajas         :</Text>
                        </View>
                    </HStack>
                    <Center py={2}>
                        <Button.Group variant="gost" space={2}>
                            <Button
                                style={{ borderColor: colors.PRIMARY_COLOR }}
                                _text={{
                                    color: colors.PRIMARY_COLOR
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                style={{ borderColor: colors.PRIMARY_COLOR }}
                                _text={{
                                    color: colors.PRIMARY_COLOR
                                }}
                            >
                                Finalizar
                            </Button>
                        </Button.Group>
                    </Center>
                </Box >
            </VStack>
        );
    }

    const renderSeparator = () => {
        return (
            <Divider my={0.5} />
        );
    }

    const addProducto = () => {
        console.log("Agregar producto");
        setShowModalBuscarProducto(true);
    }

    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    /************************MODAL PRECIOS************************* */
    /************************************************************** */
    /************************************************************** */
    /************************************************************** */
    function FormBuscarProducto(props) {
        const {
            showModalBuscarProducto,
            setShowModalBuscarProducto,
            inventario,
            setInventario
        } = props;
        const response = useSelector((state) => { return state.productos.productos });
        const [dataList, setDataList] = useState(response.result);
        const [dataListFull] = useState(dataList);
        const [seleccionados, setSeleccionados] = useState([]);
        const [seleccionar, setSeleccionar] = useState(false);

        useEffect(() => {
            console.log("Inventario: ", inventario);
        }, [inventario])

        const handleSearch = (text) => {
            const data = filter(dataListFull, item => {
                return contains(item, text);
            })
            setDataList(data);
        }

        const contains = ({ nombre, claves, unidad_medida }, query) => {
            if (query === ""
                || nombre.includes(query)
                || claves[0].codigo.includes(query)
                || (claves[1] && claves[1].codigo.includes(query))
                || unidad_medida.includes(query)) {
                return true
            }
            return false
        }

        const generarID = () => {
            if (inventario.length == 0)
                return 1;
            let sortRegistries = sortBy(inventario, function (o) { return o.id; });
            let firstRegistry = sortRegistries[inventario.length - 1];
            return firstRegistry['id'] + 1;
        }

        const handleSeleccionado = (item) => {
            console.log("Pressed: ", item);
            const stock = new Inventario();
            stock.id = generarID();
            stock.producto = item;
            setInventario(inventario => [...inventario, stock]);
            setShowModalBuscarProducto(false);
        }

        const handleSeleccionados = () => {
            /*const list = filter(dataList, item => {
                return item.activo;
            });*/
            console.log("Seleccionados: ", seleccionados);
            let idGenerado = generarID();
            let list = [];
            list = clone(inventario);
            seleccionados.forEach(id => {
                dataListFull.forEach(producto => {
                    if (producto.id === id) {
                        const stock = new Inventario();
                        stock.id = idGenerado++;
                        stock.producto = producto;
                        list.push(stock);
                    }
                });
            });
            setInventario(list);
            setShowModalBuscarProducto(false);
        }

        const renderProductos = (item) => {
            //let pv = new PrecioVenta(item['id'], item['producto'], item['lista_precios'], item['precio_c_impuesto'], item['precio_s_impuesto'])
            return (
                <Box key={item.id} px={2} py={0.5} bg={colors.BACKGROUND_COLOR} width='100%'>
                    <Pressable
                        onPress={() => handleSeleccionado(item)}
                        style={styles.pressableSwipeList}
                        bg={colors.TERTIARY_COLOR}
                        borderRadius={8}
                        disabled={seleccionar}
                        _pressed={{
                            bg: colors.PRIMARY_COLOR
                        }}
                        onLongPress={() => setSeleccionar(true)}
                    >
                        <Box p="2">
                            <Stack space={2}>
                                <Heading size="sm" noOfLines={2}>
                                    {item.nombre} [{item.unidad_medida}]
                                </Heading>
                                <HStack space={2} alignItems="center">
                                    <VStack px={1}>
                                        <Text style={styles.generalFontSize} color="gray.700">Código: {item.claves[0].codigo}</Text>
                                    </VStack>
                                    <HStack
                                        flex={1}
                                        justifyContent='flex-end'
                                        width='100%'>
                                        {seleccionar ?
                                            <Checkbox
                                                aria-label='Seleccionar'
                                                value={item.id}
                                                colorScheme="orange"
                                            />
                                            :
                                            null
                                        }
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    </Pressable>
                </Box >
            )
        }

        return (
            <Modal isOpen={showModalBuscarProducto} onClose={() => setShowModalBuscarProducto(false)} size="lg" >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Agregar producto</Modal.Header>
                    <Modal.Body >
                        < SearchBar handleSearch={handleSearch} />
                        <Checkbox.Group
                            defaultValue={seleccionados}
                            onChange={(values) => {
                                setSeleccionados(values || [])
                            }}
                        >
                            {
                                dataList.map((item) => {
                                    return renderProductos(item);
                                })
                            }
                        </Checkbox.Group>
                    </Modal.Body>

                    {seleccionar ?
                        <Modal.Footer>
                            <Button variant='gost'
                                onPress={() => {
                                    setSeleccionar(false);
                                }}
                            >
                                <Text color={colors.PRIMARY_COLOR}>{labels.BTN_CANCELAR_LABEL}</Text></Button>
                            <Button
                                variant='gost'
                                onPress={() => {
                                    handleSeleccionados();
                                }}
                            >
                                <Text color={colors.PRIMARY_COLOR}>{labels.BTN_SELECCIONAR_LABEL}</Text>
                            </Button>
                        </Modal.Footer>
                        :
                        <Modal.Footer>
                            <Button variant='gost'
                                onPress={() => {
                                    setShowModalBuscarProducto(false);
                                }}
                            >
                                <Text color={colors.PRIMARY_COLOR}>{labels.BTN_CERRAR_LABEL}</Text></Button>
                        </Modal.Footer>
                    }

                </Modal.Content>
            </Modal >
        );
    }

    return (
        <SafeAreaView>
            <Title titulo='Recibir Producto' new={addProducto} />
            <VStack space={2} justifyContent="space-between" height='100%'>
                <Stack height='62%'>
                    <HStack py={4} px={2} paddingRight={6} space={2} alignSelf='flex-end'>
                        <Heading size='xs'>Cantidad</Heading>
                        <Heading size='xs'>Unidades</Heading>
                    </HStack>
                    <FlatList
                        data={inventario}
                        renderItem={renderInventario}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={renderSeparator}
                    //ListFooterComponent={renderFooter}
                    />
                </Stack>
                <Stack alignSelf='flex-end' width='100%' height='38%'>
                    <Footer />
                </Stack>
                <FormBuscarProducto
                    showModalBuscarProducto={showModalBuscarProducto}
                    setShowModalBuscarProducto={setShowModalBuscarProducto}
                    inventario={inventario}
                    setInventario={setInventario}
                />
            </VStack>
        </SafeAreaView >
    );
}