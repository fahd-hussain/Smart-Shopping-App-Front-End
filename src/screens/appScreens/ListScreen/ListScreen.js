import React, { Component } from "react";
import { Text, Button, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card } from "native-base";

// Local Imports
import styles from "./styles";
import { getAllList } from "../../../redux";

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allList: this.props.allList.allList,
        };
    }
    UNSAFE_componentWillMount = () => {
        this.props.getAllList(this.props.token.token);
    };

    navigateToShowList = (item) => {
        this.props.navigation.navigate("ListShow", item)
    }

    render() {
        // console.log(this.state.allList);
        const list = this.props.allList.allList;
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={list}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => this.navigateToShowList(item)}>
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
                            <Text>Oops! You don't have any list to show</Text>
                        </View>
                    }
                />
                <View style={styles.createListBtn}>
                    <Button title="+" onPress={() => this.props.navigation.navigate("CreateList")} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        allList: state.allList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllList: (token) => dispatch(getAllList(token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
