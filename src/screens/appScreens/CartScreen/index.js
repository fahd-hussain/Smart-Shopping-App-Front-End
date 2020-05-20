import React, { Component } from "react";
import { Text, Button, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card } from "native-base";

// Local Imports
import styles from "./styles";
import { updateCart, emptyCart } from "../../../redux";

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: this.props.cart.cart,
        };
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={this.state.cartItems}
                    keyExtractor={(item) => "" + item.key}
                    renderItem={({ item, index }) => (
                        <Card style={{ paddingHorizontal: 10 }}>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>{item.barcode}</Text>
                                {/* <Text>{item.unit} {item.unitName}</Text> */}
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
                <Button title="Empty cart" onPress={() => this.props.emptyCart()}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        token: state.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (data) => dispatch(updateCart(data)),
        emptyCart: () => dispatch(emptyCart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
