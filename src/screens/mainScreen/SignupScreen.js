import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, Modal, ScrollView, Alert } from "react-native";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { setToken } from "../../redux";
import styles from "./styles";
import LoadingScreen from "../../components/Loading";
import color from "../../constants/color";
import { images } from "../../constants/images";

export class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            gender: "",
            modalVisible: false,
            isLoading: false
        };
    }

    _sendCred = async () => {
        const { username, password, firstname, lastname, gender } = this.state;
        const { setToken, fetchPromotions, fetchStore, fetchUser, fetchCart, fetchLists } = this.props;
        this.setState({ isLoading: true });
        if (username && password) {
            setToken(username, password, firstname, lastname, gender).then((res) => {
                this.setState({ modalVisible: true, isLoading: false })
                fetchUser(res[0])
                    .then(() => {
                        this.setState({ modalVisible: false });
                        this._navigateTo("Application");
                    })
                    .catch((error) => console.warn(error));
                fetchCart(res[0]);
                fetchLists(res[0]);
            });
            fetchPromotions();
            fetchStore();
        }
        if (!username || !password) {
            this.setState({ isLoading: false });
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
        const { username, password, firstname, lastname, gender, isLoading } = this.state;
        return (
            <ImageBackground source={images.mainScreenImg} style={{ width: "100%", height: "100%" }}>
                <ScrollView>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="position">
                            <Text style={styles.Logo1}>Smart</Text>
                            <Text style={styles.Logo2}>Shopping</Text>
                            <View style={styles.Underline} />
                            <Text style={styles.FormText}>Create new Account</Text>
                            <View style={styles.rowFlex}>
                                <TextInput
                                    label="First Name"
                                    mode="outlined"
                                    value={firstname}
                                    style={styles.TextInput2}
                                    theme={{ colors: { primary: color[3] } }}
                                    onChangeText={(firstname) => this.setState({ firstname })}
                                    //
                                    placeholder="firstName"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        this.lastName.focus();
                                    }}
                                />
                                <TextInput
                                    label="Last Name"
                                    mode="outlined"
                                    value={lastname}
                                    style={styles.TextInput2}
                                    theme={{ colors: { primary: color[3] } }}
                                    onChangeText={(lastname) => this.setState({ lastname })}
                                    //
                                    placeholder="lastName"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        this.username.focus();
                                    }}
                                    ref={(input) => this.lastName = input}
                                />
                            </View>
                            <View style={styles.radioButton}>
                                <RadioButton
                                    value="Male"
                                    status={gender === "male" ? "checked" : "unchecked"}
                                    onPress={() => {
                                        this.setState({ gender: "male" });
                                    }}
                                    theme={{ colors: { primary: color[3] } }}
                                />
                                <Text style={{ marginTop: 8, color: "black" }}>Male</Text>
                                <RadioButton
                                    value="Female"
                                    status={gender === "female" ? "checked" : "unchecked"}
                                    onPress={() => {
                                        this.setState({ gender: "female" });
                                    }}
                                    theme={{ colors: { primary: color[3] } }}
                                />
                                <Text style={{ marginTop: 8, color: "black" }}>Female</Text>
                            </View>
                            <TextInput
                                label="Username"
                                mode="outlined"
                                value={username}
                                autoCompleteType="email"
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(username) => this.setState({ username })}
                                style={styles.TextInput}
                                theme={{ colors: { primary: color[3] } }}
                                //
                                placeholder="username"
                                returnKeyType="next"
                                returnKeyLabel="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    this.password.focus();
                                }}
                                ref={(input) => this.username = input}
                            />
                            <TextInput
                                label="Password"
                                secureTextEntry={true}
                                mode="outlined"
                                value={password}
                                style={styles.TextInput}
                                theme={{ colors: { primary: color[3] } }}
                                onChangeText={(password) => this.setState({ password })}
                                //
                                placeholder="password"
                                returnKeyType="next"
                                returnKeyLabel="next"
                                blurOnSubmit={false}
                                // onSubmitEditing={() => {
                                //     this.signup.focus();
                                // }}
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
                                    SIGNUP
                                </Button>
                                <Button
                                    mode="contained"
                                    style={[styles.TextInput, styles.btn2]}
                                    onPress={() => this._navigateTo("Login")}
                                    theme={{ colors: { primary: color[3] } }}
                                >
                                    Login
                                </Button>
                            </View>
                            <View style={{ marginVertical: "2.5%" }} />
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
                <Modal 
                    animationType="fade" 
                    transparent 
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
        setToken: (username, password, firstname, lastname, gender) =>
            dispatch(setToken(username, password, firstname, lastname, gender)),
        fetchUser: (token) => dispatch(fetchUser(token)),
        fetchStore: () => dispatch(fetchStore()),
        fetchPromotions: () => dispatch(fetchPromotions()),
        fetchCart: (token) => dispatch(fetchCart(token)),
        fetchLists: (token) => dispatch(fetchLists(token)),
    };
};

export default connect(null, mapDispatchToProps)(SignupScreen);
