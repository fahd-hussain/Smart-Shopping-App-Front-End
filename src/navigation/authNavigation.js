import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// Local Import
import LoginScreen from "../screens/mainScreen/LoginScreen";
import SignupScreen from "../screens/mainScreen/SignupScreen";
import MainScreen from "../screens/mainScreen/MainScreen";

const headerOption = {
    headerShown: false,
};

const Login_Signup = createBottomTabNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
  }
);

const Authentication = createStackNavigator(
  {
    Login_Signup_Tab: {
      screen: Login_Signup,
      navigationOptions: headerOption,
    },
    Main: {
      screen: MainScreen,
      navigationOptions: headerOption,
    },
  },
  {
    initialRouteName: "Main",
  }
);

export default Authentication;
