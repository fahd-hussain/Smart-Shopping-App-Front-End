import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput, Picker, TouchableOpacity, Button, Modal } from "react-native";
import { connect } from "react-redux";
import { Card } from "native-base";
import axios from "axios";
// local imports
import { updateList } from "../../../redux";
import styles from "./styles";
import baseUrl from "../../../constants/baseUrl";

class CreateListScreen extends Component {
    state = {
        tasks: this.props.list.list,
        text: "",
        unitType: "mass",
        unitName: "",
        unit: "",
        name: "",
        modalVisible: false,
    };

    addTask = () => {
        const notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                (prevState) => {
                    let { tasks, text, unitType, unitName, unit } = prevState;
                    return {
                        tasks: tasks.concat({
                            key: tasks.length + 1,
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

    toggleModel = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };
    resetList = () => {
        this.setState({
            tasks: [],
            modalVisible: false
        });
        this.props.updateList(this.state.tasks)
    };
    pushToDatabase = () => {
        const { name, tasks } = this.state;
        const userToken = this.props.token.token;
        console.log(name, tasks)
        // axios(baseUrl + "lists", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: userToken,
        //     },
        //     data: JSON.stringify({ name, tasks }),
        // })
        //     .then((res) => {
        //         console.log("Pushed");
        //     })
        //     .catch((error) => {
        //         console.log("error", error);
        //     });
        this.resetList()
    };

    selector = (type) => {
        // console.log(type)
        switch (type) {
            case "mass":
                return (
                    <Picker
                        selectedValue={this.state.unitName}
                        style={styles.hideInput}
                        onValueChange={(itemValue, itemIndex) => this.setState({ unitName: itemValue })}
                    >
                        {MASS.map((ele) => {
                            return <Picker.Item label={ele.label} value={ele.value} key={ele.value} />;
                        })}
                    </Picker>
                );
            case "volume":
                return (
                    <Picker
                        accessibilityValue={this.state.unitName}
                        selectedValue={this.state.unitName}
                        style={styles.hideInput}
                        onValueChange={(itemValue, itemIndex) => this.setState({ unitName: itemValue })}
                    >
                        {VOLUME.map((ele) => {
                            // console.log(ele.label, ele.value)
                            return <Picker.Item label={ele.label} value={ele.value} key={ele.value} />;
                        })}
                    </Picker>
                );
            case "packet":
                return (
                    <Picker
                        selectedValue={this.state.unitName}
                        style={styles.hideInput}
                        onValueChange={(itemValue, itemIndex) => this.setState({ unitName: itemValue })}
                    >
                        {PACKET.map((ele) => {
                            return <Picker.Item label={ele.label} value={ele.value} key={ele.value} />;
                        })}
                    </Picker>
                );

            default:
                return (
                    <View>
                        <Text>Empty list</Text>
                    </View>
                );
        }
    };

    render() {
        const list = this.state.tasks;
        // console.log(list)
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <Button title="Push me" onPress={this.toggleModel} />
                <FlatList
                    style={styles.list}
                    data={list}
                    keyExtractor={(item) => "" + item.key}
                    renderItem={({ item, index }) => (
                        // console.log(item.item)
                        <TouchableOpacity onLongPress={() => this.deleteTask(index)}>
                            <Card style={{ paddingHorizontal: 10 }}>
                                <View style={styles.listItemCont}>
                                    <Text style={styles.listItem}>{item.text}</Text>
                                    <Text>
                                        {item.unit} {item.unitName}
                                    </Text>
                                </View>
                                <View style={styles.hr} />
                            </Card>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyScreen}>
                            <Text>Oops! You don't have any item</Text>
                        </View>
                    }
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Add Item"
                    returnKeyType="next"
                    returnKeyLabel="next"
                />
                {this.state.text ? (
                    <View flexDirection="row">
                        <Picker
                            selectedValue={this.state.unitType}
                            style={styles.hideInput}
                            onValueChange={(itemValue, itemIndex) => this.setState({ unitType: itemValue })}
                        >
                            <Picker.Item label="Select" />
                            <Picker.Item label="Mass" value="mass" />
                            <Picker.Item label="Volume" value="volume" />
                            <Picker.Item label="Packet" value="packet" />
                        </Picker>
                        {this.selector(this.state.unitType)}
                        <TextInput
                            style={styles.hideInput}
                            onChangeText={(unit) => this.setState({ unit })}
                            onSubmitEditing={this.addTask}
                            value={this.state.unit}
                            placeholder="Unit"
                            returnKeyType="done"
                            returnKeyLabel="done"
                        />
                    </View>
                ) : null}
                <Modal
                    visible={this.state.modalVisible}
                    transparent={false}
                    animationType={"slide"}
                    onDismiss={this.toggleModel}
                    onRequestClose={this.toggleModel}
                >
                    <View style={styles.container}>
                        <Text style={styles.listItem}>Enter name of you list</Text>
                        <TextInput
                            style={styles.hideInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder="List Name"
                        />
                        <Button title="Done" onPress={this.pushToDatabase} />
                    </View>
                </Modal>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        token: state.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (data) => dispatch(updateList(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateListScreen);

const MASS = [
    {
        label: "select",
        value: "select",
    },
    {
        label: "Kilo",
        value: "kg",
    },
    {
        label: "gram",
        value: "gm",
    },
];
const VOLUME = [
    {
        label: "select",
        value: "select",
    },
    {
        label: "Litre",
        value: "litre",
    },
    {
        label: "Gallon",
        value: "gallon",
    },
];
const PACKET = [
    {
        label: "select",
        value: "select",
    },
    {
        label: "Packet",
        value: "packet",
    },
    {
        label: "Box",
        value: "box",
    },
];
