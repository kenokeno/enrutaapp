import React, { useState, useEffect } from 'react';
import { AlertDialog, Box, Text, Button, Pressable, HStack, Center, View } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import filter from 'lodash.filter';
import { useIsFocused } from '@react-navigation/native';
import { isEmpty, isNull, isObject, isArray, isUndefined } from 'lodash';

import { styles } from './styles';
import { TrashIcon, PecilIcon } from './../Icons';
import SearchBar from './../../components/SearchBar';
import messages from './../../constants/messages';
import colors from './../../constants/colors';
import Title from './../../components/Title';

export default function SwipeList(props) {
    const [listData, setListData] = useState(props.dataSet);
    const [listDataFull, setListDataFull] = useState(props.dataSet);
    const [isOpen, setIsOpen] = useState(false);
    const [rowM, setRowM] = useState();
    const [item, setItem] = useState();
    const cancelRef = React.useRef();
    const [titulo] = useState(props.titulo ? props.titulo : null);

    const addNew = () => {
        if (props.new === undefined) console.log('Función NUEVO no especificada');
        return props.new();
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const newDataFull = [...listDataFull];
        const prevIndex = listData.findIndex(item => item.id === rowKey);
        const prevIndexFull = listDataFull.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        newDataFull.splice(prevIndexFull, 1);
        setListData(newData);
        setListDataFull(newDataFull);
    };

    const handleSearch = (text) => {
        const data = filter(listDataFull, data => {
            return contains(data, text);
        })
        setListData(data);
    }

    const contains = (data, query) => {
        if (query === "") return true;

        for (const property in data) {
            const dato = stringifyObject(data[property]);
            if (isUndefined(dato)) return false;
            if (dato.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }

        return false
    }
    //https://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value
    function stringifyObject(obj) {
        if (isNull(obj)) {
            return;
        }
        if (isArray(obj) || !isObject(obj)) {
            return obj.toString()
        }
        var seen = [];
        return JSON.stringify(
            obj,
            function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
                    seen.push(val)
                }
                return val
            }
        );
    }

    const onClose = () => setIsOpen(false);

    const deleteShow = (rowMap, item) => {
        setRowM(rowMap);
        setItem(item);
        setIsOpen(!isOpen);
    }

    const handeDelete = (item) => {
        deleteRow(rowM, item.id);
        props.delete(item);
        setIsOpen(!isOpen);
    }

    const renderItem = ({ item, index }) => (
        <Box px={2} py={0.5} bg={colors.BACKGROUND_COLOR}>
            <Pressable
                style={styles.pressableSwipeList}
                bg={colors.TERTIARY_COLOR}
                borderRadius={8}
                _pressed={{
                    bg: colors.PRIMARY_COLOR
                }}
            >
                <View style={styles.textSwipeList}>{props.renderDetail(item)}
                </View>
            </Pressable>
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack
            flex={1}
            pr={2}
            alignContent='flex-end'
            alignSelf='flex-end'
            backgroundColor={colors.TERTIARY_COLOR}
        >
            <Pressable
                onPress={() => deleteShow(rowMap, data.item)}
                px={3}
                bg={colors.SEXTENARIO_COLOR}
                borderLeftRadius={8}
                style={styles.pressableHiddenSwipeList}
                _pressed={{
                    opacity: 0.5
                }}
            >
                <TrashIcon width="560" heigth="560" />
            </Pressable>
            <Pressable
                onPress={() => props.update(data.item)}
                px={3}
                bg={colors.QUATERNARY_COLOR}
                borderRightRadius={8}
                style={styles.pressableHiddenSwipeList}
                _pressed={{
                    opacity: 0.5
                }}
            >
                <PecilIcon width="560" heigth="560" />
            </Pressable>
        </HStack>
    );

    return (
        <Box textAlign="center" bg={colors.BACKGROUND_COLOR} flex={1} safeAreaTop>
            {
                !isNull(titulo) ? <Title titulo={titulo} new={addNew} /> : null
            }
            < SearchBar handleSearch={handleSearch} />
            {
                isEmpty(listData) || isNull(listData) ?
                    <Center><Text fontSize="xl">{messages.LISTA_VACIA}</Text></Center>
                    :
                    <Box bg={colors.BACKGROUND_COLOR} safeArea flex={1}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={props.new ? renderHiddenItem : null}
                            rightOpenValue={-124}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
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
                                        <Button bgColor={colors.PRIMARY_COLOR} ml={3} onPress={() => handeDelete(item)}>
                                            {' Si '}
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                        </Center>
                    </Box>
            }
        </Box >
    );
}