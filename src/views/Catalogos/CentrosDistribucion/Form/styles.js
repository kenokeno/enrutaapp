import { StyleSheet } from "react-native";
import { borderRadius } from "styled-system";
import colors from './../../../../constants/colors';

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
})