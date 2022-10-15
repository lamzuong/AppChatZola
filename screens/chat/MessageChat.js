import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
export default function MessageChat(props) {
  const owner = props.owner;
  const ava = props.ava;
  const title = props.title;
  const time = props.time;
  const group = props.group;

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getInfoFriends = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + props.sender);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoFriends();
  }, [props.sender]);

  let nameShow = user?.fullName.split(" ").slice(-1);

  //==test
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " năm";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " tháng";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " ngày";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " giờ";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " phút";
    }
    // return Math.floor(seconds) + " giây";
    return "";
  }
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
            uri: user?.img ? user.img : null,
          }}
          style={owner ? null : styles.imageAva}
        />
        <View style={owner ? styles.txtContentOwner : styles.txtContent}>
          <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
            {title}
          </Text>
        </View>
      </View>
      <View style={owner ? styles.timeOwner : styles.time}>
        <Text style={{ color: "grey" }}>{timeSince(new Date(time))}</Text>
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
  txtName: {
    marginTop: 5,
    marginLeft: 70,
    color: "grey",
  },
});
