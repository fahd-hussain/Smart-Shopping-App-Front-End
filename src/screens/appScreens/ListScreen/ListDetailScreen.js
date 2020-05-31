import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { Button } from 'react-native-paper'
import { Card } from "native-base";
import { connect } from "react-redux";
// Local Imports
import styles from "./styles";
// import { getAllList } from "../../../redux";

class ListShowScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.navigation.state.params.listItems,
            isLeading: false
        };
    }
    componentDidMount = () => {
        if (!this.state.list){
            this.setState({ isLeading: true})
        }
    }
    _findTheWay = () => {
        const listId = this.props.navigation.state.params
        console.log(listId._id)
        this.props.navigation.navigate("Map", {listId: listId._id})
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={this.state.list}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <Card style={{ paddingHorizontal: 10 }}>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>{item.itemName}</Text>
                                <Text>{item.quantity}</Text>
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
                <Button onPress={this._findTheWay} style={{}}>Find they WAY!</Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // token: state.token,
        // allList: state.allList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getAllList: (token) => dispatch(getAllList(token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListShowScreen);
