import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  Platform,
} from "react-native";

import CustomHeader from "../../components/CustomHeader";
import CreateListBtn from "../../components/CreateListBtn";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default class ListScreen extends Component {
  state = {
    tasks: [],
    text: "",
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: "",
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  deleteTask = (i) => {
    this.setState(
      (prevState) => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  // getData = async () => {
  //   console.log("get");
  //   const userToken = await AsyncStorage.getItem("userToken");
  //   fetch("https://smartshoppingapp.herokuapp.com/readList", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: userToken,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((tasks) => Tasks.save(tasks));
  // };

  componentDidMount = async () => {
    // this.getData();
    Tasks.all((tasks) => this.setState({ tasks: tasks || [] }));
  };

  render() {
    console.log(this.state.tasks);
    return (
      <>
        <View
          style={[styles.container, { paddingBottom: this.state.viewPadding }]}
        >
          <FlatList
            style={styles.list}
            data={this.state.tasks}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem}>{item.text}</Text>
                  <Button title="Drop" onPress={() => this.deleteTask(index)} />
                </View>
                <View style={styles.hr} />
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text>Oops! You don't have any Tasks</Text>
              </View>
            }
          />
        </View>
      </>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map((task) => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("LISTS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("LISTS", this.convertToStringWithSeparators(tasks));
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20,
  },
  list: {
    width: "100%",
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },
  hr: {
    height: 1,
    backgroundColor: "#fff000",
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%",
  },
});
