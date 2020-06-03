import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, Alert, Modal } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { getToken, fetchUser, fetchCart, fetchLists, fetchPromotions, fetchStore } from "../../redux";
import styles from "./styles";
import LoadingScreen from "../../components/Loading";
import color from "../../constants/color";
import { images } from "../../constants/images";

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            modalVisible: false,
            isLoading: false,
        };
    }

    _sendCred = async () => {
        const { getToken, fetchPromotions, fetchStore, fetchUser, fetchCart, fetchLists } = this.props;

        // const username = "fadi@gmail.com"
        // const username = "ghazi@gmail.com";
        // const password = "123456";
        const { username, password } = this.state;
        
        this.setState({ isLoading: true });
        
        if (username && password) {
            getToken(username, password)
                .then((res) => {
                    this.setState({ isLoading: false, modalVisible: true });
                    fetchUser(res[0])
                        .then(() => {
                            this.setState({ modalVisible: false });
                            this._navigateTo("Application");
                        })
                        .catch((error) => console.warn(error));
                    fetchCart(res[0]);
                    fetchLists(res[0]);
                })
                .catch((error) => console.warn(error));
            fetchPromotions();
            fetchStore();
        }
        if (!username || !password) {
            this.setState({ isLoading: true });
            Alert.alert("Login Failed", "Username and/or Password field should not be empty", [
                {
                    itemName: "Cancel",
                    style: "cancel",
                },
            ]);
        }
    };

    _navigateTo = (path) => {
        this.props.navigation.navigate(path);
    };

    render() {
        const { isLoading, username, password } = this.state
        return (
            <ImageBackground
                source={images.mainScreenImg}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="position">
                        <Text style={styles.Logo1}>Smart</Text>
                        <Text style={styles.Logo2}>Shopping</Text>
                        <View style={styles.Underline} />
                        <Text style={styles.FormText}> Login with Username </Text>
                        <TextInput
                            value={username}
                            placeholder="email"
                            label="Email"
                            mode="outlined"
                            autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(username) => this.setState({ username })}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => { this.password.focus()}}
                        />
                        <TextInput
                            value={password}
                            placeholder="password"
                            label="Password"
                            secureTextEntry={true}
                            mode="outlined"
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            ref={(input) => this.password = input}
                        />
                        <View style={styles.rowButtonFlex}>
                            <Button
                                mode="contained"
                                style={[styles.TextInput, styles.btn1]}
                                onPress={() => this._sendCred()}
                                theme={{ colors: { primary: color[1] } }}
                                loading={isLoading}
                            >
                                LOGIN
                            </Button>
                            <Button
                                mode="contained"
                                style={[styles.TextInput, styles.btn2]}
                                onPress={() => this._navigateTo("Signup")}
                                theme={{ colors: { primary: color[3] } }}
                            >
                                SIGNUP
                            </Button>
                        </View>
                        <View style={{ marginVertical: "2.5%" }} />
                    </KeyboardAvoidingView>
                </View>
                <Modal
                    animationType="fade"
                    visible={this.state.modalVisible}
                >
                    <LoadingScreen />
                </Modal>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (username, password) => dispatch(getToken(username, password)),
        fetchUser: (token) => dispatch(fetchUser(token)),
        fetchStore: () => dispatch(fetchStore()),
        fetchPromotions: () => dispatch(fetchPromotions()),
        fetchCart: (token) => dispatch(fetchCart(token)),
        fetchLists: (token) => dispatch(fetchLists(token)),
    };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
