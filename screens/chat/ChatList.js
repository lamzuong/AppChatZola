import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styleChatList";
import { useNavigation } from "@react-navigation/native";
import axiosCilent from "../../api/axiosClient";

export default function ChatList(props) {
  const navigation = useNavigation();
  const [nameInChat, setNameInChat] = useState(props.name);
  const strName = new String(nameInChat);
  if (strName.length > 25) {
    setNameInChat(strName.slice(0, 22) + "...");
  }
  //========================
  const conversation = props.conversation;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendID = props.conversation.members.find(
      (m) => m !== props.currentUser.id
    );
    const getInfoFriends = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + friendID);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoFriends();
  }, [props.conversation.members, props.currentUser]);
  let img = "";
  let name = "";
  if (props.conversation.members.length > 2) {
    img = props.conversation.avatarGroup;
    name = props.conversation.groupName;
  } else {
    img = user?.img ? user.img : null;
    name = user?.fullName;
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatRoom", {
            nickname: name,
            avatar: img,
            conversation: conversation,
          })
        }
      >
        <View style={styles.items}>
          <Image
            source={{
              uri: img,
            }}
            style={styles.imageAva}
          />
          <View style={styles.user}>
            <Text style={styles.nickname}>{name}</Text>
            <Text style={styles.chatLastTime}>{props.messLast}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
