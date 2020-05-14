import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text, Icon } from "native-base";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

import { styles } from './styles'

export default class BarCodeScannerScreen extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        tasks: [],
        text: "",
        unitType: "mass",
        unitName: "",
        unit: "",
        barcode: "",
        price: 0.0,
        config: {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        }
    };

    componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };
    onSwipeRight = () => {
        this.props.navigation.navigate("List")
    }
    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        }
        if (hasCameraPermission === false) {
            return <View style={ styles.container }>
                <Text>No access to camera</Text>
            </View>
        }
        return (
            <GestureRecognizer
                // onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                config={this.state.config}
                style={styles.container}
            >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />
            </GestureRecognizer>
        );
    }
    showAlert(data) {
        Alert.alert("Alert", data, [
            {
                text: "Cancel",
                onPress: () => this.setState({ scanned: false }),
                style: "cancel",
            },
            {
                text: "Add to Cart",
                onPress: () => {
                    this.changeTextHandler(data);
                    this.addTask();
                    this.setState({ scanned: false });
                },
            },
        ]);
    }

    handleBarCodeScanned = ({ data }) => {
        this.setState({ scanned: true });
        this.showAlert(data);
    };
}
