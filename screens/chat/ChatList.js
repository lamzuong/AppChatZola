import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./style/styleChatList";
import { useNavigation } from "@react-navigation/native";
import axiosCilent from "../../api/axiosClient";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";
import { AuthContext } from "../../context/AuthContext";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function ChatList(props) {
  const navigation = useNavigation();
  const [nameInChat, setNameInChat] = useState(props.name);
  const strName = new String(nameInChat);
  if (strName.length > 25) {
    setNameInChat(strName.slice(0, 22) + "...");
  }

  //========================
  const conversation = props.conversation;
  const [friends, setFriend] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const friendID = props.conversation.members.find(
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
  }, [props.conversation.members, props.currentUser]);
  let img = "";
  let name = "";
  if (props.conversation.group) {
    img = props.conversation.avatarGroup;
    name = props.conversation.groupName;
  } else {
    img = friends?.img ? friends.img : null;
    name = friends?.fullName;
  }
  //========getLastMessage===================
  const [message, setMessage] = useState([]);
  const [messageLast, setMessageLast] = useState("");
  const [imgLast, setImgLast] = useState("");

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    socket.off();
    socket.on("server-send-to-client", (data) => {
      let conversationIDChat;
      try {
        // conversationIDChat = conversation.id;
        // console.log(data.conversationID + "____" + conversation.id);
        // if (data.conversationID == conversationIDChat) {
        setRerender(!rerender);
        // let nameShow = data?.fullName.split(" ").slice(-1);
        // if (data.imgs > 0) {
        //   if (data.senderId == user.id)
        //     setMessageLast("Bạn đã gửi " + data.imgs + " tập tin");
        //   else setMessageLast(nameShow + " đã gửi " + data.imgs + " tập tin");
        // } else {
        //   if (data.senderId == user.id) {
        //     setMessageLast("Bạn: " + data.mess);
        //   } else if (data.group) {
        //     setMessageLast(nameShow + ": " + data.mess);
        //   } else setMessageLast(data.mess);
        // }
        // }
      } catch (error) {
        console.log(error);
      }
    });
  });
  useEffect(() => {
    const getMess = async () => {
      try {
        const res = await axiosCilent.get("/zola/message/" + conversation.id);
        setMessage(res.sort((a, b) => a.date - b.date));
        // console.log(2);
      } catch (error) {
        console.log(error);
      }
    };
    getMess();
  }, [conversation, rerender]);
  message.sort((a, b) => a.date - b.date);

  let group = conversation.group;
  let lastMess = "";
  if (message.slice(-1).length > 0) {
    let foo = message.slice(-1);
    // console.log(foo[0].mess + foo[0].deleted);
    let senderID = foo[0].sender;
    let nameShow = foo[0].infoSender.fullName.split(" ").slice(-1);
    if (foo[0].deleted == true) {
      lastMess = "Đã thu hồi";
    } else {
      if (foo[0].img_url.length > 0 && typeof foo[0].img_url !== "undefined") {
        if (senderID == user.id)
          lastMess = "Bạn đã gửi " + foo[0].img_url.length + " tập tin";
        else
          lastMess = nameShow + " đã gửi " + foo[0].img_url.length + " tập tin";
      } else {
        if (senderID == user.id) {
          lastMess = "Bạn: " + foo[0].mess;
        } else if (group == true) {
          lastMess = nameShow + ": " + foo[0].mess;
        } else lastMess = foo[0].mess;
      }
    }
  } else {
    lastMess = "Hãy bắt đầu cuộc trò chuyện !";
  }
  //======================
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
            {messageLast || imgLast ? (
              <>
                <Text style={styles.chatLastTime}>{messageLast}</Text>
              </>
            ) : (
              <>
                <Text style={styles.chatLastTime}>{lastMess}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
