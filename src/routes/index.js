import React, { useState, useEffect } from 'react';
import { Box, Pressable, VStack, Text, HStack, Divider, Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from './../constants/colors';
import { getItem } from './../api';
//https://oblador.github.io/react-native-vector-icons/
// https://blog.crowdbotics.com/how-to-create-a-custom-tab-bar-in-react-native/
import menus from './../constants/menus'
import Routes from './../routes/stackRoutes';
import paths from './../constants/paths';
import { createRegistros } from './../tests';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//https://javascript.tutorialink.com/react-navigation-v5-hide-bottom-tab-in-specific-screens/
//https://stackoverflow.com/questions/51995312/combine-createstacknavigator-and-createbottomtabnavigator
const TabNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY_COLOR,
                tabBarActiveBackgroundColor: Colors.BACKGROUND_COLOR,
                tabBarInactiveBackgroundColor: Colors.BACKGROUND_COLOR,
                tabBarInactiveTintColor: Colors.SECONDARY_FONT_COLOR,
            }}
        >
            <Tab.Screen
                name={paths.BORDO}
                component={TabBordoStackNavigator}
                options={{
                    title: menus.A_BORDO,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="inventory" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={paths.RUTA}
                component={TabRutaStackNavigator}
                options={{
                    title: menus.EN_RUTA,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="truck-fast" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const getIcon = (screenName) => {
    switch (screenName) {
        case 'Inicio':
            return "home"
        default:
            return undefined
    }
}

function CustomDrawerContent(props) {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        let user = await getItem('@user_info');
        user = JSON.parse(user);
        setUserInfo(user);
    }

    return (
        <DrawerContentScrollView {...props} safeArea>
            <VStack space={6} my={2} mx={1}>
                <Box px={4}>
                    <Text bold color="gray.700">Vendedor</Text>
                    <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>{userInfo ? userInfo.nombre + '/' + userInfo.apellido_paterno + '/' + userInfo.apellido_materno : null}</Text>
                </Box>
                <VStack divider={<Divider />} space={4}>
                    <VStack space={3}>
                        {props.state.routeNames.map((name, index) => {
                            return name === menus.PRODUCTO || name === menus.CLIENTE ? null :
                                <Pressable
                                    key={index}
                                    px={5}
                                    py={3}
                                    rounded="md"
                                    bg={index === props.state.index ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
                                    onPress={(event) => {
                                        props.navigation.navigate(name, { navigation: props.navigation });
                                    }}
                                >
                                    <HStack space={7} alignItems="center">
                                        <Icon
                                            color={index === props.state.index ? 'primary.500' : 'gray.500'}
                                            size={5} as={<MaterialCommunityIcons name={getIcon(name)} />} />
                                        <Text fontWeight={500} color={index === props.state.index ? 'primary.500' : 'gray.700'}>
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                        })}
                    </VStack>
                    <VStack space={5}>
                        <Text fontWeight={500} fontSize={14} px={5} color="gray.500">Listas</Text>
                        <VStack space={3}>
                            <Pressable
                                px={5}
                                py={3}
                                onPress={(event) => {
                                    props.navigation.navigate(menus.PRODUCTO);
                                }}
                            >
                                <HStack space={7} alignItems="center">
                                    <Icon
                                        color='gray.500'
                                        size={5} as={<MaterialCommunityIcons name='archive' />} />
                                    <Text color='gray.700' fontWeight={500}>
                                        Productos
                                    </Text>
                                </HStack>
                            </Pressable>
                            <Pressable
                                px={5}
                                py={3}
                                onPress={(event) => {
                                    props.navigation.navigate(menus.CLIENTE);
                                }}
                            >
                                <HStack space={7} alignItems="center">
                                    <Icon
                                        color='gray.500'
                                        size={5} as={<MaterialCommunityIcons name='badge-account' />} />
                                    <Text color='gray.700' fontWeight={500}>
                                        Clientes
                                    </Text>
                                </HStack>
                            </Pressable>
                            <Pressable
                                px={5}
                                py={3}
                                onPress={() => createRegistros()}
                            >
                                <HStack space={7} alignItems="center">
                                    <Icon
                                        color='gray.500'
                                        size={5} as={<MaterialCommunityIcons name='test-tube' />} />
                                    <Text fontWeight={500} color='gray.700'>
                                        Test
                                    </Text>
                                </HStack>
                            </Pressable>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView >
    );
}
//https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
//https://snack.expo.dev/@unionnetzym/react-navigation-drawer-navigator-nested-inside-tab-navigator
const DrawerNavigator = () => {
    return (
        <Box safeArea flex={1}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name={menus.MAIN_TAB} component={TabNavigator} options={{
                    headerShown: false,
                }} />
                <Drawer.Screen name={menus.PRODUCTO} component={ProductosStackNavigator} options={{
                    headerShown: false,
                }} />
                <Drawer.Screen name={menus.CLIENTE} component={ClienteStackNavigator} options={{
                    headerShown: false,
                }} />
            </Drawer.Navigator>
        </Box>
    );
};

const TabBordoStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.BORDO_HOME}
                component={Routes.Bordo}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const TabRutaStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.RUTA_HOME}
                component={Routes.Ruta}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.RECIBIR_PRODUCTO}
                component={RecibirProductosStackNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const ClienteStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.CLIENTE_LOADING}
                component={Routes.Cliente}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.CLIENTE_INDEX}
                component={Routes.ClientesIndex}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.CLIENTE_FORM}
                component={Routes.ClienteForm}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const ProductosStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.PRODUCTO_LOADING}
                component={Routes.Producto}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.PRODUCTO_INDEX}
                component={Routes.ProductoIndex}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.PRODUCTO_FORM}
                component={Routes.ProductoForm}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const RecibirProductosStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.RECIBIR_PRODUCTO_LOADING}
                component={Routes.RecibirProducto}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.RECIBIR_PRODUCTO_INDEX}
                component={Routes.RecibirProductoIndex}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={paths.RECIBIR_PRODUCTO_FORM}
                component={Routes.RecibirProductoForm}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
/*

******** OTRA NAVEGACION ++++++++
const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    );
  }*/

export default function AppStack() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}