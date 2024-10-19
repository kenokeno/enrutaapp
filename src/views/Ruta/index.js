import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import InicioView from './../Ruta/Inicio';
import RecorridoView from './../Ruta/Recorrido';
import FinView from './../Ruta/Fin';
import { InventaryMobile, DeliveryCar } from './../../components/Icons';
import colors from './../../constants/colors';

export default ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Inicio', icon: <InventaryMobile width="512" heigth="512" /> },
        { key: 'second', title: 'Recorrido', icon: <DeliveryCar width="512" heigth="512" /> },
        { key: 'third', title: 'Fin', icon: <DeliveryCar width="512" heigth="512" /> },
    ]);

    const renderScene = SceneMap({
        first: () => <InicioView navigation={navigation} />,
        second: RecorridoView,
        third: FinView,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.PRIMARY_COLOR }}
            style={{ backgroundColor: colors.BACKGROUND_COLOR }}
            inactiveColor={colors.SECONDARY_FONT_COLOR}
            activeColor={colors.PRIMARY_COLOR}
        />
    );

    return (
        <>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                //tabBarPosition="bottom"
                initialLayout={{ width: layout.width }}
            />
        </>
    );
}