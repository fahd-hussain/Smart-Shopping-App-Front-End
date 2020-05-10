import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { setToken } from "../../redux";
import styles from "./styles";
import LoadingScreen from "../../components/Loading";

export class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
    };
  }
  sendCred = async () => {
    const { username, password, firstname, lastname, gender } = this.state;
    this.props.setToken(username, password, firstname, lastname, gender)
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
                theme={{ colors: { primary: "#447ab4" } }}
                onChangeText={(firstname) => this.setState({ firstname })}
              />
              <TextInput
                label="Last Name"
                mode="outlined"
                value={lastname}
                style={styles.TextInput2}
                theme={{ colors: { primary: "#447ab4" } }}
                onChangeText={(lastname) => this.setState({ lastname })}
              />
            </View>
            <View style={styles.rowFlex}>
              <RadioButton
                value="Male"
                status={gender === "male" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ gender: "male" });
                }}
                theme={{ colors: { primary: "#447ab4" } }}
              />
              <Text style={{ marginTop: 8, color: "black" }}>Male</Text>
              <RadioButton
                value="Female"
                status={gender === "female" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ gender: "female" });
                }}
                theme={{ colors: { primary: "#447ab4" } }}
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
              theme={{ colors: { primary: "#447ab4" } }}
            />
            <TextInput
              label="Password"
              secureTextEntry={true}
              mode="outlined"
              value={password}
              style={styles.TextInput}
              theme={{ colors: { primary: "#447ab4" } }}
              onChangeText={(password) => this.setState({ password })}
            />
            <View style={styles.rowFlex}>
              <Button
                mode="contained"
                style={styles.TextInput}
                onPress={() => this.sendCred()}
                theme={{ colors: { primary: "#54B0F3" } }}
              >
                SIGNUP
              </Button>
              <Button
                mode="contained"
                style={styles.TextInput}
                onPress={() => this.props.navigation.navigate("Login")}
                theme={{ colors: { primary: "#B1C5C4" } }}
              >
                Login
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
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
