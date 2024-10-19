import { StyleSheet } from "react-native";
import colors from './../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        backgroundColor: 'white',
    },
    pressableSwipeList: {
        alignItems: 'center',
        borderColor: colors.PRIMARY_COLOR,//separador
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: 70,
    },
    textSwipeList: {
        marginLeft: 25,
        marginRight: 25,
    },
    pressableHiddenSwipeList: {
        justifyContent: "center",
        borderColor: colors.PRIMARY_COLOR,//separador
        borderWidth: 1,
    },
    linearGradient: {
        //flex: 1,
        //height: 85,
        //paddingLeft: 15,
        //paddingRight: 15,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderEndColor: '#000000',
    },
    heading: {
        textAlign: "left",
        color: '#ffffff',
        fontSize: 24,
    },
    buttonAddStyle: {
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        borderRadius: 10,
        alignSelf: 'flex-end',
    }
})