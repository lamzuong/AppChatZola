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

export default function InviteAddFrReceive() {
  const { user, dispatch } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [renderUser, setRenderUser] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [listInvite, setListInvite] = useState([]);
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user.id);
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
        setCurrentUser(res);
        setListInvite(res.listReceiver);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, [renderUser]);
  //========================
  var listReceive = [];
  const [listMem, setListMem] = useState([]);
  useEffect(() => {
    var i = 0;
    const getInfoFriends = async (mem) => {
      try {
        const res = await axiosCilent.get("/zola/users/" + mem);
        listReceive.push(res);
        ++i;
        if (i === listInvite.length) {
          setListMem(listReceive);
          i = 0;
          console.log(listMem);
        }
      } catch (error) {
        console.log(error);
      }
    };
    listInvite.forEach((element) => {
      getInfoFriends(element);
    });
    if (listInvite.length == 0) {
      setListMem([]);
    }
  }, [listInvite, renderList]);
  //========================
  const denyInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/denyFriend", {
        userId: currentUser.id,
        friendId: id,
        listReceiver: currentUser.listReceiver,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const acceptInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/acceptFriend", {
        userId: currentUser.id,
        friendId: id,
        listReceiver: currentUser.listReceiver,
        friends: currentUser.friends,
      });
      const res = await axiosCilent.get("/zola/users/" + user.id);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    } catch (err) {
      console.log(err);
    }
  };
  //==================
  function render() {
    setRenderUser(!renderUser);
    setRenderList(!renderList);
  }
  function deleteTemp(index) {
    var listTemp = [...listMem];
    listTemp.splice(index, 1);
    setListMem(listTemp);
  }
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
                      // deleteTemp(index);
                      render();
                    }}
                  >
                    <AntDesign name="checkcircle" size={30} color="#33ff10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      denyInvite(item.id);
                      // deleteTemp(index);
                      render();
                    }}
                  >
                    <AntDesign name="closecircle" size={30} color="#ff1a1a" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
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
