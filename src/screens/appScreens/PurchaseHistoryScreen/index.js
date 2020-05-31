import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper'
import { Card } from "native-base";
import { connect } from 'react-redux'

// Local imports
import { fetchCart } from '../../../redux'
import styles from './styles'

export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartHistory: this.props.cart.allCarts
        }
    }
    componentDidMount = () => {
        this.props.fetchCart(this.props.token.token)
    }
    componentDidUpdate = () => {
        this.props.fetchCart(this.props.token.token)
    }
    navigateToShowList = (item) => {
        this.props.navigation.navigate("PurchaseHistoryDetail", item);
    };
    render() {
        const { cartHistory } = this.state;
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    style={styles.list}
                    data={cartHistory}
                    keyExtractor={(item, index) => String(index)}
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
                            <Text>Oops! You don't have any item to show</Text>
                        </View>
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        cart: state.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: (token) => dispatch(fetchCart(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(index)
