import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button, Text, TextInput, Modal } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { getToken } from "../../redux";
import styles from "./styles";
import LoadingScreen from '../../components/Loading';
import color from '../../constants/color'

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      modalVisible: false
    };
  }

  componentDidUpdate() {
    // console.log(this.props.token.loading)
    // const username = "fadi@gmail.com"
    // const password = "123456"
    // this.props.getToken(username, password, function(){
    //   console.log("This is callback")
    // });
    if (this.props.token.token){
      this.props.navigation.navigate("Application")
    }
  }
  sendCred = async () =>{
    const username = "fadi@gmail.com"
    const password = "123456"
    this.setState({ modalVisible: true })
    await this.props.getToken(username, password);
    
  }

  navigte = () => {
    this.props.navigation.navigate("Application")
  }
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
            <View style={styles.rowFlex}>
              <Button
                mode="contained"
                style={styles.TextInput}
                onPress={() => this.sendCred()}
                theme={{ colors: { primary: color[3] } }}
              >LOGIN</Button>
              <Button
                mode="contained"
                style={styles.TextInput}
                onPress={() => this.props.navigation.navigate("Register")}
                theme={{ colors: { primary: color[3] } }}
              >SIGNUP</Button>
            </View>
          </KeyboardAvoidingView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ this.state.modalVisible}
        >
          <LoadingScreen style={styles.modal}/>
        </Modal>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (username, password) => dispatch(getToken(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);