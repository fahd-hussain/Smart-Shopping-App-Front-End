import React, { Component } from "react";
import { Text, Button, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card } from "native-base";

// Local Imports
import styles from "./styles";
import { getAllList } from "../../../redux";

class ListShowScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.navigation.state.params.list,
        };
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={this.state.list}
                    keyExtractor={(item) => "" + item.key}
                    renderItem={({ item, index }) => (
                        <Card style={{ paddingHorizontal: 10 }}>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>{item.text}</Text>
                                <Text>{item.unit} {item.unitName}</Text>
                            </View>
                            <View style={styles.hr} />
                        </Card>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyScreen}>
                            <Text>Oops! You don't have any item to show</Text>
                        </View>
                    }
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(ListShowScreen);
