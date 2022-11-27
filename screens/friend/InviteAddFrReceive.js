import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function InviteAddFrReceive() {
  const { user, dispatch } = useContext(AuthContext);
  const [renderUser, setRenderUser] = useState(false);
  const [listInvite, setListInvite] = useState([]);
  const isFocused = useIsFocused();
  // console.log(user);
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user.id);
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
        setListInvite(res.listReceiver);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, [renderUser, isFocused]);
  useEffect(() => {
    socket.off();
    socket.on("server-send-request-friend", (data) => {
      if (data.listUser.includes(user.id)) {
        setRenderUser(!renderUser);
      }
    });
  });
  //========================
  var listReceive = [];
  const [listMem, setListMem] = useState([]);
  useEffect(() => {
    var i = 0;
    if (listInvite.length != 0) {
      const getInfoFriends = async (mem) => {
        try {
          const res = await axiosCilent.get("/zola/users/" + mem);
          listReceive.push(res);
          ++i;
          if (i === listInvite.length) {
            setListMem(listReceive);
            i = 0;
          }
        } catch (error) {
          console.log(error);
        }
      };
      listInvite.forEach((element) => {
        getInfoFriends(element);
      });
    } else {
      setListMem([]);
    }
  }, [listInvite]);
  //========================
  const denyInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/denyFriend", {
        userId: user.id,
        friendId: id,
        listReceiver: user.listReceiver,
      });
      const res = await axiosCilent.get("/zola/users/" + user.id);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      const res2 = await axiosCilent.get("/zola/users/" + user.id);
      setListInvite(res2.listReceiver);
      socket.emit("request-friend", {
        userReceive: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const acceptInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/acceptFriend", {
        userId: user.id,
        friendId: id,
        listReceiver: user.listReceiver,
        friends: user.friends,
      });
      const res = await axiosCilent.get("/zola/users/" + user.id);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      const res2 = await axiosCilent.get("/zola/users/" + user.id);
      setListInvite(res2.listReceiver);
      //======Kiểm tra có cuộc trò chuyện chưa===
      const res3 = await axiosCilent.get(
        `/zola/conversation/conversationId/${user.id}/${id}`
      );
      if (res3.length == 0) {
        await axiosCilent.post("/zola/conversation", {
          members: [user.id, id],
        });
      }
      socket.emit("request-friend", {
        listUser: [user.id, id],
      });
    } catch (err) {
      console.log(err);
    }
  };
  //==================
  return (
    <View style={styles.container}>
      {listMem.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, color: "grey" }}>
            Bạn không có lời mời kết bạn nào
          </Text>
        </View>
      ) : (
        <FlatList
          data={listMem}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item}>
                <TouchableOpacity style={styles.itemLeft}>
                  <Image source={{ uri: item.img }} style={styles.ava} />
                  <Text style={styles.txtName}>{item.fullName}</Text>
                </TouchableOpacity>
                <View style={styles.itemRight}>
                  <TouchableOpacity
                    style={{ marginHorizontal: 10 }}
                    onPress={() => {
                      acceptInvite(item.id);
                    }}
                  >
                    <AntDesign name="checkcircle" size={30} color="#33ff10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      denyInvite(item.id);
                    }}
                  >
                    <AntDesign name="closecircle" size={30} color="#ff1a1a" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  ava: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  txtName: {
    fontSize: 22,
    marginLeft: 20,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
