import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

// Local Imports
import styles from './styles'
import { getAllList } from '../../../redux'

export class HomeScreen extends Component {
    componentDidMount = () => {
        this.props.getAllList(this.props.token.token)
    }

    render() {
        return (
            <View style={styles.container}>
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
        getAllList: ( token ) => dispatch(getAllList(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

