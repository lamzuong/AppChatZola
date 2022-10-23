import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

export default function MessageChat(props) {
  const { user } = useContext(AuthContext);

  const title = props.title;
  const time = props.time;
  const group = props.group;
  const sender = props.sender;
  const owner = sender == user.id;

  const [userSend, setUserSend] = useState(null);
  useEffect(() => {
    const getInfoFriends = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + sender);
        setUserSend(res);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoFriends();
  }, [sender]);
  let nameShow = userSend?.fullName.split(" ").slice(-1);
  //====getTime=====
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " phút trước";
    }
    // return Math.floor(seconds) + " giây";
    return "Vừa gửi";
  }
  const [showTime, setShowTime] = useState(false);
  return (
    <View>
      <View>
        {owner ? null : (
          <Text style={styles.txtName}>{group ? nameShow : ""}</Text>
        )}
      </View>
      <View style={owner ? styles.styleOwner : styles.styleFriend}>
        <Image
          source={{
            uri: userSend?.img
              ? userSend.img
              : "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png",
          }}
          style={owner ? null : styles.imageAva}
        />
        {showTime ? (
          <Pressable
            style={owner ? styles.txtContentOwnerClick : styles.txtContentClick}
            onPress={() => {
              setShowTime(!showTime);
            }}
          >
            <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
              {title}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={owner ? styles.txtContentOwner : styles.txtContent}
            onPress={() => {
              setShowTime(!showTime);
            }}
          >
            <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
              {title}
            </Text>
          </Pressable>
        )}
      </View>
      {showTime ? (
        <View style={owner ? styles.timeOwner : styles.time}>
          <Text style={{ color: "grey" }}>{timeSince(new Date(time))}</Text>
        </View>
      ) : null}
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
    marginLeft: 10,
  },
  txtContent: {
    maxWidth: 200,
    backgroundColor: "rgb(245, 241, 241)",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtContentOwner: {
    maxWidth: 200,
    backgroundColor: "rgb(0,145,255)",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtContentClick: {
    maxWidth: 200,
    backgroundColor: "#a6a6a6",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtContentOwnerClick: {
    maxWidth: 200,
    backgroundColor: "#000099",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  txtMess: {
    fontSize: 17,
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
  txtName: {
    marginTop: 5,
    marginLeft: 70,
    color: "grey",
  },
});
