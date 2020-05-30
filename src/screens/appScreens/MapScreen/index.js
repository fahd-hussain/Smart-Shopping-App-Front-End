import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, Modal, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import { connect } from "react-redux";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

// local imports
import { styles } from "./styles";
import color from "../../../constants/color";
import baseUrl from "../../../constants/baseUrl";
import LoadingScreen from '../../../components/Loading'

const { width } = Dimensions.get("window");

export class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePreview: false,
            config: {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
            },
        };
    }

    render() {
        const listId = this.props.navigation.state.params;

        if (!listId) {
            return (
                <GestureRecognizer
                    onSwipeRight={this.onSwipeRight}
                    config={this.state.config}
                    style={[styles.container, { paddingBottom: this.state.viewPadding }]}
                >
                    <View>
                        <Text>Oops, nothings to show!</Text>
                        <Text>Got to list tab to find the map.</Text>
                    </View>
                </GestureRecognizer>
            );
        } else {
            const { listId } = this.props.navigation.state.params;
            const url = `${baseUrl}shortestPath/${listId}`;
            console.log(url)
            return (
                <GestureRecognizer
                    onSwipeRight={this.onSwipeRight}
                    config={this.state.config}
                    style={[styles.container, { paddingBottom: this.state.viewPadding }]}
                >
                    <View style={[styles.container, { backgroundColor: "black" }]}>
                        <TouchableOpacity onPress={() => this.setState({ imagePreview: true })}>
                            <Image
                                source={{
                                    uri: url,
                                }}
                                style={{ width: width, height: 300 }}
                            />
                        </TouchableOpacity>

                        <Modal visible={this.state.imagePreview} transparent>
                            <ImageViewer
                                imageUrls={[{ url: url }]}
                                onCancel={() => this.setState({ imagePreview: false })}
                                onSwipeDown={() => this.setState({ imagePreview: false })}
                                enableSwipeDown
                                loadingRender={() => {return (<LoadingScreen />)}}
                            />
                        </Modal>
                    </View>
                </GestureRecognizer>
            );
        }
    }
    onSwipeRight = () => {
        this.props.navigation.navigate("BarcodeScanner");
    };
}

// const mapStateToProps = (state) => {
//     return {
//         token: state.token,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // getShelf: () => dispatch(getShelf()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
export default MapScreen;
