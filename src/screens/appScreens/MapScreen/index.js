import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, Modal, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import { connect } from "react-redux";
import axios from "axios";
import * as FileSystem from "expo-file-system";

// local imports
import { styles } from "./styles";
import color from "../../../constants/color";
import baseUrl from "../../../constants/baseUrl";

const { width } = Dimensions.get("window");

export class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageId: this.props.navigation.state.params.listId,
            imagePreview: false,
            image: FileSystem.documentDirectory + "map.png"
        };
    }

    _getImage = () => {
        const { listId } = this.props.navigation.state.params;
        console.log(listId);
        this.setState({ imageId: listId });
    };

    _downImage = async () => {
        console.log("Here");
        // const { uri: localUri } =  
        FileSystem.downloadAsync(
            // `${baseUrl}shortestPath/${this.state.imageId}`,
            "https://metoo-assets.s3.amazonaws.com/static/media/avatars/3/photo_6B7NH7L.jpg",
            FileSystem.documentDirectory + "map.jpg",
            // "./map.png"
        ).then(({ uri }) => {
            this.setState({ image: uri })
            console.log('Finished downloading to ', uri);
        });
    };

    render() {
        console.log(this.state.image)
        console.log(`${baseUrl}shortestPath/${this.state.imageId}`)
        return (
            <View style={[styles.container, {backgroundColor: "black"}]}>
                <TouchableOpacity onPress={() => this.setState({ imagePreview: true })}>
                    <Image
                        source={{
                            uri: `${baseUrl}shortestPath/${this.state.imageId}`,
                        }}
                        // source={this.state.image}
                        style={{ width: width, height: 300 }}
                    />
                </TouchableOpacity>

                <Button onPress={() => this._downImage()}>Hello Jee</Button>
                <Modal visible={this.state.imagePreview} transparent>
                    <ImageViewer
                        imageUrls={[{ url: `${baseUrl}shortestPath/${this.state.imageId}` }]}
                        onCancel={() => this.setState({ imagePreview: false })}
                        onSwipeDown={() => this.setState({ imagePreview: false })}
                        enableSwipeDown
                    />
                </Modal>
            </View>
        );
    }
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
