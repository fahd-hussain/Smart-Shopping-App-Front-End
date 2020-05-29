import { StyleSheet, Dimensions } from "react-native";

const dim = Dimensions.get("window");
const width = dim.width;
const height = dim.height;

import color from "../../../constants/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mapScreen: {
        marginLeft: 5,
        marginTop: 5,
        width: width - 10,
        height: height - 10,
        backgroundColor: color[1],
    },
    circle: {
        position: "absolute",
        width: 10,
        height: 10,
        // left: ele.column * 50,
        // top: ele.row * 50,
        borderRadius: 100 / 2,
        backgroundColor: color.success,
    },
    rectangle: {
        position: "absolute",
        width: 100 * 2,
        height: 100,
        backgroundColor: "red",
    },
});
