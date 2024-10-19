import { StyleSheet } from "react-native";
import colors from './../../constants/colors';

export const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#FFF",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: colors.PRIMARY_COLOR,
        textTransform: "uppercase",
        marginTop: 10,
    }
})