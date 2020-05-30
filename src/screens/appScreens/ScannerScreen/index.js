import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text, Icon } from "native-base";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import { connect } from "react-redux";
import axios from 'axios'

// Local Imports
import { styles } from "./styles";
import { updateCart } from "../../../redux";
import baseUrl from "../../../constants/baseUrl";

class BarCodeScannerScreen extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        barcode: "",
        Cart: this.props.cart.cart,
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

    onSwipeLeft = () => {
        this.props.navigation.navigate("Map");
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;
        // console.log(this.state.Cart)
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
                onSwipeLeft={this.onSwipeLeft}
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
                    this.fetchData();
                },
            },
        ]);
    }

    fetchData = () => {
        const notEmpty = this.state.barcode.trim().length > 0;
        
        if (notEmpty){
            const barcode = this.state.barcode;

            axios(baseUrl + "store/" + barcode, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.props.token.token
                },
            })
            .then( res => {
                // console.log(res.data)
                this.addToCart(res.data)
            })
            .catch( error => {
                console.log(error)
            })
        }
    };

    addToCart = (data) => {
        const notEmpty = data.length > 0;
        // console.log(data)
        if (notEmpty) {
            const { name, barcode, _id, price, quantity, quantityType } = data[0]
            // console.log(name, barcode, _id, price, quantity, quantityType)
            this.setState(
                (prevState) => {
                    let { Cart } = prevState;
                    return {
                        Cart: Cart.concat({
                            _id: _id,
                            name: name, 
                            barcode: barcode, 
                            price: price, 
                            quantity: quantity, 
                            quantityType: quantityType
                        }),
                        barcode: "",
                    };
                },
                () => this.props.updateCart(this.state.Cart),
            );
        }
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (data) => dispatch(updateCart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeScannerScreen);
