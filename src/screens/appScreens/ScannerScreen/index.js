import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text, Icon } from "native-base";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import { connect } from "react-redux";

// Local Imports
import { styles } from "./styles";
import { updateCart } from "../../../redux";

class BarCodeScannerScreen extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        barcode: "",
        cart: [],
        config: {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        },
    };

    componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };

    onSwipeRight = () => {
        this.props.navigation.navigate("List");
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return (
                <View style={styles.container}>
                    <Text>Requesting for camera permission</Text>
                </View>
            );
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            );
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

    handleBarCodeScanned = ({ data }) => {
        this.setState({ scanned: true });
        this.showAlert(data);
    };

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
                    this.setState({ scanned: false, barcode: data });
                    this.addToList();
                },
            },
        ]);
    }

    addToList = () => {
        const notEmpty = this.state.barcode.trim().length > 0;

        if (notEmpty) {
            this.setState(
                (prevState) => {
                    let { cart, barcode } = prevState;
                    return {
                        cart: cart.concat({
                            key: cart.length + 1,
                            barcode
                        }),
                        barcode: "",
                    };
                },
                () => this.props.updateCart(this.state.cart),
            );
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (data) => dispatch(updateCart(data)),
    };
};

export default connect(null, mapDispatchToProps)(BarCodeScannerScreen);
