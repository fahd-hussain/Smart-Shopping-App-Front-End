import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Dimensions,
  Share,
} from "react-native";
import { Text, List, ListItem, Icon } from "native-base";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";

// Local Imports
import { removeToken } from "../../../redux";
import styles from './styles'
// import { images } from "../../constants/images";

const LINKS = [
  {
    link: "Share",
    title: "Invite friends",
    iconName: "share",
  },
  {
    link: "Help",
    title: "Help",
    iconName: "question-circle",
  },
  {
    link: "AboutStack",
    title: "About",
    iconName: "info-circle",
  },
  {
    link: "Settings",
    title: "Accounts settings",
    iconName: "cog",
  },
];

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  _logout = () => {
    this.props.removeToken();
    this.props.navigation.navigate("Authentication");
  };

  _share = () => {
    Share.share(
      {
        title: "Smart Shopping App",
        message:
          "Smart Shopping App, best app to save time during shopping.\n" +
          "Download Free from here: " +
          "<URL OF APP>",
      },
      {
        dialogTitle: "Smart Shopping App",
      }
    );
  };

  render() {
    const isAuth = this.props.user.user;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar.Image
            size={(Dimensions.get("window").width * 1) / 2}
            // source={images.sampleProfilePicture}
          />
          {!isAuth ? null : (
            <Text style={{ paddingTop: 10 }} size="xl" bold>
              Hi, {this.props.user.user.firstname}{" "}
              {this.props.user.user.lastname}
            </Text>
          )}
        </View>
        <ScrollView>
          <List>
            {LINKS.map((el) => (
              <ListItem
                onPress={() => {
                  el.link === "Share"
                    ? this._share()
                    : this.props.navigation.navigate(el.link);
                }}
                key={el.link}
              >
                <Icon
                  type="FontAwesome"
                  name={el.iconName}
                  style={{ color: "grey" }}
                />
                <Text style={{ paddingLeft: 10 }}>{el.title}</Text>
              </ListItem>
            ))}
          </List>
        </ScrollView>
        <List>
          <ListItem onPress={() => this._logout()}>
            <Icon
              type="FontAwesome"
              name={"sign-out"}
              style={{ color: "grey" }}
            />
            <Text style={{ paddingLeft: 10 }}>LOGOUT</Text>
          </ListItem>
        </List>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeToken: () => dispatch(removeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
