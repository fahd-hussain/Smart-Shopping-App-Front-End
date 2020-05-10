import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

// Local Imports
import { getUser } from '../../../redux'

export class HomeScreen extends Component {
    componentDidMount = () => {
        // this.props.getUser(this.props.token.token)
    }

    render() {
        return (
            <View>
                <Text> Home </Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getUser: ( token ) => dispatch(getUser(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

