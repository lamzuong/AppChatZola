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
} from "react-native";
import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style/styleChatRoom";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
import * as FileSystem from "expo-file-system";
// import RNFetchBlob from "rn-fetch-blob";
// import RNFS from "react-native-fs";

const socket = io.connect(apiConfig.baseUrl, {
  transports: ["websocket"],
});
export default function ChatRoom({ route }) {
  let { nickname, avatar, conversation, rerenderTemp } = route.params;
  console.log(nickname);
  const [conversationRender, setConversationRerender] = useState(conversation);
  const [nameRender, setNameRerender] = useState(nickname);
  const [avaRender, setAvaRerender] = useState(avatar);
  useEffect(() => {
    if (route.params.rerenderTemp != null) {
      console.log(1);
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
        setAvaRerender(res.avatarGroup);
        setNameRerender(res.groupName);
        setNameInChat(res.groupName);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [rerender, conversation]);
  //=============================
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    socket.on("server-send-to-client", (data) => {
      let conversationIDChat;
      try {
        conversationIDChat = conversation.id;
        if (
          data.conversationID == conversationIDChat &&
          data.senderId != user.id
        ) {
          console.log(data.conversationID);
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
  });
  const navigation = useNavigation();
  //======edit name header chat if it too long====
  const [nameInChat, setNameInChat] = useState(nameRender);
  useEffect(() => {
    const strName = new String(nameInChat);
    if (strName.length > 15) {
      setNameInChat(strName.slice(0, 12) + "...");
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
      }
      setImagesSelected(arrShowImages);
      // console.log(arrShowImages);
    } else if (result.cancelled) {
    } else if (!result.selected) {
      // Chọn 1 ảnh
      arrShowImages.push(result);
      setImagesSelected(arrShowImages);
      // console.log(result.uri);
    }
  };
  const getBlob = async (uri) => {
    const respone = await fetch(uri);
    const blob = await respone.blob();
    return blob;
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
      // console.log(arr);
    }
  };
  //======getConversation=======
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const getMess = async () => {
      try {
        const res = await axiosCilent.get("/zola/message/" + conversation.id);
        var temp = [...res];
        setMessage(temp);
      } catch (error) {
        console.log(error);
      }
    };
    getMess();
  }, [conversation.id, rerender]);
  message.sort((a, b) => a.date - b.date);

  //====Send Message======
  const handleSendMessage = async (e) => {
    if (valueInput.trim() === "" && imagesSelected.length == 0) {
    } else {
      e.preventDefault();
      let listImg = [];
      if (imagesSelected.length !== 0) {
        imagesSelected.forEach((e) => {
          const image = e.uri.split(".");
          const fileType = image[image.length - 1];
          var obj = {
            base64: `data:image/jpeg;base64,${e.base64}`,
            fileType: fileType,
            name: e.uri.split("/").slice(-1),
            // blob: getBlob(e.uri),
          };
          listImg.push(obj);
        });
        // console.log(listImg);
      }
      const message = {
        conversationID: conversation.id,
        sender: user.id,
        mess: valueInput,
        listImg: listImg,
      };
      try {
        await axiosCilent.post("/zola/message/mobile", message);
        socket.emit("send-to-server", {
          mess: valueInput,
          senderId: user.id,
          conversationID: conversation.id,
          imgs: imagesSelected.length,
          fullName: user.fullName,
          group: conversation.members.length > 2,
        });
        setValueInput("");
        setImagesSelected([]);
        setRerender(!rerender);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //========ChatInfo======
  let chatInfo = "ChatInfo";
  if (conversation.members.length > 2) chatInfo = "ChatInfoGroup";
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
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
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
              navigation.navigate("Rooms");
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
            group={conversation.members.length > 2}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index + item}
        ref={flatlistRef}
      />
      {/* <ScrollView ref={flatlistRef}>
        {message.map((e, i) => (
          <View key={i}>
            <MessageChat
              time={e.date}
              group={conversation.members.length > 2}
              item={e}
            />
          </View>
        ))}
      </ScrollView> */}
      {/* Xem trước ảnh */}
      <View>
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
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        {hiddenIcon ? null : (
          <View style={styles.iconBottom}>
            <TouchableOpacity
              style={{ justifyContent: "center", marginRight: 5 }}
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
