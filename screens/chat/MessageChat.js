import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import styleModal from "./style/styleModalImage";
import { Video, AVPlaybackStatus } from "expo-av";
import TransferList from "./TransferList";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function MessageChat(props) {
  const { user } = useContext(AuthContext);

  const time = props.time;
  const group = props.group;
  const item = props.item;
  const messGroup = item.handleGroup;
  const owner = item.sender == user.id;
  let nameShow = item.infoSender.fullName.split(" ").slice(-1);
  useEffect(() => {
    if (item.deleted == true) {
      setRemove(true);
    }
  }, [item]);
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
  //===========================
  const [modalVisible, setModalVisible] = useState(false);
  const [ownerMess, setOwnerMess] = useState(true);
  //============================
  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  const [modalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [modalVisibleConversation, setModalVisibleConversation] =
    useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [imgPress, setImgPress] = useState("");
  const [videoPress, setVideoPress] = useState("");
  const [status, setStatus] = useState({});
  const [remove, setRemove] = useState(item.deleted);
  const [personRemove, setPersonRemove] = useState(false);
  useEffect(() => {
    if (item?.removePerson == []) {
      setPersonRemove(false);
    } else {
      item?.removePerson.forEach((e) => {
        if (e == user?.id) {
          setPersonRemove(true);
        }
      });
    }
  }, []);

  //=======Thu hồi==============
  const removeMessage = async (e) => {
    try {
      await axiosCilent.put("/zola/message/recoverMess", { id: item.id });
      socket.emit("remove-to-server", {
        id: item.id,
        conversationID: item.conversationID,
      });
      socket.emit("send-to-server", {
        conversationID: item.conversationID,
      });
    } catch (err) {
      console.log(err);
    }
    setRemove(true);
    setRerender(!rerender);
  };
  const deleteMessage = async (e) => {
    try {
      await axiosCilent.put("/zola/message/deleteMess", {
        id: item.id,
        userId: user.id,
      });
      socket.emit("send-to-server", {
        conversationID: item.conversationID,
      });
    } catch (err) {
      console.log(err);
    }
    setPersonRemove(true);
    setRerender(!rerender);
  };
  //=========Show File=================
  const FileShow = (props) => {
    async function downloadFile(url) {
      await Linking.openURL(url);
    }
    // console.log(props);
    return (
      <TouchableOpacity
        style={styles.viewFile}
        onPress={() => {
          downloadFile(props.e);
        }}
        onLongPress={() => {
          setModalVisible(!modalVisible);
          setOwnerMess(owner);
        }}
      >
        <FontAwesome
          name="file-text"
          size={24}
          color="black"
          style={styles.iconFile}
        />
        <Text style={[styles.txtMess, { fontWeight: "bold" }]}>
          {props.e.split("/").reverse()[0]}
        </Text>
      </TouchableOpacity>
    );
  };
  //====Get All Conversation to Tranfer======
  const [rerender, setRerender] = useState(false);
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosCilent.get("/zola/conversation/" + user.id);
        setConversation(res);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user.id, rerender]);
  //==========================
  return messGroup ? (
    <View style={{ width: "100%", marginVertical: 5 }}>
      <Text
        style={{ textAlign: "center", color: "grey", paddingHorizontal: 30 }}
      >
        {item.mess}
      </Text>
    </View>
  ) : personRemove ? null : (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {ownerMess ? (
                <TouchableOpacity
                  style={[styles.itemModal, { paddingHorizontal: 20 }]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    Alert.alert("Thông báo", "Bạn muốn gỡ tin nhắn này?", [
                      {
                        text: "Hủy",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => removeMessage(),
                      },
                    ]);
                  }}
                >
                  <View>
                    <Ionicons name="remove-circle" size={24} color="black" />
                  </View>
                  <View>
                    <Text style={[styles.txtModal, { marginLeft: 20 }]}>
                      Gỡ tin nhắn
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={styles.itemModal}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  Alert.alert("Thông báo", "Bạn muốn xóa tin nhắn này?", [
                    {
                      text: "Hủy",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => deleteMessage(),
                    },
                  ]);
                }}
              >
                <View style={{ paddingHorizontal: 20 }}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.txtModal}>Xóa tin nhắn</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemModal}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setModalVisibleConversation(!modalVisibleConversation);
                }}
              >
                <View style={{ paddingHorizontal: 20 }}>
                  <Entypo name="arrow-right" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.txtModal}>Chuyển tiếp</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleImage}
        onRequestClose={() => {
          setModalVisibleImage(!modalVisibleImage);
        }}
      >
        <Pressable
          onPress={() => {
            setShowCloseBtn(!showCloseBtn);
          }}
        >
          <View style={styleModal.modalView}>
            {showCloseBtn ? (
              <Pressable
                style={styleModal.btnCloseModal}
                onPress={() => {
                  setModalVisibleImage(!modalVisibleImage);
                }}
              >
                <MaterialIcons name="clear" size={30} color="white" />
              </Pressable>
            ) : (
              <View style={{ height: 40 }}></View>
            )}
            <Image
              source={{
                uri: imgPress,
              }}
              style={styleModal.imageShow}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleVideo}
        onRequestClose={() => {
          setModalVisibleVideo(!modalVisibleVideo);
        }}
      >
        <Pressable
          onPress={() => {
            setShowCloseBtn(!showCloseBtn);
          }}
        >
          <View style={styleModal.modalView}>
            {showCloseBtn ? (
              <Pressable
                style={styleModal.btnCloseModal}
                onPress={() => {
                  setModalVisibleVideo(!modalVisibleVideo);
                }}
              >
                <MaterialIcons name="clear" size={30} color="white" />
              </Pressable>
            ) : (
              <View style={{ height: 40 }}></View>
            )}
            <Video
              style={{ width: "100%", height: "100%", marginTop: -50 }}
              source={{
                uri: videoPress,
              }}
              useNativeControls
              resizeMode="contain"
              // isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConversation}
        onRequestClose={() => {
          setModalVisibleConversation(!modalVisibleConversation);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisibleConversation(!modalVisibleConversation);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, styles.modalViewBonus]}>
              {conversation.map((e, i) =>
                props.item.conversationID == e.id ? null : (
                  <TransferList
                    key={i}
                    conversation={e}
                    currentUser={user}
                    mess={item.mess}
                    img_url={item.img_url}
                  />
                )
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View>
        {owner ? null : (
          <Text style={styles.txtName}>{group ? nameShow : ""}</Text>
        )}
      </View>
      <View style={owner ? styles.styleOwner : styles.styleFriend}>
        <Image
          source={{
            uri: item.infoSender.imageSender
              ? item.infoSender.imageSender
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
            onLongPress={() => {
              setModalVisible(!modalVisible);
              setOwnerMess(owner);
            }}
          >
            <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
              {item.mess}
            </Text>
          </Pressable>
        ) : item.mess == "" ? null : remove == true ? (
          <View style={styles.txtThuHoi}>
            <Text style={[styles.txtMess, { color: "grey" }]}>
              Tin nhắn đã được thu hồi
            </Text>
          </View>
        ) : (
          <Pressable
            style={owner ? styles.txtContentOwner : styles.txtContent}
            onPress={() => {
              setShowTime(!showTime);
            }}
            onLongPress={() => {
              setModalVisible(!modalVisible);
              setOwnerMess(owner);
            }}
          >
            <Text style={owner ? styles.txtMessOwner : styles.txtMess}>
              {item.mess}
            </Text>
          </Pressable>
        )}
      </View>
      <View
        style={
          item.mess == ""
            ? owner
              ? { marginTop: -20 }
              : { marginTop: -40 }
            : { marginTop: 0 }
        }
      >
        {typeof item.img_url != "undefined" && item.img_url.length > 0 ? (
          remove ? (
            <View
              style={
                owner
                  ? [styles.styleOwner]
                  : [styles.styleFriend, { marginLeft: 50 }]
              }
            >
              <View style={styles.txtThuHoi}>
                <Text style={[styles.txtMess, { color: "grey" }]}>
                  Tin nhắn đã được thu hồi
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View
                style={
                  owner
                    ? [styles.styleOwner]
                    : [styles.styleFriend, { marginLeft: 50 }]
                }
              >
                {item.img_url.length === 1 ? (
                  <>
                    <FlatList
                      style={{ marginTop: 5, marginLeft: 10 }}
                      data={item.img_url}
                      renderItem={({ item, index }) => {
                        var fileTypeRender = item.split(".").splice(-1)[0];
                        return fileTypeRender === "mp4" ? (
                          <Pressable
                            onPress={() => {
                              setVideoPress(item);
                              setModalVisibleVideo(!modalVisibleVideo);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Video
                              style={{
                                width: 250,
                                height: 150,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: item,
                              }}
                              useNativeControls
                              resizeMode="contain"
                              // isLooping
                              onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                              }
                            />
                          </Pressable>
                        ) : fileTypeRender == "png" ||
                          fileTypeRender == "jpg" ||
                          fileTypeRender == "jpeg" ||
                          fileTypeRender == "gif" ||
                          fileTypeRender == "jfif" ? (
                          <Pressable
                            onPress={() => {
                              setImgPress(item);
                              setModalVisibleImage(!modalVisibleImage);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Image source={{ uri: item }} style={styles.img1} />
                          </Pressable>
                        ) : null;
                      }}
                      keyExtractor={(item, index) => "_" + index}
                      key={"_"}
                      numColumns={1}
                    />
                    <View>
                      {item.img_url.map((e, i) =>
                        e.split(".").splice(-1)[0] == "docx" ||
                        e.split(".").splice(-1)[0] == "doc" ||
                        e.split(".").splice(-1)[0] == "xlsx" ||
                        e.split(".").splice(-1)[0] == "xls" ||
                        e.split(".").splice(-1)[0] == "csv" ||
                        e.split(".").splice(-1)[0] == "pptx" ||
                        e.split(".").splice(-1)[0] == "ppt" ||
                        e.split(".").splice(-1)[0] == "pdf" ||
                        e.split(".").splice(-1)[0] == "txt" ? (
                          <FileShow key={i} e={e} />
                        ) : null
                      )}
                    </View>
                  </>
                ) : item.img_url.length === 2 ? (
                  <>
                    <FlatList
                      style={{ marginTop: 5, marginLeft: 10 }}
                      data={item.img_url}
                      renderItem={({ item, index }) => {
                        var fileTypeRender = item.split(".").splice(-1)[0];
                        return fileTypeRender === "mp4" ? (
                          <Pressable
                            onPress={() => {
                              setVideoPress(item);
                              setModalVisibleVideo(!modalVisibleVideo);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Video
                              style={{ width: 260, height: 150 }}
                              source={{
                                uri: item,
                              }}
                              useNativeControls
                              resizeMode="contain"
                              onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                              }
                            />
                          </Pressable>
                        ) : fileTypeRender == "png" ||
                          fileTypeRender == "jpg" ||
                          fileTypeRender == "jpeg" ||
                          fileTypeRender == "gif" ||
                          fileTypeRender == "jfif" ? (
                          <Pressable
                            onPress={() => {
                              setImgPress(item);
                              setModalVisibleImage(!modalVisibleImage);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Image source={{ uri: item }} style={styles.img2} />
                          </Pressable>
                        ) : null;
                      }}
                      keyExtractor={(item, index) => "#" + index}
                      key={"#"}
                      numColumns={2}
                    />
                    <View>
                      {item.img_url.map((e, i) =>
                        e.split(".").splice(-1)[0] == "docx" ||
                        e.split(".").splice(-1)[0] == "doc" ||
                        e.split(".").splice(-1)[0] == "xlsx" ||
                        e.split(".").splice(-1)[0] == "xls" ||
                        e.split(".").splice(-1)[0] == "csv" ||
                        e.split(".").splice(-1)[0] == "pptx" ||
                        e.split(".").splice(-1)[0] == "ppt" ||
                        e.split(".").splice(-1)[0] == "pdf" ||
                        e.split(".").splice(-1)[0] == "txt" ? (
                          <FileShow key={i} e={e} />
                        ) : null
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    <FlatList
                      style={{ marginTop: 10, marginLeft: 10 }}
                      data={item.img_url}
                      renderItem={({ item, index }) => {
                        var fileTypeRender = item.split(".").splice(-1)[0];
                        return fileTypeRender === "mp4" ? (
                          <Pressable
                            onPress={() => {
                              setVideoPress(item);
                              setModalVisibleVideo(!modalVisibleVideo);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Video
                              style={{
                                width: 80,
                                height: 100,
                                backgroundColor: "black",
                                borderRadius: 10,
                              }}
                              source={{
                                uri: item,
                              }}
                              useNativeControls
                              resizeMode="contain"
                              onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                              }
                            />
                          </Pressable>
                        ) : fileTypeRender == "png" ||
                          fileTypeRender == "jpg" ||
                          fileTypeRender == "jpeg" ||
                          fileTypeRender == "gif" ||
                          fileTypeRender == "jfif" ? (
                          <Pressable
                            onPress={() => {
                              setImgPress(item);
                              setModalVisibleImage(!modalVisibleImage);
                            }}
                            onLongPress={() => {
                              setModalVisible(!modalVisible);
                              setOwnerMess(owner);
                            }}
                          >
                            <Image source={{ uri: item }} style={styles.img3} />
                          </Pressable>
                        ) : null;
                      }}
                      keyExtractor={(item, index) => "@" + index}
                      key={"@"}
                      numColumns={3}
                    />

                    <View>
                      {item.img_url.map((e, i) =>
                        e.split(".").splice(-1)[0] == "docx" ||
                        e.split(".").splice(-1)[0] == "doc" ||
                        e.split(".").splice(-1)[0] == "xlsx" ||
                        e.split(".").splice(-1)[0] == "xls" ||
                        e.split(".").splice(-1)[0] == "csv" ||
                        e.split(".").splice(-1)[0] == "pptx" ||
                        e.split(".").splice(-1)[0] == "ppt" ||
                        e.split(".").splice(-1)[0] == "pdf" ||
                        e.split(".").splice(-1)[0] == "txt" ? (
                          <FileShow key={i} e={e} />
                        ) : null
                      )}
                    </View>
                  </>
                )}
              </View>
            </>
          )
        ) : null}
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
    marginVertical: 5,
  },
  styleFriend: {
    flexDirection: "row",
    marginLeft: 10,
  },
  txtThuHoi: {
    maxWidth: 200,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgb(245, 241, 241)",
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
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
    maxWidth: 150,
    fontSize: 17,
  },
  txtMessOwner: {
    fontSize: 16,
    color: "white",
  },
  viewFile: {
    maxWidth: 200,
    backgroundColor: "rgb(245, 241, 241)",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconFile: {
    paddingRight: 7,
    paddingLeft: 5,
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
  img1: {
    width: 150,
    height: 240,
    // resizeMode: "contain",
    marginHorizontal: 2,
    borderRadius: 10,
  },
  img2: {
    width: 120,
    height: 120,
    marginHorizontal: 2,
    borderRadius: 7,
  },
  img3: {
    width: 80,
    height: 100,
    marginHorizontal: 2,
    marginBottom: 5,
    borderRadius: 7,
  },
  //=======Modal========
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  txtModal: {
    paddingVertical: 10,
    fontSize: 20,
  },
  itemModal: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalViewBonus: {
    width: "80%",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  //====================
});
