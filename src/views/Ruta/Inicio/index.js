import React from 'react';
import {
    Flex,
    Box,
    Pressable,
    ScrollView,
    Center,
    Text,
} from "native-base"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { useNavigation } from '@react-navigation/native';

import paths from './../../../constants/paths';

import { CashRegister, LittleMap, Map, AddInventary, Odometer } from './../../../components/Icons';

export default ({ navigation }) => {

    const goToScreenRecibirProducto = (item) => {
        const { navigate } = navigation;
        //console.log("Navigate: ", navigate);
        navigate(paths.RECIBIR_PRODUCTO);
    }

    return (
        <ScrollView>
            <Box py={4}>
                <Flex p={6} direction="row" justify="space-evenly">
                    <Center p={2}>
                        <CashRegister width="120" heigth="120" />
                        <Text>Dinero</Text>
                    </Center>
                    <Center py={2} pl={6}>
                        <Map width="70" heigth="70" />
                        <Text>Visitas</Text>
                    </Center>
                </Flex>
                <Flex p={6} direction="row" justify="space-evenly">
                    <Pressable
                        onPress={() => goToScreenRecibirProducto()}
                    >
                        <Center p={2}>
                            <AddInventary width="70" heigth="70" />
                            <Text>Recibir Producto</Text>
                        </Center>
                    </Pressable>
                    <Center p={2}>
                        <Odometer width="250" heigth="250" />
                        <Text>Odometro</Text>
                    </Center>
                </Flex>
            </Box>
        </ScrollView>
    );
}