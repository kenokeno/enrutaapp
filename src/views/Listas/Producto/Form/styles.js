import { StyleSheet } from "react-native";
import { borderRadius } from "styled-system";
import colors from '../../../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        //flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        width: '90%',
        height: "10%"
    },
    containerMap: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    icon: {
        marginHorizontal: 5,
    },
    generalFontSize: {
        fontSize: 14,
    },
    input: {
        backgroundColor: colors.BACKGROUND_INPUT_COLOR,
        textShadowColor: colors.PRIMARY_FONT_COLOR,
        borderRadius: 15,
    },
    select: {
        backgroundColor: colors.BACKGROUND_INPUT_COLOR,
        textShadowColor: colors.PRIMARY_FONT_COLOR,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    text: {
        width: '30%',

    },
    buttonContainer: {
        width: '25%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: colors.PRIMARY_FONT_COLOR,
    },
    errors: {
        color: colors.DANGER_COLOR,
        fontSize: 12
    },
    viewImage: {
        flexDirection: 'row',
        margin: 20,
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureImage: {
        width: 70,
        height: 70,
        margin: 10,
    }
})