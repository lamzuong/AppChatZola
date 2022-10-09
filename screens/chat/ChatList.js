import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styleChatList";
import { useNavigation } from "@react-navigation/native";

export default function ChatList(props) {
  const navigation = useNavigation();
  const [nameInChat, setNameInChat] = useState(props.name);
  const strName = new String(nameInChat);
  if (strName.length > 25) {
    setNameInChat(strName.slice(0, 22) + "...");
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatRoom", {
            nickname: props.name,
            avatar: props.ava,
            message: props.messAll,
          })
        }
      >
        <View style={styles.items}>
          <Image
            source={{
              uri: props.ava,
            }}
            style={styles.imageAva}
          />
          <View style={styles.user}>
            <Text style={styles.nickname}>{nameInChat}</Text>
            <Text style={styles.chatLastTime}>{props.messLast}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
