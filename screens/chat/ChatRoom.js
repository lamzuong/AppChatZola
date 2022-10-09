import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styleChatRoom";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MessageChat from "./MessageChat";
import * as ImagePicker from "expo-image-picker";

export default function ChatRoom({ route }) {
  const { nickname, avatar, message } = route.params;
  const navigation = useNavigation();
  const [valueInput, setValueInput] = useState("");
  const [nameInChat, setNameInChat] = useState(nickname);
  const strName = new String(nameInChat);
  if (strName.length > 15) {
    setNameInChat(strName.slice(0, 12) + "...");
  }

  const [widthInput, setWidthInput] = useState("80%");
  const [hiddenIcon, setHiddenIcon] = useState(false);
  const [hiddenNext, setHiddenNext] = useState(true);
  useEffect(() => {
    if (valueInput === "") {
      setWidthInput("73%");
      setHiddenIcon(false);
      setHiddenNext(true);
    } else if (valueInput != "") {
      setWidthInput("92%");
      setHiddenIcon(true);
      setHiddenNext(false);
    }
  }, [valueInput]);

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (result.selected) {
      const arr = result.selected;
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i].uri;
        arrShowImages.push(element);
        setImagesSelected(arrShowImages);
      }
      console.log(arrShowImages);
      console.log(1);
    } else if (!result.selected) {
      arrShowImages.push(result.uri);
      setImagesSelected(arrShowImages);
      console.log(arrShowImages);
      console.log(2);
    }
  };

  const [imageCamera, setImageCamera] = useState("");
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageCamera(result.uri);
      console.log(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => {
              navigation.navigate("Home");
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
              navigation.navigate("ChatInfo", { name: nickname, ava: avatar });
            }}
          >
            <Ionicons name="options" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.body}>
          <MessageChat ava={avatar} />
          <MessageChat owner="true" />
          <MessageChat ava={avatar} />
          <MessageChat ava={avatar} />
          <MessageChat owner="true" />
          <MessageChat owner="true" />
          <MessageChat ava={avatar} />
          <MessageChat ava={avatar} />
          <MessageChat ava={avatar} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {hiddenIcon ? null : (
          <View
            style={{
              width: "27%",
              flexDirection: "row",
              marginTop: 5,
              marginRight: 5,
            }}
          >
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
              setWidthInput("73%");
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
          <TextInput
            style={styles.chatInput}
            underlineColorAndroid="transparent"
            placeholder="Nhập tin nhắn..."
            multiline
            numberOfLines={99}
            onChangeText={(valueInput) => setValueInput(valueInput)}
            value={valueInput}
            onPressIn={() => {
              setWidthInput("92%");
              setHiddenIcon(true);
              setHiddenNext(false);
            }}
          />

          <TouchableOpacity style={[styles.iconBottom, { marginTop: 3 }]}>
            <Ionicons name="send" size={30} color="rgb(0,145,255)" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
