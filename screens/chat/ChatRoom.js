import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
  FlatList,
  BackHandler,
  Pressable,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style/styleChatRoom";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MessageChat from "./MessageChat";
import * as ImagePicker from "expo-image-picker";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import apiConfig from "../../api/apiConfig";
import emotion from "../../data/emotion";
import { RNS3 } from "react-native-aws3";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function ChatRoom({ route }) {
  let { nickname, avatar, conversation, rerenderTemp } = route.params;
  const [conversationRender, setConversationRerender] = useState(conversation);
  const [nameRender, setNameRerender] = useState(nickname);
  const [avaRender, setAvaRerender] = useState(avatar);
  const [friendDeleted, setFriendDeleted] = useState(false);
  useEffect(() => {
    if (route.params.rerenderTemp != null) {
      setRerender(rerenderTemp);
    }
  });
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosCilent.get(
          "/zola/conversation/idCon/" + conversation.id
        );
        // console.log(res.members.length);
        setConversationRerender(res);
        if (res.group) {
          setAvaRerender(res.avatarGroup);
          setNameRerender(res.groupName);
          setNameInChat(res.groupName);
        } else {
          setAvaRerender(avatar);
          setNameRerender(nickname);
          setNameInChat(nickname);
        }
        //=====================
        if (
          !user.friends.includes(
            res.members.filter((id) => id != user.id)[0]
          ) &&
          res.members.length == 2
        ) {
          setFriendDeleted(true);
        } else setFriendDeleted(false);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [rerender, conversation]);
  // console.log(friendDeleted);
  //=============================
  const [rerender, setRerender] = useState(false);
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
    socket.on("server-remove-to-client", (data) => {
      let conversationIDChat;
      try {
        conversationIDChat = conversation.id;
        if (data.conversationID == conversationIDChat) {
          // setMessage([]);
          setRerender(!rerender);
        }
      } catch (error) {}
    });
    socket.on("server-send-to-out", (data) => {
      try {
        // console.log(data.conversation);
        if (data.idDelete == user.id) {
          navigation.navigate("Rooms");
        }
      } catch (error) {}
    });
    socket.on("server-send-to-deleteGroup", (data) => {
      try {
        if (
          data.idDelete.includes(user.id) ||
          data.conversationID === conversation.id
        ) {
          navigation.navigate("Rooms");
        }
      } catch (error) {}
    });
    socket.on("server-send-to-edit", (data) => {
      try {
        if (data.members.includes(user.id)) {
          setRerender(!rerender);
          setNameRerender(data.nameGroup);
          setNameInChat(data.nameGroup);
        }
      } catch (error) {}
    });
    socket.on("server-send-request-friend", (data) => {
      if (data.userReceive == user.id) {
        setRerender(!rerender);
      }
    });
  });
  const navigation = useNavigation();
  //======edit name header chat if it too long====
  const [nameInChat, setNameInChat] = useState(nameRender);
  useEffect(() => {
    const strName = new String(nameInChat);
    if (strName.length > 13) {
      setNameInChat(strName.slice(0, 10) + "...");
    }
  }, [nameInChat]);

  //======edit input text chat======
  const [valueInput, setValueInput] = useState("");
  const [widthInput, setWidthInput] = useState("80%");
  const [hiddenIcon, setHiddenIcon] = useState(false);
  const [hiddenNext, setHiddenNext] = useState(true);
  useEffect(() => {
    if (valueInput === "") {
      setWidthInput("63%");
      setHiddenIcon(false);
      setHiddenNext(true);
    } else if (valueInput != "") {
      setWidthInput("92%");
      setHiddenIcon(true);
      setHiddenNext(false);
    }
  }, [valueInput]);
  //=======getGalleryImageCamera======
  const [imagesSelected, setImagesSelected] = useState([]);
  const arrShowImages = [];
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
    });
    if (result.selected) {
      // Chọn nhiều ảnh
      const arr = result.selected;
      for (let i = 0; i < arr.length; i++) {
        arrShowImages.push(arr[i]);
        //=========
        const fileInfo = await FileSystem.getInfoAsync(arr[i].uri);
        // console.log(fileInfo);
        if (fileInfo.size > 30000000) {
          Alert.alert("Thông báo", "Không được gửi file vượt quá 30MB", [
            {},
            {
              text: "OK",
              onPress: () => {
                setImagesSelected([]);
              },
            },
          ]);
          break;
        }
      }
      setImagesSelected(arrShowImages);
    } else if (result.cancelled) {
    } else if (!result.selected) {
      // Chọn 1 ảnh
      arrShowImages.push(result);
      setImagesSelected(arrShowImages);

      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size > 30000000) {
        Alert.alert("Thông báo", "Không được gửi file vượt quá 30MB", [
          {},
          {
            text: "OK",
            onPress: () => {
              setImagesSelected([]);
            },
          },
        ]);
      }
    }
  };
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.cancelled) {
      const arr = [result];
      setImagesSelected(arr);
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size > 30000000) {
        Alert.alert("Thông báo", "Không được gửi file vượt quá 30MB", [
          {},
          {
            text: "OK",
            onPress: () => {
              setImagesSelected([]);
            },
          },
        ]);
      }
    }
  };
  const PickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/*",
    });
    if (result.type != "cancel") {
      setImagesSelected([result]);
      if (result.size > 30000000) {
        Alert.alert("Thông báo", "Không được gửi file vượt quá 30MB", [
          {},
          {
            text: "OK",
            onPress: () => {
              setImagesSelected([]);
            },
          },
        ]);
      }
    }
  };
  //======getConversation=======
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [render2, setRender2] = useState(true);
  useEffect(() => {
    const getMess = async () => {
      try {
        const res = await axiosCilent.get("/zola/message/" + conversation.id);
        setMessage(res);
      } catch (error) {
        console.log(error);
      }
    };
    getMess();
  }, [conversation.id, rerender, render2]);
  message.sort((a, b) => a.date - b.date);
  //====Send Message======
  const handleSendMessage = async (e) => {
    if (friendDeleted) {
      Alert.alert(
        "Thông báo",
        `Bạn với người dùng này không phải là bạn bè!${"\n"}Nếu muốn nhắn tin xin hãy kết bạn với người dùng này!`
      );
    } else {
      if (valueInput.trim() === "" && imagesSelected.length == 0) {
      } else {
        e.preventDefault();
        let listImg = [];
        if (imagesSelected.length !== 0) {
          imagesSelected.forEach((e) => {
            console.log(e);
            const image = e.uri.split(".");
            const fileType = image[image.length - 1];
            if (fileType == "mp4") {
              const file = {
                uri: e.uri,
                name: uuid.v4() + "-" + e.uri.split("/").reverse()[0],
                type: e.type + "/" + e.uri.split(".").reverse()[0],
              };
              RNS3.put(file, {
                keyPrefix: "",
                bucket: "zola-chat",
                region: "ap-southeast-1",
                accessKey: "AKIA34KECLYEL2WGGHN2",
                secretKey: "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",
                successActionStatus: 201,
              })
                .then((response) => {
                  if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");
                  console.log(response.body);
                })
                .catch((error) => console.log(error));
              listImg.push(file.name);
            } else if (
              fileType == "docx" ||
              fileType == "doc" ||
              fileType == "xlsx" ||
              fileType == "xls" ||
              fileType == "csv" ||
              fileType == "pptx" ||
              fileType == "ppt" ||
              fileType == "pdf" ||
              fileType == "txt"
            ) {
              const file = {
                uri: e.uri,
                name: uuid.v4() + "-" + e.name,
                type: "application/" + fileType,
              };
              RNS3.put(file, {
                keyPrefix: "",
                bucket: "zola-chat",
                region: "ap-southeast-1",
                accessKey: "AKIA34KECLYEL2WGGHN2",
                secretKey: "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",
                successActionStatus: 201,
              })
                .then((response) => {
                  if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");
                  console.log(response.body);
                })
                .catch((error) => console.log(error));
              listImg.push(file.name);
            } else {
              var obj = {
                base64: `data:image/jpeg;base64,${e.base64}`,
                fileType: fileType,
                name: e.uri.split("/").slice(-1),
              };
              listImg.push(obj);
            }
          });
        }
        const message1 = {
          conversationID: conversation.id,
          sender: user.id,
          mess: valueInput,
          listImg: listImg,
        };
        try {
          await axiosCilent.post("/zola/message/mobile", message1);
          socket.emit("send-to-server", {
            mess: valueInput,
            senderId: user.id,
            conversationID: conversation.id,
            imgs: imagesSelected.length,
            fullName: user.fullName,
            group: conversation.group,
          });
          setValueInput("");
          setImagesSelected([]);
          setRerender(!rerender);
          setRender2(!render2);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  //========ChatInfo======
  let chatInfo = "ChatInfo";
  if (conversation.group) chatInfo = "ChatInfoGroup";
  //=====Sroll to end=======
  const flatlistRef = useRef();
  const [timeScroll, setTimeScroll] = useState(2000);
  React.useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (flatlistRef.current && message && message.length > 0) {
        flatlistRef.current.scrollToEnd({ animated: true });
        setTimeScroll(1000);
      }
    }, timeScroll);
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);
  //======Button Back=======
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Rooms", {
        conId: conversation.id,
        nameGroup: nameRender,
        avaGroup: avaRender,
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [nameRender, avaRender]);
  //=====Emoji=========
  const [emoji, setEmoji] = useState(false);
  const ListEmoji = () => {
    return (
      <FlatList
        style={{ marginTop: 10 }}
        data={emotion}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setValueInput((text) => text + item.char);
              }}
              style={{
                width: Dimensions.get("window").width / 7,
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ fontSize: 28 }}>{item.char}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={7}
        keyExtractor={(item, index) => index}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    );
  };
  const emojiList = useMemo(() => {
    return <ListEmoji />;
  }, []);
  //===================
  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginBottom: 10 }]}>
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => {
              navigation.navigate("Rooms", {
                conId: conversation.id,
                nameGroup: nameRender,
                avaGroup: avaRender,
              });
            }}
          >
            <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", marginTop: 5 }}>
          <Text style={styles.nickname}>{nameInChat}</Text>
          <Text style={styles.statusUser}>Đang hoạt động</Text>
        </View>
        <View
          style={{
            width: "40%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={[styles.iconTop]}>
            <Ionicons name="call-outline" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconTop]}>
            <MaterialIcons name="video-call" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconTop]}
            onPress={() => {
              navigation.navigate(chatInfo, {
                name: nameRender,
                ava: avaRender,
                conversation: conversationRender,
                rerenderTemp: rerender,
              });
            }}
          >
            <Ionicons name="options" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        // data={message.reverse()}
        // inverted
        // onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
        data={message}
        renderItem={({ item }) => (
          <MessageChat
            time={item.date}
            group={conversation.group}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index + item}
        ref={flatlistRef}
      />
      {/* Xem trước ảnh */}
      <View>
        {imagesSelected[0]?.type == "success" ? (
          <FlatList
            data={imagesSelected}
            renderItem={({ item, index }) => (
              <View style={styles.viewFile}>
                <FontAwesome
                  name="file-text"
                  size={24}
                  color="black"
                  style={styles.iconFile}
                />
                <Text
                  style={{ fontWeight: "bold", maxWidth: 150, fontSize: 17 }}
                >
                  {item.name}
                </Text>
                <Pressable
                  style={styles.btnRemoveFile}
                  onPress={() => {
                    const taskListTemp = imagesSelected;
                    taskListTemp.splice(index, 1);
                    setImagesSelected(taskListTemp);
                    setRerender(!rerender);
                  }}
                >
                  <Text style={{ padding: 5, fontSize: 15, marginTop: -5 }}>
                    x
                  </Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => index}
            horizontal={true}
          />
        ) : (
          <FlatList
            data={imagesSelected}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 100, height: 100, marginHorizontal: 10 }}
                />
                <Pressable
                  style={styles.btnRemoveImg}
                  onPress={() => {
                    const taskListTemp = imagesSelected;
                    taskListTemp.splice(index, 1);
                    setImagesSelected(taskListTemp);
                    setRerender(!rerender);
                  }}
                >
                  <Text style={{ padding: 5, fontSize: 15, marginTop: -5 }}>
                    x
                  </Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => index}
            horizontal={true}
          />
        )}
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        {hiddenIcon ? null : (
          <View style={styles.iconBottom}>
            <TouchableOpacity
              style={{ justifyContent: "center", marginRight: 5 }}
              onPress={PickDocument}
            >
              <Entypo name="attachment" size={24} color="rgb(0,145,255)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={showImagePicker}>
              <MaterialIcons name="image" size={30} color="rgb(0,145,255)" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={openCamera}>
              <AntDesign name="camera" size={30} color="rgb(0,145,255)" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 2 }}>
              <MaterialIcons
                name="keyboard-voice"
                size={30}
                color="rgb(0,145,255)"
              />
            </TouchableOpacity>
          </View>
        )}
        {hiddenNext ? null : (
          <TouchableOpacity
            onPress={() => {
              setWidthInput("63%");
              setHiddenIcon(false);
              setHiddenNext(true);
            }}
          >
            <MaterialIcons
              name="navigate-next"
              size={40}
              color="rgb(0,145,255)"
            />
          </TouchableOpacity>
        )}
        <View style={{ width: widthInput, flexDirection: "row" }}>
          <View style={styles.chatInput}>
            <TextInput
              style={{ maxWidth: "90%" }}
              underlineColorAndroid="transparent"
              placeholder="Nhập tin nhắn..."
              multiline
              numberOfLines={1000}
              onChangeText={(valueInput) => setValueInput(valueInput)}
              value={valueInput}
              onPressIn={() => {
                setWidthInput("92%");
                setHiddenIcon(true);
                setHiddenNext(false);
                setEmoji(false);
              }}
            />
          </View>

          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => {
              setEmoji(!emoji);
              Keyboard.dismiss();
            }}
          >
            <Entypo
              name="emoji-happy"
              size={24}
              color="rgb(0,145,255)"
              style={{ marginLeft: -35 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 3, marginLeft: 10 }}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={30} color="rgb(0,145,255)" />
          </TouchableOpacity>
        </View>
      </View>
      {emoji ? (
        <View style={{ height: 200, width: "100%" }}>{emojiList}</View>
      ) : null}
    </View>
  );
}
