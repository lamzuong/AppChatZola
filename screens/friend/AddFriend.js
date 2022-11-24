import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  FlatList,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function AddFriend({ navigation }, props) {
  //======Button Back=======
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  //===========Search===============
  const [appearX, setAppearX] = useState("");
  const [listPeople, setListPeople] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  useEffect(() => {
    const getPeople = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/search/" + appearX);
        setListPeople(res);
        const res2 = await axiosCilent.get(
          `/zola/conversation/search/group/${user.id}/${appearX}`
        );
        setListGroup(res2);
      } catch (error) {
        console.log(error);
      }
    };
    if (appearX.length > 0) getPeople();
    if (appearX.length == 0) {
      setListPeople([]);
      setListGroup([]);
    }
  }, [appearX]);
  //==========Get List Receive/Sender/Friends=================
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [renderUser, setRenderUser] = useState(false);

  const [listSender, setListSender] = useState([]);
  const [listReceive, setListReceive] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user?.id);
        setCurrentUser(res);
        setListSender(res.listSender);
        setListReceive(res.listReceiver);
        setListFriends(res.friends);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, [renderUser]);
  //========Handle Friends======
  const sendInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/friends", {
        userId: currentUser.id,
        friendId: id,
        listSender: currentUser.listSender,
      });
      socket.emit("request-friend", {
        userReceive: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const cancelInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/cancelFriend", {
        userId: currentUser.id,
        friendId: id,
        listSender: currentUser.listSender,
      });
      socket.emit("request-friend", {
        userReceive: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const denyInvite = async (id) => {
    try {
      await axiosCilent.put("/zola/users/denyFriend", {
        userId: currentUser.id,
        friendId: id,
        listReceiver: currentUser.listReceiver,
      });
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
        userId: currentUser.id,
        friendId: id,
        listReceiver: currentUser.listReceiver,
        friends: currentUser.friends,
      });
      socket.emit("request-friend", {
        userReceive: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  //==================
  const [inListSenderFr, setInListSenderFr] = useState(false);
  const [inListReceiveFr, setInListReceiveFr] = useState(false);
  const [inListFr, setInListFr] = useState(false);
  function isInListSender(id) {
    listSender.forEach((e) => {
      if (e == id) {
        setInListSenderFr(true);
      }
    });
  }
  function isInListReceive(id) {
    listReceive.forEach((e) => {
      if (e == id) {
        setInListReceiveFr(true);
      }
    });
  }
  function isInListFriends(id) {
    listFriends.forEach((e) => {
      if (e == id) {
        setInListFr(true);
      }
    });
  }
  function defaultInList() {
    setInListSenderFr(false);
    setInListReceiveFr(false);
    setInListFr(false);
  }
  //=======Navigate conversation============
  const getConversation = async (id, name, ava) => {
    try {
      const res = await axiosCilent.get("/zola/conversation/idCon/" + id);
      navigation.navigate("ChatRoom", {
        nickname: name,
        avatar: ava,
        conversation: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const navigateChatRoom = async (id, name, ava) => {
    try {
      const res = await axiosCilent.get(
        `/zola/conversation/conversationId/${user.id}/${id}`
      );
      // const res2 = await axiosCilent.get(
      //   "/zola/conversation/idCon/" + res[0].id
      // );
      navigation.navigate("ChatRoom", {
        nickname: name,
        avatar: ava,
        conversation: res,
      });
    } catch (error) {}
  };
  //====================
  const [modalVisible, setModalVisible] = useState(false);
  const [idPeople, setIdPeople] = useState("");
  const [imgPeople, setImgPeople] = useState("");
  const [namePeople, setNamePeople] = useState("");
  const People = ({ id, name, ava }) => {
    return id == currentUser.id ? null : (
      <TouchableOpacity
        style={styles.itemPeople}
        onPress={() => {
          setIdPeople(id);
          setImgPeople(ava);
          setNamePeople(name);
          setModalVisible(!modalVisible);
          isInListSender(id);
          isInListReceive(id);
          isInListFriends(id);
        }}
      >
        <Image source={{ uri: ava }} style={styles.imageAva} />
        <Text style={styles.nickname}>{name}</Text>
      </TouchableOpacity>
    );
  };
  const Group = ({ id, name, ava }) => {
    return (
      <TouchableOpacity
        style={styles.itemPeople}
        onPress={() => {
          getConversation(id, name, ava);
        }}
      >
        <Image source={{ uri: ava }} style={styles.imageAva} />
        <Text style={styles.nickname}>{name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          defaultInList();
          setRenderUser(!renderUser);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
            defaultInList();
            setRenderUser(!renderUser);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewInfo}>
              <View style={styles.contentModal}>
                <Image
                  source={{
                    uri: imgPeople,
                  }}
                  style={styles.imgAvaModal}
                />
                <Text style={styles.nameModal}>{namePeople}</Text>
                {inListReceiveFr ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={[styles.btnAddFr, { marginRight: 10 }]}
                      onPress={() => {
                        setInListReceiveFr(!inListReceiveFr);
                        setInListSenderFr(false);
                        setInListFr(true);
                        acceptInvite(idPeople);
                        setRenderUser(!renderUser);
                      }}
                    >
                      <Text style={styles.txtAddFr}>Chấp nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btnCancelAddFr, { marginLeft: 10 }]}
                      onPress={() => {
                        setInListReceiveFr(!inListReceiveFr);
                        setInListSenderFr(false);
                        denyInvite(idPeople);
                        setRenderUser(!renderUser);
                      }}
                    >
                      <Text style={styles.txtCancelAddFr}>Xóa lời mời</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    {inListSenderFr ? (
                      <TouchableOpacity
                        style={styles.btnCancelAddFr}
                        onPress={() => {
                          setInListSenderFr(!inListSenderFr);
                          setRenderUser(!renderUser);
                          cancelInvite(idPeople);
                        }}
                      >
                        <Text style={styles.txtCancelAddFr}>Hủy lời mời</Text>
                      </TouchableOpacity>
                    ) : (
                      <View>
                        {inListFr ? (
                          <View style={{ flexDirection: "row" }}>
                            <View>
                              <TouchableOpacity
                                style={[
                                  styles.btnCancelAddFr,
                                  { marginRight: 10 },
                                ]}
                                onPress={() => {}}
                              >
                                <Text style={[styles.txtCancelAddFr]}>
                                  Bạn bè
                                </Text>
                              </TouchableOpacity>
                              {/* <TouchableOpacity
                                style={[
                                  styles.btnCancelAddFr,

                                  { marginRight: 10, borderColor: "red" },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.txtCancelAddFr,
                                    { color: "red" },
                                  ]}
                                >
                                  Hủy kết bạn
                                </Text>
                              </TouchableOpacity> */}
                            </View>

                            <TouchableOpacity
                              style={[styles.btnAddFr, { marginLeft: 10 }]}
                              onPress={() => {
                                navigateChatRoom(
                                  idPeople,
                                  namePeople,
                                  imgPeople
                                );
                              }}
                            >
                              <Text style={styles.txtAddFr}>Nhắn tin</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.btnAddFr}
                            onPress={() => {
                              setInListSenderFr(!inListSenderFr);
                              setRenderUser(!renderUser);
                              sendInvite(idPeople);
                            }}
                          >
                            <Text style={styles.txtAddFr}>Kết bạn</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Frame */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={30} color="white" />
        </TouchableOpacity>
        {/* <SearchBar title="Nhập email hoặc tên cần tìm..." /> */}
        <View style={styles.txtSearch}>
          <EvilIcons
            name="search"
            size={30}
            color="white"
            style={{ paddingRight: 5 }}
          />
          <TextInput
            placeholder="Nhập email hoặc tên cần tìm..."
            style={{ fontSize: 18, color: "white", width: "80%" }}
            placeholderTextColor="rgb(124,189,255)"
            value={appearX}
            onChangeText={(appearX) => setAppearX(appearX)}
            autoFocus={true}
          />

          {appearX && (
            <TouchableOpacity
              onPress={() => {
                setAppearX("");
              }}
            >
              <MaterialIcons name="clear" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView>
        {listPeople.length > 0 ? (
          <>
            <View style={styles.title}>
              <Text style={{ fontWeight: "bold", color: "grey" }}>
                Mọi người
              </Text>
            </View>
            {listPeople.map((user) => (
              <People
                key={user.id}
                id={user.id}
                name={user.fullName}
                ava={user.img}
              />
            ))}
          </>
        ) : null}
        {listGroup.length > 0 ? (
          <>
            <View style={styles.title}>
              <Text style={{ fontWeight: "bold", color: "grey" }}>Nhóm</Text>
            </View>
            {listGroup.map((item, index) => (
              <Group
                key={item.id}
                id={item.id}
                name={item.groupName}
                ava={item.avatarGroup}
              />
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconBack: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  txtSearch: {
    height: 40,
    width: "90%",
    flexDirection: "row",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "rgb(124,189,255)",
    borderRadius: 10,
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  itemPeople: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  imageAva: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  nickname: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 7,
  },
  title: {
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: "rgb(245,245,245)",
    marginBottom: 5,
  },
  //=======Modal========
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  //==================
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    width: "90%",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 50,
  },
});
