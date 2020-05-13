import { StyleSheet, Dimensions } from "react-native";
import color from "../../../constants/color";

const dim = Dimensions.get("window");
const width = dim.width;
const height = dim.height;

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color[5],
        padding: viewPadding,
        paddingTop: 20,
    },
    list: {
        width: "100%",
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
    },
    hr: {
        height: 1,
        backgroundColor: color[3],
    },
    listItemCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
        width: "100%",
    },
    hideInput: {
        height: 50,
        width: "30%",
        paddingHorizontal: "5%",
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
    },
    createListCon: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    createListBtn: {},
    emptyScreen: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});
