import React, { Component } from 'react'
import { Text, View, Button, AsyncStorage } from 'react-native'
import { connect } from "react-redux";

// Local imports
import { removeToken } from '../../redux'

export class MainScreen extends Component {
    componentDidMount(){
        // AsyncStorage.clear()
    }
    render() {
        return (
            <View>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Login')} />
                <Button title="Signup" onPress={() => this.props.navigation.navigate('Signup')} />
                <Button title="Logout" onPress={() => this.props.removeToken()} />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: () => dispatch(removeToken())
    };
  };
  
  export default connect(null, mapDispatchToProps)(MainScreen);
