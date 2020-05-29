import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, Modal } from "react-native";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { setToken } from "../../redux";
import styles from "./styles";
import LoadingScreen from "../../components/Loading";
import color from "../../constants/color";

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
        };
    }

    _sendCred = async () => {
        const { username, password, firstname, lastname, gender } = this.state;
        const { setToken } = this.props;
        this.setState({ modalVisible: true });
        if (username && password) {
            setToken(username, password, firstname, lastname, gender).then(() => {
                this.setState({ modalVisible: false });
                this._navigateTo("Application");
            });
        }
        if (!username || !password) {
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
        const { username, password, firstname, lastname, gender } = this.state;
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
                        <Text style={styles.FormText}>Create new Account</Text>
                        <View style={styles.rowFlex}>
                            <TextInput
                                label="First Name"
                                mode="outlined"
                                value={firstname}
                                style={styles.TextInput2}
                                theme={{ colors: { primary: color[3] } }}
                                onChangeText={(firstname) => this.setState({ firstname })}
                            />
                            <TextInput
                                label="Last Name"
                                mode="outlined"
                                value={lastname}
                                style={styles.TextInput2}
                                theme={{ colors: { primary: color[3] } }}
                                onChangeText={(lastname) => this.setState({ lastname })}
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
                        />
                        <TextInput
                            label="Password"
                            secureTextEntry={true}
                            mode="outlined"
                            value={password}
                            style={styles.TextInput}
                            theme={{ colors: { primary: color[3] } }}
                            onChangeText={(password) => this.setState({ password })}
                        />
                        <View style={styles.rowButtonFlex}>
                            <Button
                                mode="contained"
                                style={styles.TextInput}
                                onPress={() => this._sendCred()}
                                theme={{ colors: { primary: color[1] } }}
                            >
                                SIGNUP
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.TextInput}
                                onPress={() => this._navigateTo("Login")}
                                theme={{ colors: { primary: color[3] } }}
                            >
                                Login
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </View>
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

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (username, password, firstname, lastname, gender) =>
            dispatch(setToken(username, password, firstname, lastname, gender)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
