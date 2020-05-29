import React, { Component } from "react";
import { Text, View, Pan } from "react-native";
import { connect } from "react-redux";
import { Card, CardItem, Right, Icon } from "native-base";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

// Local Imports
import styles from "./styles";
import { getAllList, fetchPromotions } from "../../../redux";

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
            },
        };
    }
    componentDidMount = () => {
        this.props.getAllList(this.props.token.token);
        this.props.fetchPromotions();
    };
    
    render() {
        const promo = this.props.promo.promotions;
        return (
            <GestureRecognizer
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                config={this.state.config}
                style={styles.container}
            >
                <Card
                    dataArray={promo}
                    transparent
                    renderRow={({ item }) => (
                        <View>
                            <Card>
                                <CardItem header>
                                    <Text>{item.name}</Text>
                                </CardItem>
                                <CardItem body>
                                    <Text>{item.description}</Text>
                                </CardItem>
                                <CardItem footer>
                                    <Right>
                                        <Icon
                                            raised
                                            reverse
                                            // name={ props.favorite ? 'heart' : 'heart-o'}
                                            name="heart"
                                            type="FontAwesome"
                                            color="#f50"
                                            // onPress={() => props.favorite ? console.log("already fav") : props.onPress() }
                                        />
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                    )}
                />
            </GestureRecognizer>
        );
    }
    onSwipeLeft = () => {
        this.props.navigation.navigate("List");
    };
    onSwipeRight = () => {
        this.props.navigation.openDrawer();
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        promo: state.promo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllList: (token) => dispatch(getAllList(token)),
        fetchPromotions: () => dispatch(fetchPromotions()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
