import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

//Local Imports
import color from "../constants/color";
//Screens
import HomeScreen from "../screens/appScreens/HomeScreen";
import CreateListScreen from "../screens/appScreens/ListScreen/CreateListScreen";
import ListScreen from "../screens/appScreens/ListScreen/ListScreen";
import ListShowScreen from "../screens/appScreens/ListScreen/ListDetailScreen";
import SideMenu from "../screens/appScreens/SideMenu";
import CartScreen from "../screens/appScreens/CartScreen";
import BarCodeScannerScreen from "../screens/appScreens/ScannerScreen";
import MapScreen from '../screens/appScreens/MapScreen';
import ProfileScreen from '../screens/appScreens/ProfileScreen';
import PurchaseHistoryScreen from '../screens/appScreens/PurchaseHistoryScreen';
import PurchaseHistoryDetailScreen from '../screens/appScreens/PurchaseHistoryScreen/PurchaseHistoryDetailScreen';
import ComparePurchaseHistoryScreen from '../screens/appScreens/PurchaseHistoryScreen/ComparePurchaseHistory'

const optionsTabs = {
    headerShown: false,
};
const options = {
    headerTitle: "",
};
const headerRight = (navigation) => {
    return (
            <Icon style={{ paddingRight: 15 }} type="FontAwesome" name="shopping-cart" onPress={() => navigation.navigate("Cart")}/>
    );
};

// Stack Navigators
const HomeStackNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                headerRight: () => headerRight(navigation),
            }),
        },
    },
    {
        initialRouteName: "Home",
    },
);
const ListStackNavigator = createStackNavigator(
    {
        List: {
            screen: ListScreen,
            navigationOptions: ({ navigation }) => ({
                headerRight: () => headerRight(navigation),
            }),
        },
        CreateList: {
            screen: CreateListScreen,
            navigationOptions: {
                headerTitle: "Create List"
            },
        },
        ListShow: {
            screen: ListShowScreen,
            navigationOptions: {
                headerTitle: "List Details"
            },
        },
    },
    {
        initialRouteName: "List",
    },
);
const BarcodeScannerStackNavigator = createStackNavigator(
    {
        BarcodeScanner: {
            screen: BarCodeScannerScreen,
            navigationOptions: ({ navigation }) => ({
                headerRight: () => headerRight(navigation),
            }),
        },
    },
    {
        initialRouteName: "BarcodeScanner",
    },
);
const MapStackNavigator = createStackNavigator(
    {
        Map: {
            screen: MapScreen,
            navigationOptions: ({ navigation }) => ({
                headerRight: () => headerRight(navigation),
            }),
        },
    },
    {
        initialRouteName: "Map",
    },
);
const ProfileStackNavigator = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            navigationOptions: optionsTabs,
        },
    },
    {
        initialRouteName: "Profile",
    },
);
const PurchaseHistoryStackNavigator = createStackNavigator(
    {
        PurchaseHistory: {
            screen: PurchaseHistoryScreen,
            navigationOptions: ({ navigation }) => ({
                headerRight: () => <Icon style={{ paddingRight: 15 }} type="FontAwesome" name="home" onPress={() => navigation.navigate("Home")}/>
            }),
        },
        PurchaseHistoryDetail: {
            screen: PurchaseHistoryDetailScreen,
            navigationOptions: {
                headerTitle: "Purchase History Details"
            },
        },
        ComparePurchaseHistory: {
            screen: ComparePurchaseHistoryScreen,
            navigationOptions: {
                headerTitle: "Compare Purchase History"
            },
        },
    },
    {
        initialRouteName: "PurchaseHistory",
    },
);

// Tab Navigator
const AppTabNavigator = createBottomTabNavigator(
    {
        HomeTab: {
            screen: HomeStackNavigator,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: () => <Icon type="FontAwesome" name="home" style={{ color: color[5] }} />,
            },
        },
        ListTab: {
            screen: ListStackNavigator,
            navigationOptions: {
                tabBarLabel: "List",
                tabBarIcon: () => <Icon type="FontAwesome" name="edit" style={{ color: color[5] }} />,
            },
        },
        BarcodeScanner: {
            screen: BarcodeScannerStackNavigator,
            navigationOptions: {
                tabBarLabel: "Barcode",
                tabBarIcon: () => <Icon type="FontAwesome" name="barcode" style={{ color: color[5] }} />,
            },
        },
        MapTab: {
            screen: MapStackNavigator,
            navigationOptions: {
                tabBarLabel: "Map",
                tabBarIcon: () => <Icon type="FontAwesome" name="map" style={{ color: color[5] }} />,
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
    },
);

// App Stack Navigator
const MainStackNavigator = createStackNavigator(
    {
        Home: {
            screen: AppTabNavigator,
            navigationOptions: optionsTabs,
        },
        Cart: {
            screen: CartScreen,
            navigationOptions: {
                headerTitle: "Cart"
            },
        },
        Profile: {
            screen: ProfileStackNavigator,
            navigationOptions: {
                headerTitle: "Profile"
            }
        },
        PurchaseHistory: {
            screen: PurchaseHistoryStackNavigator,
            navigationOptions: optionsTabs,

        }
    },
    {
        initialRouteName: "Home",
    },
);

// App Drawer
const AppDrawer = createDrawerNavigator(
    {
        Drawer: MainStackNavigator,
    },
    {
        contentComponent: SideMenu,
        drawerWidth: (Dimensions.get("window").width * 3) / 4,
    },
);

export default AppDrawer;
