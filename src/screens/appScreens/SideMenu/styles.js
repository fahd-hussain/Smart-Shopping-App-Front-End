import { StyleSheet } from "react-native";

import color from "../../../constants/color";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color[4],
    },
    displayPictureContainer: {
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    displayPictureText: { 
        paddingTop: 10 
    },
});
