import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./style/styleTransferList";
import { useNavigation } from "@react-navigation/native";
import axiosCilent from "../../api/axiosClient";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";
import { AuthContext } from "../../context/AuthContext";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function TransferList(props) {
  const conversation = props.conversation;
  const [friends, setFriend] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const friendID = conversation.members.find(
      (m) => m !== props.currentUser.id
    );
    const getInfoFriends = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + friendID);
        setFriend(res);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoFriends();
  }, [conversation.members, props.currentUser]);
  let img = "";
  let name = "";
  if (conversation.members.length > 2) {
    img = conversation.avatarGroup;
    name = conversation.groupName;
  } else {
    img = friends?.img ? friends.img : null;
    name = friends?.fullName;
  }
  const strName = new String(name);
  if (strName.length > 15) {
    name = strName.slice(0, 12) + "...";
  }
  //======================
  const [send, setSend] = useState(false);
  const mess = props.mess;
  const img_url = props.img_url;
  const handleSendMessage = async (e) => {
    if (mess.trim() === "" && img_url.length == 0) {
    } else {
      e.preventDefault();
      const message = {
        conversationID: conversation.id,
        sender: user.id,
        mess: mess,
        listImg: img_url,
      };
      try {
        await axiosCilent.post("/zola/message/mobile", message);
        socket.emit("send-to-server", {
          mess: mess,
          senderId: user.id,
          conversationID: conversation.id,
          imgs: img_url.length,
          fullName: user.fullName,
          group: conversation.members.length > 2,
        });
        setSend(true);
        ToastAndroid.show("Gửi thành công", ToastAndroid.SHORT);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //======================
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.items}>
        <Image
          source={{
            uri: img,
          }}
          style={styles.imageAva}
        />
        <View style={styles.user}>
          <Text style={styles.nickname}>{name}</Text>
          {send ? (
            <View style={styles.sended}>
              <Text style={{ fontWeight: "bold", color: "grey" }}>Đã gửi</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btnSend}
              onPress={handleSendMessage}
            >
              <Text style={{ fontWeight: "bold" }}>Gửi</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
