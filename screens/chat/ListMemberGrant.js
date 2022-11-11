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
import { RadioButton } from "react-native-paper";
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
  const [checked, setChecked] = useState({});
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
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [rerenderList]);
  const grantPermission = async (newCreator) => {
    try {
      var conv = {
        conversationId: conversation.id,
        creator: newCreator,
        user: user,
      };
      await axiosCilent.put("/zola/conversation/grantPermission", conv);
      setRerender(!rerenderList);
      socket.emit("send-to-authorized", {
        conversationID: conversation.id,
        members: conversationRender.members,
      });
      navigation.navigate("ChatInfoGroup", {
        conversation: conversationRender,
        name: name,
        ava: ava,
        tempRender: !rerender,
      });
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
        {props.members.id == props.currentUser.id ? null : (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => setChecked(props.members)}
          >
            <View style={styles.itemMember}>
              <Image
                source={{
                  uri: img,
                }}
                style={styles.imgAvaMini}
              />
              <Text style={styles.txtNameMember}>{name}</Text>
            </View>
            <View style={styles.iconAction}>
              <RadioButton
                value={props.members.id}
                status={checked === props.members ? "checked" : "unchecked"}
                onPress={() => setChecked(props.members)}
              />
            </View>
          </TouchableOpacity>
        )}
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
            Ủy quyền trưởng nhóm
          </Text>
        </View>
      </View>
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
      <View style={styles.viewBtn}>
        {checked == "" ? (
          <View style={[styles.buttonCreate, { backgroundColor: "#e6e6ff" }]}>
            <Text style={styles.txtBtn}>ỦY QUYỀN</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonCreate}
            onPress={() => {
              grantPermission(checked);
            }}
          >
            <Text style={styles.txtBtn}>ỦY QUYỀN</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.txtBtn}>HỦY</Text>
        </TouchableOpacity>
      </View>
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
  iconAction: {
    marginRight: 10,
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  viewBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  buttonCreate: {
    backgroundColor: "rgb(0,145,255)",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
  },
  buttonCancel: {
    backgroundColor: "red",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
  },
  txtBtn: {
    color: "white",
    fontWeight: "bold",
  },
});
