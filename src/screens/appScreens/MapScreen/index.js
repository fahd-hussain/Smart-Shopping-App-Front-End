import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, Animated } from "react-native";
import { Button } from 'react-native-paper'
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { connect } from "react-redux";
import axios from "axios";

// local imports
import { styles } from "./styles";
import { getShelf } from "../../../redux";
import color from "../../../constants/color";
import baseUrl from "../../../constants/baseUrl";

const { width } = Dimensions.get("window");
const scale = new Animated.Value(1);
export class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageId: this.props.navigation.state.params.listId,
        };
    }

    _getImage = () => {
        const {listId} = this.props.navigation.state.params;
        console.log(listId)
        this.setState({ imageId: listId})
    };
    onZoomEvent = Animated.event(
        [
            {
                nativeEvent: { scale: scale },
            },
        ],
        {
            useNativeDriver: true,
        },
    );
    onZoomStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <PinchGestureHandler onGestureEvent={this.onZoomEvent} onHandlerStateChange={this.onZoomStateChange}>
                    <Animated.Image
                        source={{
                            uri: `${baseUrl}shortestPath/${this.state.imageId}`,
                        }}
                        style={{
                            width: width,
                            height: 300,
                            transform: [{ scale: 1 }],
                        }}
                        resizeMode="contain"
                    />
                </PinchGestureHandler>
                <Button onPress={this._getImage}>Hello Jee</Button>
            </View>
        );
    }
    // render() {
    //     const shelves = this.props.shelf.shelf;
    //     // console.log(shelves)
    //     return (
    //         <ScrollView horizontal bounces={false}>
    //             <ScrollView nestedScrollEnabled bounces={false}>
    //                 <View style={styles.container}>
    //                     <Animated.View style={styles.mapScreen}>
    //                         {shelves.map((ele) => {
    //                             return (
    //                                 <View>
    //                                     <View style={[styles.circle, { left: ele.column * 50, top: ele.row * 50 }]} />
    //                                     {/* <View
    //                                         style={[styles.rectangle, { left: ele.column * 50, top: ele.row * 50 }]}
    //                                     /> */}
    //                                 </View>
    //                             );
    //                         })}
    //                     </Animated.View>
    //                 </View>
    //             </ScrollView>
    //         </ScrollView>
    //     );
    // }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getShelf: () => dispatch(getShelf()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
// export default MapScreen
