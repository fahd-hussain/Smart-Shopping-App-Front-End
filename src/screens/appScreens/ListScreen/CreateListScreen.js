import React, { Component } from "react";
import { Text, View, FlatList, Button, TextInput, Picker } from "react-native";
import { connect } from "react-redux";

// local imports
import { updateList } from "../../../redux";
import styles from "./styles";

class CreateListScreen extends Component {
  state = {
    tasks: this.props.list.list,
    text: "",
    unitType: "mass",
    unitName: "",
    unit: "",
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        (prevState) => {
          let { tasks, text, unitType, unitName, unit } = prevState;
          return {
            tasks: tasks.concat({
              key: tasks.length,
              text: text,
              unitType: unitType,
              unitName: unitName,
              unit: unit,
            }),
            text: "",
            text: "",
            unitType: "mass",
            unitName: "",
            unit: "",
          };
        },
        () => this.props.updateList(this.state.tasks)
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
      () => this.props.updateList(this.state.tasks)
    );
  };

  pushToDatabase = async () => {
    console.log("Push");
    const userToken = this.props.token.token
    console.log(userToken)
    // fetch("https://smartshoppingapp.herokuapp.com/createList", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: userToken,
    //   },
    //   body: JSON.stringify({
    //     content: this.state.tasks,
    //   }),
    // });
  };

  selector = (type) => {
    console.log(type);
    switch (type) {
      case "mass":
        return (
          <Picker
            selectedValue={this.state.unitName}
            style={styles.hideInput}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ unitName: itemValue })
            }
          >
            {MASS.map((ele) => {
              return (
                <Picker.Item
                  label={ele.label}
                  value={ele.value}
                  key={ele.value}
                />
              );
            })}
          </Picker>
        );
      case "volume":
        return (
          <Picker
            selectedValue={this.state.unitName}
            style={styles.hideInput}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ unitName: itemValue })
            }
          >
            {VOLUME.map((ele) => {
              // console.log(ele.label, ele.value)
              return (
                <Picker.Item
                  label={ele.label}
                  value={ele.value}
                  key={ele.value}
                />
              );
            })}
          </Picker>
        );
      case "packet":
        return (
          <Picker
            selectedValue={this.state.unitName}
            style={styles.hideInput}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ unitName: itemValue })
            }
          >
            {PACKET.map((ele) => {
              return (
                <Picker.Item
                  label={ele.label}
                  value={ele.value}
                  key={ele.value}
                />
              );
            })}
          </Picker>
        );

      default:
        return (
          <View>
            <Text>Empty list</Text>
          </View>
        );
    }
  };

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
      <Button onPress={this.pushToDatabase} title="Press me" />
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
              <Text>Oops! You don't have any item</Text>
            </View>
          }
        />
        <TextInput
          style={styles.textInput}
          onChangeText={ text => this.setState({ text }) }
          value={this.state.text}
          placeholder="Add Item"
          returnKeyType="next"
          returnKeyLabel="next"
        />
        {this.state.text ? (
          <View flexDirection="row">
            <Picker
              selectedValue={this.state.unitType}
              style={styles.hideInput}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ unitType: itemValue })
              }
            >
              <Picker.Item label="Mass" value="mass" />
              <Picker.Item label="Volume" value="volume" />
              <Picker.Item label="Packet" value="packet" />
            </Picker>
            {this.selector(this.state.unitType)}
            <TextInput
              style={styles.hideInput}
              onChangeText={(text) => this.setState({ unit: text })}
              onSubmitEditing={this.addTask}
              value={this.state.unit}
              placeholder="Unit"
              returnKeyType="done"
              returnKeyLabel="done"
            />
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.list,
    token: state.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (data) => dispatch(updateList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateListScreen);

const MASS = [
  {
    label: "Kilo",
    value: "kg",
  },
  {
    label: "gram",
    value: "gm",
  },
];
const VOLUME = [
  {
    label: "Litre",
    value: "litre",
  },
  {
    label: "Gallon",
    value: "gallon",
  },
];
const PACKET = [
  {
    label: "Packet",
    value: "packet",
  },
  {
    label: "Box",
    value: "box",
  },
];
