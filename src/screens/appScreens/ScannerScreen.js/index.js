import React, { Component } from "react";
import { StyleSheet, FlatList, AsyncStorage, Button, TextInput, Keyboard, Platform, Alert } from "react-native";
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from "native-base";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class Home extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        tasks: this.props.list.list,
        text: "",
        unitType: "mass",
        unitName: "",
        unit: "",
    };

    changeTextHandler = (text) => {
        this.setState({ text });
    };

    addTask = () => {
        const notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                (prevState) => {
                    let { tasks, text, unitType, unitName, unit } = prevState;
                    return {
                        tasks: tasks.concat({
                            key: tasks.length,
                            text,
                            unitType,
                            unitName,
                            unit,
                        }),
                        text: "",
                        text: "",
                        unitType: "mass",
                        unitName: "",
                        unit: "",
                    };
                },
                () => this.props.updateList(this.state.tasks),
            );
        }
    };

    deleteTask = (i) => {
        Alert.alert(
            "Delete item",
            "Are you sure you want to delete this item from the list?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        this.setState(
                            (prevState) => {
                                let tasks = prevState.tasks.slice();

                                tasks.splice(i, 1);

                                return { tasks: tasks };
                            },
                            () => this.props.updateList(this.state.tasks),
                        );
                    },
                },
            ],
            { cancelable: false },
        );
    };

    componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <Container>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </Container>
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
        // this.setState({ scanned: false })
    };
}
