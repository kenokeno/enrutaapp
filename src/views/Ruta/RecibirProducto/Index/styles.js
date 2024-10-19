import { Dimensions, StyleSheet } from 'react-native';

import colors from './../../../../constants/colors';

const screenHeight = Dimensions.get('window');
//const heightTabBar = 410;
const box_height = (screenHeight.height) / screenHeight.scale;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    generalFontSize: {
        fontSize: 14,
    },
    icon: {
        marginHorizontal: 5,
    },
    pressableSwipeList: {
        alignItems: 'center',
        borderColor: colors.PRIMARY_COLOR,//separador
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: 70,
    },
});