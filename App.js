import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import styles from "./common/styles.js";
class NodeChat extends Component {
  render() {
    return (
      <View style={styles.chatLineView}>
        <Text style={styles.itemUserName}>{this.props.sender}</Text>
        <Text style={styles.itemText}>{this.props.chatContent}</Text>
      </View>
    );
  }
}
export default class ChatList extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      chatData: [],
      username: "bienthaikieusa", //thay đổi username khi cài vào một máy khác
      chatInputContent: "",
    };
  }
  _getMessages = () => {
    fetch("https://chitchatapi-app.herokuapp.com/messages")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ chatData: json });
      })
      .catch((error) => console.error(error));
  };
  _sendMessage = () => {
    let chatContent = this.state.chatInputContent;
    let username = this.state.username;

    fetch("https://chitchatapi-app.herokuapp.com/message/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: "123",
        messages: chatContent,
        status: 1,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ chatInputContent: "" });
        Keyboard.dismiss();
      })
      .catch((error) => console.error(error));
  };
  _renderChatLine = (item) => {
    if (item.username === this.state.username) {
      return (
        <View style={{ alignItems: "flex-end" }}>
          <NodeChat sender="You" chatContent={item.messages} />
        </View>
      );
    }
    return <NodeChat sender={item.username} chatContent={item.messages} />;
  };
  _onChangeChatInput = (text) => {
    this.setState({ chatInputContent: text });
  };
  componentDidMount() {
    this.refresh = setInterval(() => this._getMessages(), 2000); //reload lại list tin nhắn sau mỗi 2s
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          imageStyle={{ opacity: 0.4 }}
          source={require("./assets/Images/background.jpg")}
          style={styles.imgBackground}
        >
          <FlatList
            data={this.state.chatData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }, index) => this._renderChatLine(item)}
          />
        </ImageBackground>

        <View style={{ flex: 1 / 10 }}>
          <View style={styles.chatTextboxView}>
            <View style={{ flex: 8 / 10 }}>
              <TextInput
                placeholder="Typing..."
                value={this.state.chatInputContent}
                onChangeText={(text) => this._onChangeChatInput(text)}
                style={{ height: 100, fontSize: 18 }}
              />
            </View>
            <View style={{ flex: 2 / 10 }}>
              <TouchableOpacity onPress={() => this._sendMessage()}>
                <View style={styles.button}>
                  <Text style={styles.touchText}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
