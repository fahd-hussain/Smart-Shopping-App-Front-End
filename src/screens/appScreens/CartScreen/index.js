import React, { Component } from "react";
import { Text, Button, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card, CardItem, Right, Left, Footer } from "native-base";

// Local Imports
import styles from "./styles";
import { updateCart, emptyCart } from "../../../redux";

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: this.props.cart.cart,
            totalCost: 0
        };
    }
    incrementCount=()=>{
        this.setState((prevState) => ({
            quantity: parseInt(prevState.quantity) + 1
        }));
    }

    render() {
        const { cartItems } = this.state;
        let totalQuantity = 0;
        let totalPrice = 0;
        cartItems.forEach((item) => {
            // totalQuantity += item.quantity;
            totalPrice += item.price;
        })
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={this.state.cartItems}
                    keyExtractor={(item) => "" + item._id}
                    renderItem={({ item, index }) => (
                        <Card style={{ paddingHorizontal: 10 }}>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.listItem}>{item.name}</Text>
                                </Left>
                                <Right>
                                    <Text>{item.price}</Text>
                                </Right>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Text>
                                        {item.quantity} {item.quantityType}
                                    </Text>
                                </Left>
                                <Right>
                                    <Text>- 1 +</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyScreen}>
                            <Text>Oops! You don't have any item to show</Text>
                        </View>
                    }
                />
                <Footer style={{ }}>
                    <Button title={ "Check Out - " + totalPrice} />
                </Footer>
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
        emptyCart: () => dispatch(emptyCart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
