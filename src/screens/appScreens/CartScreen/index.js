import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput, Dimensions, Modal } from "react-native";
import { connect } from "react-redux";
import { Card, CardItem, Right, Left, Icon } from "native-base";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

// Local Imports
import styles from "./styles";
import color from "../../../constants/color";
import { updateCart, fetchCart } from "../../../redux";

const width = Dimensions.get("window").width;

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: this.props.cart.cart,
            totalCost: 0,
            cartButton: true,
            QRModal: false,
            QRData: "",
            isLoading: false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <Icon
                    type="FontAwesome"
                    name="qrcode"
                    style={{ paddingRight: 15 }}
                    onPress={navigation.getParam("showQRModal")}
                />
            ),
        };
    };
    _showQRModal = () => {
        const { QRData } = this.state;

        if (QRData.trim().length !== 0) {
            this.setState({ QRModal: true });
        } else {
            alert("QR Code not found!");
        }
    };
    incrementCount = (i) => {
        const temp = this.state.cartItems.slice();
        temp[i].quantity += 1;
        temp[i].totalPrice = temp[i].price * temp[i].quantity;
        this.setState(
            (prevState) => {
                let cartItems = prevState.cartItems.slice();
                return { cartItems: cartItems };
            },
            () => this.props.updateCart(this.state.cartItems),
        );
    };

    decrementCount = (i) => {
        const temp = this.state.cartItems.slice();
        if (temp[i].quantity > 1) {
            temp[i].quantity -= 1;
            temp[i].totalPrice = temp[i].price * temp[i].quantity;

            this.setState(
                (prevState) => {
                    let cartItems = prevState.cartItems.slice();
                    return { cartItems: cartItems };
                },
                () => this.props.updateCart(this.state.cartItems),
            );
        }
    };

    _setCount = (i, value) => {
        const newValue = parseInt(value, 10);
        const temp = this.state.cartItems.slice();

        if (newValue <= 0) return;

        temp[i].quantity = value;
        temp[i].totalPrice = temp[i].price * temp[i].quantity;
        this.setState(
            (prevState) => {
                let cartItems = prevState.cartItems.slice();
                return { cartItems: cartItems };
            },
            () => this.props.updateCart(this.state.cartItems),
        );
    };

    _deleteTask = (i) => {
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
                                let cartItems = prevState.cartItems.slice();

                                cartItems.splice(i, 1);

                                return { cartItems: cartItems };
                            },
                            () => this.props.updateCart(this.state.cartItems),
                        );
                    },
                },
            ],
            { cancelable: true },
        );
    };

    componentDidMount = () => {
        this._priceCalculate();
        this.props.navigation.setParams({ showQRModal: this._showQRModal });
    };
    componentDidUpdate = () => {
        this._priceCalculate();
    };

    _priceCalculate = () => {
        const { cart } = this.props.cart;
        const { cartItems } = this.state;

        let totalPrice = 0;

        console.log(cart);
        if (cart.length === 0) {
            if (!this.state.cartButton) {
                this.setState({ cartButton: true });
            }
        } else {
            if (this.state.cartButton) {
                this.setState({ cartButton: false });
            }
            cartItems.forEach((item) => {
                totalPrice += item.totalPrice;
            });
            if (totalPrice !== this.state.totalCost) {
                this.setState({ totalCost: totalPrice });
            }
        }
    };

    _checkout = () => {
        this._pushToDatabase()
            .then((res) => {
                console.log("pushed to database");
                this.setState(
                    {
                        QRModal: true,
                        QRData: res[0],
                        isLoading: false,
                        totalCost: 0,
                        cartItems: [],
                    },
                    () => {
                        console.log(this.state);
                        this.props.updateCart(this.state.cartItems);
                    },
                );
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error,
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ],
                    { cancelable: true },
                );
                this.setState({ isLoading: false });
            });
    };

    _pushToDatabase = () => {
        const promiseArray = [];
        const url = `${baseUrl}cart`;
        const { token } = this.props.token;
        const { cartItems, totalCost } = this.state;
        const { fetchCart } = this.props;
        this.setState({ isLoading: true });
        const tempCart = [];
        cartItems.map((item) => {
            tempCart.push({ name: item.name, barcode: item.barcode, price: item.totalPrice, quantity: item.quantity });
        });

        promiseArray.push(
            new Promise((resolve, reject) => {
                axios(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify({ cartItems: tempCart, totalPrice: totalCost }),
                })
                    .then((res) => {
                        fetchCart(token);
                        resolve(res.data._id);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }),
        );

        return Promise.all(promiseArray);
    };
    render() {
        const { cartItems, totalCost, QRModal, QRData, isLoading, cartButton } = this.state;
        console.log(cartItems);
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={cartItems}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <Card style={{ paddingHorizontal: 10 }}>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.listItem}>{item.name}</Text>
                                </Left>
                                <Right>
                                    <Text>{item.totalPrice}</Text>
                                </Right>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Button
                                        style={{ backgroundColor: color.danger }}
                                        color={color[5]}
                                        onPress={() => this._deleteTask(index)}
                                    >
                                        Drop
                                    </Button>
                                </Left>
                                <Right>
                                    <View style={{ flexDirection: "row" }}>
                                        <Button
                                            style={{ backgroundColor: color[3], width: 10 }}
                                            color={color[5]}
                                            onPress={() => this.decrementCount(index)}
                                        >
                                            -
                                        </Button>
                                        <TextInput
                                            value={String(item.quantity)}
                                            onChangeText={(text) => this._setCount(index, text)}
                                            style={{ width: 20, marginLeft: 10 }}
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                            returnKeyLabel="done"
                                        />
                                        <Button
                                            style={{ backgroundColor: color[3], width: 10 }}
                                            color={color[5]}
                                            onPress={() => this.incrementCount(index)}
                                        >
                                            +
                                        </Button>
                                    </View>
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
                <Button
                    mode="contained"
                    style={[styles.TextInput, styles.btn2, { width: width - 20, marginHorizontal: width / 90 }]}
                    theme={{ colors: { primary: color[3] } }}
                    disabled={cartButton}
                    onPress={() => this._checkout()}
                    loading={isLoading}
                >
                    Check Out - {totalCost}
                </Button>
                <Modal
                    visible={QRModal}
                    onDismiss={() => this.setState({ QRModal: false })}
                    onRequestClose={() => this.setState({ QRModal: false })}
                >
                    <View style={styles.modalScreen}>
                        <QRCode value={QRData} color="black" backgroundColor="white" size={width / 2} />
                    </View>
                </Modal>
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
        fetchCart: (token) => dispatch(fetchCart(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
