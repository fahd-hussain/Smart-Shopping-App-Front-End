import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card, Icon, Right } from "native-base";
import { Button } from "react-native-paper";
import { withNavigationFocus } from 'react-navigation';
import GestureRecognizer from "react-native-swipe-gestures";

// Local Imports
import styles from "./styles";
import { fetchLists } from "../../../redux";
import color from "../../../constants/color";

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
            },
            isLoading: false,
            // lists = this.props.list.lists
        };
    }
    _fetchLists = () => {
        // console.log(this.props)
        const { fetchLists } = this.props;
        const { token } = this.props.token

        this.setState({ isLoading: true })

        fetchLists(token)
            .then(() => this.setState({ isLoading: false }))
            .catch((error) => {
                this.setState({ isLoading: false })
                alert("Loading failed, swipe down to refresh")
            })
    }
    render() {
        // const { lists } = this.state;
        const lists = this.props.list.lists;

        return (
            <GestureRecognizer
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                onSwipeDown={() => this.onSwipeDown()}
                config={this.state.config}
                style={[styles.container, { paddingBottom: this.state.viewPadding }]}
            >
                <FlatList
                    style={styles.list}
                    data={lists}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => this.navigateToShowList(item)}>
                            <Card style={{ paddingHorizontal: 10 }}>
                                <View style={styles.listItemCont}>
                                    <Text style={styles.listItem}>{item.name}</Text>
                                </View>
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
                    <Button
                        icon={() => (
                            <Icon type="FontAwesome" name="plus-circle" style={{ color: color[3], fontSize: 55 }} />
                        )}
                        onPress={() => this.props.navigation.navigate("CreateList")}
                        style={{ position: "absolute", left: "32%", bottom: 0 }}
                        color={color[5]}
                    />
                </View>
            </GestureRecognizer>
        );
    }
    navigateToShowList = (item) => {
        this.props.navigation.navigate("ListShow", item);
    };
    onSwipeLeft = () => {
        this.props.navigation.navigate("BarcodeScanner");
    };
    onSwipeRight = () => {
        this.props.navigation.navigate("Home");
    };
    onSwipeDown = () => {
        this.props.fetchLists(this.props.token.token);
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        list: state.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLists: (token) => dispatch(fetchLists(token)),
    };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(ListScreen));
