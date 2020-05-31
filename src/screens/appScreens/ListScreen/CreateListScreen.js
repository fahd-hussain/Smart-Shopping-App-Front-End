import React, { Component } from "react";
import { Text, View, FlatList, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import { Card, Left, Right, Fab } from "native-base";
import { Button } from "react-native-paper";
import axios from "axios";
// local imports
import { updateList, getStore } from "../../../redux";
import styles from "./styles";
import baseUrl from "../../../constants/baseUrl";
import color from "../../../constants/color";

class CreateListScreen extends Component {
    state = {
        listItems: this.props.list.list,
        itemName: "",
        quantity: 1,
        addItemModal: false,
        pushDatabaseModal: false,
        store: this.props.store.store,
        data: [],
    };

    addTask = () => {
        const notEmpty = this.state.itemName.trim().length > 0;

        if (notEmpty) {
            this.setState(
                (prevState) => {
                    let { listItems, itemName, quantity } = prevState;
                    return {
                        listItems: listItems.concat({
                            itemName,
                            quantity,
                        }),
                        itemName: "",
                        quantity: 1,
                        data: [],
                    };
                },
                () => this.props.updateList(this.state.listItems),
            );
        }
    };

    deleteTask = (i) => {
        Alert.alert(
            "Delete item",
            "Are you sure you want to delete this item from the list?",
            [
                {
                    itemName: "Cancel",
                    style: "cancel",
                },
                {
                    itemName: "OK",
                    onPress: () => {
                        this.setState(
                            (prevState) => {
                                let listItems = prevState.listItems.slice();

                                listItems.splice(i, 1);

                                return { listItems: listItems };
                            },
                            () => this.props.updateList(this.state.listItems),
                        );
                    },
                },
            ],
            { cancelable: false },
        );
    };

    resetList = () => {
        this.setState(
            {
                itemName: "",
                listItems: [],
                pushDatabaseModal: false,
            },
            () => this.props.updateList(this.state.listItems),
        );
    };

    pushToDatabase = () => {
        const { name, listItems } = this.state;
        const userToken = this.props.token.token;
        axios(`${baseUrl}lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
            data: JSON.stringify({ name, listItems }),
        })
            .then((res) => {
                console.log("Pushed");
            })
            .catch((error) => {
                console.log("error", error);
            });
        this.resetList();
        this.props.navigation.navigate("List");
    };

    componentDidMount = () => {
        this.props.getStore();
    };

    searchFilterFunction = (text) => {
        this.setState({
            itemName: text,
        });
        if (this.state.store.length > 0) {
            const newData = this.state.store.filter((item) => {
                const itemData = item.name.toUpperCase();
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
            this.setState({
                data: newData,
            });
        }
    };

    render() {
        const list = this.state.listItems;
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={list}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onLongPress={() => this.deleteTask(index)}>
                            <Card style={{ paddingHorizontal: 10 }}>
                                <View style={styles.listItemCont}>
                                    <Text style={styles.listItem}>{item.itemName}</Text>
                                    <Text>{item.quantity}</Text>
                                </View>
                                {/* <View style={styles.hr} /> */}
                            </Card>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyScreen}>
                            <Text>Oops! You don't have any item</Text>
                        </View>
                    }
                />
                <View style={styles.listItemCont}>
                    <Left style={{ width: 100 }}>
                        <Button
                            style={{ backgroundColor: color[3], width: 150 }}
                            color={color[4]}
                            onPress={() => this.setState({ addItemModal: true })}
                        >
                            Add Item
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            style={{ backgroundColor: color[3], width: 150 }}
                            color={color[4]}
                            onPress={() => this.setState({ pushDatabaseModal: true })}
                        >
                            Done
                        </Button>
                    </Right>
                </View>
                {/* Add item modal */}
                <Modal
                    visible={this.state.addItemModal}
                    onDismiss={() => this._hideModel("addItem")}
                    onRequestClose={() => this._hideModel("addItem")}
                    animationType={"fade"}
                >
                    <View style={(styles.container, { paddingBottom: this.state.viewPadding })}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            value={this.state.itemName}
                            placeholder="Add Item"
                            returnKeyType="next"
                            returnKeyLabel="next"
                        />
                        <FlatList
                            style={styles.list}
                            data={this.state.data}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ itemName: item.name })}>
                                    <Card style={{ paddingHorizontal: 10 }}>
                                        <View style={styles.listItemCont}>
                                            <Text style={styles.listItem}>{item.name}</Text>
                                        </View>
                                        <View style={styles.hr} />
                                    </Card>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <View style={styles.emptyScreen}>
                                    <Text>Type something for Suggestion</Text>
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.modalButtonsLeft}>
                        <Button
                            style={{ backgroundColor: color.danger, width: 150 }}
                            color={color[4]}
                            onPress={() => this._hideModel("addItem")}
                        >
                            Cancel
                        </Button>
                    </View>
                    <View style={styles.modalButtonsRight}>
                        <Button
                            style={{ backgroundColor: color[3], width: 150 }}
                            color={color[4]}
                            onPress={() => {
                                this.addTask();
                                this._hideModel("addItem");
                            }}
                        >
                            Add
                        </Button>
                    </View>
                </Modal>
                {/* Add list to database modal */}
                <Modal
                    visible={this.state.pushDatabaseModal}
                    transparent={false}
                    animationType={"fade"}
                    onDismiss={() => this._hideModel("pushDatabase")}
                    onRequestClose={() => this._hideModel("pushDatabase")}
                >
                    <View style={styles.container}>
                        <Text style={styles.listItem}>Enter name of you list</Text>
                        <TextInput
                            style={styles.hideInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder="List Name"
                            returnKeyType="done"
                            returnKeyLabel="done"
                        />
                    </View>
                    <View style={styles.modalButtonsLeft}>
                        <Button
                            style={{ backgroundColor: color.danger, width: 150 }}
                            color={color[4]}
                            onPress={() => this._hideModel("pushDatabase")}
                        >
                            Cancel
                        </Button>
                    </View>
                    <View style={styles.modalButtonsRight}>
                        <Button
                            style={{ backgroundColor: color[3], width: 150 }}
                            color={color[4]}
                            onPress={() => {
                                this.pushToDatabase();
                                this._hideModel("pushDatabase");
                            }}
                        >
                            Add
                        </Button>
                    </View>
                </Modal>
            </View>
        );
    }
    _hideModel = (modal) => {
        switch (modal) {
            case "addItem":
                this.setState({ addItemModal: false });
            case "pushDatabase":
                this.setState({ pushDatabaseModal: false });
            default:
                return;
        }
    };
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        token: state.token,
        store: state.store,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (data) => dispatch(updateList(data)),
        getStore: () => dispatch(getStore()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateListScreen);
