import { StyleSheet } from "react-native";
import color from "../../constants/color";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  Logo1: {
    fontSize: 35,
    marginHorizontal: "5%",
    marginTop: 10,
    color: color[5],
  },
  Logo2: {
    fontSize: 30,
    marginHorizontal: "5%",
    color: color[3],
  },
  Underline: {
    borderBottomColor: color[3],
    borderBottomWidth: 4,
    borderRadius: 10,
    marginLeft: "5%",
    marginRight: 100,
    marginTop: 4,
  },
  FormText: {
    fontSize: 20,
    marginLeft: "5%",
    marginTop: 20,
    color: color[1],
  },
  TextInput: {
    marginHorizontal: "5%",
    marginTop: 18,
  },
  TextInput2: {
    width: "40%",
    marginHorizontal: "5%",
    marginTop: 18,
  },
  CustomBtnTxt: {
    marginHorizontal: "5%",
    marginTop: 18,
  },
  rowFlex: {
    flexDirection: "row-reverse",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
});
