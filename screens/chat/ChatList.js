import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styleChatList";
import { useNavigation } from "@react-navigation/native";

export default function ChatList(props) {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatRoom", {
            nickname: props.name,
            avatar: props.ava,
            message: props.mess,
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
            <Text style={styles.nickname}>{props.name}</Text>
            <Text style={styles.chatLastTime}>{props.mess}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
