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
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styleModal from "./styleModalImage";

export default function MessageChat(props) {
  const { user } = useContext(AuthContext);

  const time = props.time;
  const group = props.group;
  const item = props.item;
  const owner = item.sender == user.id;
  let nameShow = item.infoSender.fullName.split(" ").slice(-1);

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
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [imgPress, setImgPress] = useState("");
  //============================
  return (
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
                        onPress: () => console.log("OK Pressed"),
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
                      onPress: () => console.log("OK Pressed"),
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
        ) : item.mess == "" ? null : (
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
              : { marginTop: -50 }
            : { marginTop: 0 }
        }
      >
        {typeof item.img_url != "undefined" && item.img_url.length > 0 ? (
          <View
            style={
              owner
                ? [styles.styleOwner]
                : [styles.styleFriend, { marginLeft: 50 }]
            }
          >
            {item.img_url.length === 1 ? (
              <FlatList
                style={{ marginTop: 5, marginLeft: 10 }}
                data={item.img_url}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setImgPress(item);
                        setModalVisibleImage(!modalVisibleImage);
                      }}
                    >
                      <Image source={{ uri: item }} style={styles.img1} />
                    </Pressable>
                  );
                }}
                keyExtractor={(item, index) => "_" + index}
                key={"_"}
                numColumns={1}
              />
            ) : item.img_url.length === 2 ? (
              <FlatList
                style={{ marginTop: 5, marginLeft: 10 }}
                data={item.img_url}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setImgPress(item);
                        setModalVisibleImage(!modalVisibleImage);
                      }}
                    >
                      <Image source={{ uri: item }} style={styles.img2} />
                    </Pressable>
                  );
                }}
                keyExtractor={(item, index) => "#" + index}
                key={"#"}
                numColumns={2}
              />
            ) : (
              <FlatList
                style={{ marginTop: 10, marginLeft: 10 }}
                data={item.img_url}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setImgPress(item);
                        setModalVisibleImage(!modalVisibleImage);
                      }}
                    >
                      <Image source={{ uri: item }} style={styles.img3} />
                    </Pressable>
                  );
                }}
                keyExtractor={(item, index) => "@" + index}
                key={"@"}
                numColumns={3}
              />
            )}
          </View>
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
  imgSender: {},
  imgReceive: {},
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
  //====================
});
