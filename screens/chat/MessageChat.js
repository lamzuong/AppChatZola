import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function MessageChat(props) {
  const owner = props.owner;
  return (
    <View
      style={
        owner
          ? {
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: 10,
            }
          : { flexDirection: "row", marginTop: 20, marginLeft: 10 }
      }
    >
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/f3/cb/59/f3cb596a2f7fa0535aa9654b538de30a.jpg",
        }}
        style={owner ? null : styles.imageAva}
      />
      <View>
        <View style={owner ? styles.txtContentOwner : styles.txtContent}>
          <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
            Boa Hancock nhìn nứng quá ae ơi
          </Text>
        </View>
        <View style={styles.time}>
          <Text style={{ color: "grey" }}>Today 1:00 p.m</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageAva: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  txtContent: {
    maxWidth: 200,
    backgroundColor: "rgb(245, 241, 241)",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtMess: {
    fontSize: 16,
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
    marginLeft: 20,
  },
});
