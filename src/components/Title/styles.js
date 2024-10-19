import { StyleSheet } from "react-native";
import colors from './../../constants/colors';

export const styles = StyleSheet.create({
    linearGradient: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderEndColor: '#000000',
    },
    heading: {
        textAlign: "left",
        color: '#ffffff',
        fontSize: 20,
    },
    headingForm: {
        textAlign: "left",
        color: '#000000',
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