import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ABordo from './Bordo';
import EnRuta from './Bordo';
import { InventaryMobile, DeliveryCar } from './../../components/Icons'
import colors from './../../constants/colors';
import lables from './../../constants/labels';
import labels from './../../constants/labels';

export default (props) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: labels.ABORDO_TITLE, icon: <InventaryMobile width="512" heigth="512" /> },
        { key: 'second', title: labels.EN_RUTA, icon: <DeliveryCar width="512" heigth="512" /> },
    ]);

    const renderScene = SceneMap({
        first: ABordo,
        second: EnRuta,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.INDICATOR_COLOR }}
            style={{ backgroundColor: colors.SECONDARY_COLOR }}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            //tabBarPosition="bottom"
            initialLayout={{ width: layout.width }}
        />
    );
}