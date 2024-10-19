import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import { Divider, FlatList, Text, Center } from 'native-base';
import filter from 'lodash.filter'

import SearchBar from './../SearchBar'
import { styles } from './styles'

export default function MyFlatList({ props }) {
    const [dataList, setDataList] = useState(props.datas);
    const [dataListFull] = useState(dataList);

    const handleSearch = (text) => {
        const data = filter(dataListFull, ceDist => {
            return contains(ceDist, text);
        })
        setDataList(data);
    }

    const contains = ({ nombre, ciudad, direccion }, query) => {
        if (query === ""
            || nombre.includes(query)
            || ciudad.includes(query)
            || direccion.includes(query)) {
            return true
        }
        return false
    }

    /*
    const renderDatail = ({ item }) => {
        let cd = new CentroDistribucionModel(item['id'], item['nombre'], item['ciudad'], item['direccion'])
        return (
            < CentroDistribucionDetail centroDistribucion={cd} />
        )
    }*/

    const renderSeparator = () => {
        return (
            <Divider my={0.5} />
        )
    }

    const renderFooter = () => {
        if (!dataList || dataList == undefined || dataList.length == 0)
            return <Center><Text fontSize="lg">Agregar registros</Text></Center >
        else {
            return <View></View>
        }
    }

    return (
        <SafeAreaView>
            {//<SearchBar handleSearch={handleSearch} />
            }
            <FlatList
                data={dataList}
                renderItem={props.renderDatail}
                keyExtractor={(ceDist) => ceDist.id}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
}