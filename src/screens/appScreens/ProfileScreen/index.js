import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView, Modal } from "react-native";
import { List, ListItem, Icon, Right } from "native-base";
import { Avatar, Text, TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import styles from "./styles";
import { removeToken, fetchUser } from "../../../redux";
import baseUrl from "../../../constants/baseUrl";

class ProfileScreen extends Component {
    state = {
        modalVisible: false,
        text: "",
        label: "",
        DPModal: false,
        imageUrl: "",
    };

    _logout = () => {
        this.props.removeToken();
        this.props.navigation.navigate("Authentication");
    };

    _updateDatabase = () => {
        const { token } = this.props.token;
        const { label, text } = this.state;
        const { _id } = this.props.user.user;
        // this.setState({ isLoading: true });
        // let data = JSON.stringify({ paid: true })

        let data;

        if (label === "First Name") data = new Object({ firstname: text });

        if (label === "Last Name") data = { lastname: text };

        if (label === "Gender") data = { gender: text };

        // console.log(data);
        axios(`${baseUrl}users/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            data,
        })
            .then((res) => {
                fetchUser(token);
                console.log("user update database");
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                console.log("error", error);
                this.setState({ isLoading: false });
            });
    };

    // Image processing
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                // console.log(capturedImage)
                this.processImage(capturedImage.uri);
            }
        }
    };

    getImageFromGallery = async () => {
        const selectImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!selectImage.cancelled) {
            console.log(selectImage);
            this.processImage(selectImage.uri);
        }
    };

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 400 } }], {
            format: "png",
        });
        console.log(processedImage);
        this.setState({ imageUrl: processedImage.uri });
    };

    _sendToServer = () => {
        const { imageUrl } = this.state;
        let uri = imageUrl;
        let uriParts = uri.split(".");
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append("photo", {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        console.log(formData)
        axios("")
    };

    render() {
        const { _id, username, profilePicture, firstname, lastname, gender } = this.props.user.user;
        console.log(this.state.imageUrl);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.displayPictureContainer}>
                        <TouchableOpacity onPress={() => this.setState({ DPModal: true })}>
                            {profilePicture ? (
                                <Avatar.Image size={(Dimensions.get("window").width * 1) / 2} source={profilePicture} />
                            ) : (
                                <Avatar.Icon
                                    size={(Dimensions.get("window").width * 1) / 2}
                                    icon={() => <Icon type="FontAwesome" name="user" style={styles.avatar} />}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <List>
                        <ListItem onPress={() => this.setState({ modalVisible: true, label: "First Name" })}>
                            <View>
                                <Text style={styles.textHeader}>First Name</Text>
                                <Text mode style={styles.text}>
                                    {firstname}
                                </Text>
                            </View>
                        </ListItem>
                        <ListItem onPress={() => this.setState({ modalVisible: true, label: "Last Name" })}>
                            <View>
                                <Text style={styles.textHeader}>Last Name</Text>
                                <Text mode style={styles.text}>
                                    {lastname}
                                </Text>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View>
                                <Text style={styles.textHeader}>Username</Text>
                                <Text mode style={styles.text}>
                                    {username}
                                </Text>
                            </View>
                        </ListItem>
                        <ListItem onPress={() => this.setState({ modalVisible: true, label: "Gender" })}>
                            <View>
                                <Text style={styles.textHeader}>Gender</Text>
                                <Text mode style={styles.text}>
                                    {gender}
                                </Text>
                            </View>
                        </ListItem>
                    </List>
                </ScrollView>
                <List>
                    <ListItem onPress={() => this._logout()}>
                        <Icon type="FontAwesome" name={"sign-out"} style={{ color: "grey" }} />
                        <Text style={{ paddingLeft: 10 }}>LOGOUT</Text>
                    </ListItem>
                </List>
                <Modal
                    visible={this.state.modalVisible}
                    onDismiss={() => this.setState({ modalVisible: false })}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                    animationType="fade"
                >
                    <View style={styles.ModalContainer}>
                        <TextInput
                            label={this.state.label}
                            mode="outlined"
                            // autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ text })}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                        />
                    </View>
                    <Button onPress={() => this._updateDatabase()}>Done</Button>
                </Modal>
                <Modal
                    visible={this.state.DPModal}
                    onDismiss={() => this.setState({ DPModal: false })}
                    onRequestClose={() => this.setState({ DPModal: false })}
                    animationType="fade"
                >
                    <View style={styles.displayPictureModalContainer}>
                        {profilePicture ? (
                            <Image source={profilePicture} style={styles.displayPictureModal} />
                        ) : (
                            <Icon type="FontAwesome" name="user" style={styles.displayPictureModal} />
                        )}
                    </View>
                    <Button onPress={() => this._sendToServer()}>Gallery</Button>
                    <Button onPress={() => this.getImageFromCamera()}>Camera</Button>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: () => dispatch(removeToken()),
        fetchUser: (token) => dispatch(fetchUser(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
