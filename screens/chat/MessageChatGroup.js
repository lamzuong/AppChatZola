import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function MessageChatGroup(props) {
  const owner = props.owner;
  const ava = props.ava;
  const title = props.title;
  const time = props.time;
  return (
    <View>
      <View style={owner == "own" ? styles.styleOwner : styles.styleFriend}>
        <Image
          source={{
            uri: ava,
          }}
          style={owner == "own" ? null : styles.imageAva}
        />
        <View
          style={owner == "own" ? styles.txtContentOwner : styles.txtContent}
        >
          <Text style={owner == "own" ? styles.txtMessOwner : styles.txtMess}>
            {title}
          </Text>
        </View>
      </View>
      <View style={owner == "own" ? styles.timeOwner : styles.time}>
        <Text style={{ color: "grey" }}>{time}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageAva: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  styleOwner: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  styleFriend: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  txtContent: {
    maxWidth: 200,
    backgroundColor: "rgb(245, 241, 241)",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtMess: {
    fontSize: 17,
  },
  txtContentOwner: {
    maxWidth: 200,
    backgroundColor: "rgb(0,145,255)",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtMessOwner: {
    fontSize: 16,
    color: "white",
  },
  time: {
    marginLeft: 70,
  },
  timeOwner: {
    marginRight: 20,
    alignItems: "flex-end",
  },
});
