import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, Alert, Modal } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { getToken, getUser } from "../../redux";
import styles from "./styles";
import LoadingScreen from "../../components/Loading";
import color from "../../constants/color";

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            modalVisible: false,
        };
    }
    
    sendCred = async () => {
        // const username = "fadi@gmail.com"
        const username = "ghazi@gmail.com"
        const password = "123456"
        this.setState({ modalVisible: true });
        // const { username, password } = this.state;
        const { getToken, getUser } = this.props
        if (username && password) {
            getToken(username, password)
            .then((res) => {
                console.log(res[0])
                getUser(res[0])
                    .then(() => {
                        this.setState({ modalVisible: false });
                        this.navigateTo("Application");
                    })
                    .catch((error) => console.warn(error))
            })
            .catch(error => console.warn(error));
        }
        if (!username || !password) {
            Alert.alert("Login Failed", "Username and/or Password field should not be empty", [
                {
                    itemName: "Cancel",
                    style: "cancel",
                },
            ]);
            this.setState({ modalVisible: false });
        }
    };

    navigateTo = ( path ) => {
        this.props.navigation.navigate(path);
    };

    render() {
        return (
            <ImageBackground
                // source={images.mainScreenImg}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="position">
                        <Text style={styles.Logo1}>Welcome</Text>
                        <Text style={styles.Logo2}>TO Smart Shopping</Text>
                        <View style={styles.Underline} />
                        <Text style={styles.FormText}> Login with email </Text>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(username) => this.setState({ username })}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                        />
                        <TextInput
                            label="Password"
                            secureTextEntry={true}
                            mode="outlined"
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                        />
                        <View style={styles.rowButtonFlex}>
                            <Button
                                mode="contained"
                                style={styles.TextInput}
                                onPress={() => this.sendCred()}
                                theme={{ colors: { primary: color[1] }}}
                            >
                                LOGIN
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.TextInput}
                                onPress={() => this.navigateTo("Signup")}
                                theme={{ colors: { primary: color[3] } }}
                            >
                                SIGNUP
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <Modal 
                    animationType="fade" 
                    // transparent 
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
        getUser: (token) => dispatch(getUser(token))
    };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
