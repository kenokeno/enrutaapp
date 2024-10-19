import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { InventaryMobile, DeliveryCar } from './../../components/Icons';

import colors from './../../constants/colors';
import Ruta from './../Ruta';
import Bordo from './../Bordo';

export default function Inicio({ navigation }) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'A Bordo', icon: <InventaryMobile width="512" heigth="512" /> },
        { key: 'second', title: 'Ruta', icon: <DeliveryCar width="512" heigth="512" /> },
    ]);

    const renderScene = SceneMap({
        first: () => <Bordo navigation={navigation} />,
        second: () => <Ruta navigation={navigation} />,
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
                tabBarPosition="bottom"
                initialLayout={{ width: layout.width }}
            />
        </>
    );
}
