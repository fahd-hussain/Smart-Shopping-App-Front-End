import React, { Component } from "react";
import { View, FlatList, TextInput, Modal, Button, Text, TouchableOpacity } from "react-native";
// local imports

class CreateListScreen extends Component {
    state = {
        itemName: "",
        quantity: 1,
        modalVisible: false,
        data: [],
    };

    searchFilterFunction = (text) => {
        this.setState({
            itemName: text,
        });
        // console.log(text)
        if (store.length > 0) {
            const newData = store.filter((item) => {
                console.log(text);
                const itemData = item.name.toUpperCase();
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
            this.setState({
                data: newData,
            });
            if (newData.length > 0) {
                console.log("open");
            } else {
                console.log("closed");
            }
        }
    };
    render() {
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <Button title="add task" onPress={() => this.setState({ modalVisible: true })} />
                <Modal 
                    visible={this.state.modalVisible}
                    onDismiss={() => this.setState({ modalVisible: false })}
                    style={{ flex: 1 }}
                >  
                    <TextInput
                        style={{ height: 40, paddingRight: 10, paddingLeft: 10, borderColor: "gray", width: "100%" }}
                        onChangeText={(text) => this.searchFilterFunction(text)}
                        value={this.state.itemName}
                        placeholder="Add Item"
                        returnKeyType="next"
                        returnKeyLabel="next"
                    />
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.listItemCont}
                                onPress={() => this.setState({ itemName: item.name })}
                            >
                                <Text style={styles.listItem}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>
            </View>
        );
    }
}

export default CreateListScreen;

const store = [
    {
        name: "Nido 400gms",
    },
    {
        name: "Nido 1800gm Tin",
    },
    {
        name: "Nido 1kg",
    },
    {
        name: "Nutella Chocolate Spread 350g",
    },
    {
        name: "Nutella Chocolate Spread 630g",
    },
    {
        name: "Everyday 1kg",
    },
    {
        name: "Everyday 375g",
    },
    {
        name: "Milo Chocolate Milk 200ml",
    },
    {
        name: "English Mayonnaise 100ml",
    },
    {
        name: "Youngs Mayonnaise French 200ml",
    },
];
