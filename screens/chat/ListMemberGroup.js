import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Button,
  Pressable,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function ListMemberGroup({ navigation, route }) {
  const { conversation, name, ava, rerender } = route.params;
  const { user } = useContext(AuthContext);
  const [listMem, setListMem] = useState([]);
  const [conversationRender, setConversationRerender] = useState(conversation);
  const [rerenderList, setRerender] = useState(false);
  const [creator, setCreator] = useState({});
  //=======Button Back============
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("ChatInfoGroup", {
        conversation: conversationRender,
        name: name,
        ava: ava,
        tempRender: !rerender,
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  //========================
  var list = [];
  useEffect(() => {
    if (conversationRender.members != 0) {
      var i = 0;
      const getInfoFriends = async (mem) => {
        try {
          const res = await axiosCilent.get("/zola/users/" + mem);
          list.push(res);
          ++i;
          if (i === conversationRender.members.length) {
            const arrSort = list.sort((a, b) =>
              a.fullName > b.fullName ? 1 : -1
            );
            setListMem(arrSort);
            // setRerender(!rerender);
            i = 0;
          }
        } catch (error) {
          console.log(error);
        }
      };
      conversationRender.members.forEach((element) => {
        getInfoFriends(element);
      });
    } else {
      setListMem([]);
    }
  }, [conversationRender.members]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosCilent.get(
          "/zola/conversation/idCon/" + conversation.id
        );
        setConversationRerender(res);
        const res2 = await axiosCilent.get("/zola/users/" + res.creator);
        setCreator(res2);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [rerenderList]);
  useEffect(() => {
    socket.off();
    socket.on("server-send-to-client", (data) => {
      let conversationIDChat;
      try {
        conversationIDChat = conversation.id;
        if (
          data.conversationID == conversationIDChat &&
          data.senderId != user.id
        ) {
          setRerender(!rerender);
        }
      } catch (error) {}
    });
    socket.on("server-send-to-authorized", (data) => {
      try {
        console.log(data);
        if (
          data.idGrant === user.id ||
          data.conversationID === conversationRender.id
        ) {
          setRerender(!rerender);
        }
      } catch (error) {}
    });
  });
  const deleteMem = async (friend) => {
    try {
      var conv = {
        conversationId: conversation.id,
        user: user,
        friend: friend,
        members: conversationRender.members,
      };
      await axiosCilent.put("/zola/conversation/deleteMem", conv);
      socket.emit("send-to-server", {
        conversationID: conversation.id,
      });
      socket.emit("send-to-out", {
        conversationID: conversation.id,
        nameGroup: conversationRender.groupName,
        idDelete: friend.id,
      });
      setRerender(!rerenderList);
    } catch (error) {}
  };
  const ListMem = (props) => {
    let img = props.members.img;
    if (img == "")
      img =
        "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png";
    let name = props.members.fullName;
    return (
      <View style={{ flexDirection: "row" }}>
        {props.conversation.creator == props.members.id ? null : (
          <View style={styles.itemContainer}>
            <View>
              <View style={styles.itemMember}>
                <Image
                  source={{
                    uri: img,
                  }}
                  style={styles.imgAvaMini}
                />
                <Text style={styles.txtNameMember}>
                  {props.members.fullName}{" "}
                  {props.members.id == user.id ? (
                    <Text style={{ color: "rgb(200,200,200)" }}>(Tôi)</Text>
                  ) : null}
                </Text>
              </View>
            </View>
            <View style={styles.iconAction}>
              {props.conversation.creator == props.user.id ? (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Cảnh báo",
                      "Bạn có chắc muốn xóa '" + name + "' ra khỏi nhóm không?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => deleteMem(props.members),
                        },
                      ]
                    );
                  }}
                >
                  <MaterialIcons name="person-remove" size={32} color="red" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
      </View>
    );
  };
  const Creator = (props) => {
    return (
      <View style={styles.itemMember}>
        <Image
          source={{ uri: props.currentUser.img }}
          style={styles.imgAvaMini}
        />
        <Text style={styles.txtNameMember}>
          {props.currentUser.fullName}{" "}
          {props.currentUser.id == user.id ? (
            <Text style={{ color: "rgb(200,200,200)" }}>(Tôi)</Text>
          ) : null}{" "}
          <Entypo name="key" size={22} color="yellow" />
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.navigate("ChatInfoGroup", {
              conversation: conversationRender,
              name: name,
              ava: ava,
              tempRender: !rerender,
            });
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Thành viên nhóm
          </Text>
        </View>
      </View>
      <Creator currentUser={creator} />
      <FlatList
        data={listMem}
        renderItem={({ item }) => (
          <ListMem
            members={item}
            currentUser={user}
            conversation={conversation}
            user={user}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageShow: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    marginTop: -50,
  },
  itemMember: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  imgAvaMini: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  txtNameMember: {
    fontSize: 20,
    marginLeft: 20,
  },
  modalViewInfo: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width - 40,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  contentModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgAvaModal: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  nameModal: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  btnAddFr: {
    backgroundColor: "rgb(0,145,255)",
    padding: 10,
    marginTop: 20,
    width: 120,
    borderWidth: 1,
    borderColor: "rgb(0,145,255)",
  },
  txtAddFr: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
  btnCancelAddFr: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 20,
    width: 120,
    borderWidth: 1,
    borderColor: "rgb(0,145,255)",
  },
  txtCancelAddFr: {
    fontSize: 17,
    color: "rgb(0,145,255)",
    textAlign: "center",
  },
  iconAction: {
    marginRight: 10,
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
