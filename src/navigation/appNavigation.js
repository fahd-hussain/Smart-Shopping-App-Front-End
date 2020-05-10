import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Dimensions } from 'react-native'
import { Icon } from "native-base";

//Local Imports
import color from "../constants/color";
//Screens
import HomeScreen from "../screens/appScreens/HomeScreen";
import ListScreen from '../screens/appScreens/ListScreen/CreateListScreen'
import SideMenu from '../screens/appScreens/SideMenu'

const options = {
  headerShown: false,
};

// Stack Navigators
const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: options,
    },
  },
  {
    initialRouteName: "Home",
  }
);
const ListStackNavigator = createStackNavigator(
  {
    Home: {
      screen: ListScreen,
      navigationOptions: options,
    },
  },
  {
    initialRouteName: "Home",
  }
);
// Tab Navigator
const AppTabNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: () => (
          <Icon type="FontAwesome" name="home" style={{ color: color[5] }} />
        ),
      },
    },
    ListTab: {
      screen: ListStackNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: () => (
          <Icon type="FontAwesome" name="home" style={{ color: color[5] }} />
        ),
      },
    },
  },
  {
    initialRouteName: "HomeTab",
    activeColor: color[3],
    inactiveColor: color[1],
    shifting: true,
    barStyle: {
      backgroundColor: color[5],
    },
  }
);

// App Stack Navigator
const MainStackNavigator = createStackNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: options,
    },
    // Cart: {
    //   screen: CartScreen,
    //   navigationOptions: options,
    // },
  },
  {
    initialRouteName: "Home",
  }
);

// App Drawer
const AppDrawer = createDrawerNavigator(
  {
    Drawer: MainStackNavigator,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get("window").width * 3) / 4,
  }
);

export default AppDrawer;