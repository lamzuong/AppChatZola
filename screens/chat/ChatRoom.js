import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styleChatRoom";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MessageChat from "./MessageChat";

export default function ChatRoom({ route }) {
  const { nickname, avatar, message } = route.params;
  const navigation = useNavigation();
  const [valueInput, setValueInput] = React.useState("");
  const [nameInChat, setNameInChat] = React.useState(nickname);
  const strName = new String(nameInChat);
  if (strName.length > 15) {
    setNameInChat(strName.slice(0, 12) + "...");
  }
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
        <View style={{ width: "27%", flexDirection: "row", marginTop: 5 }}>
          <TouchableOpacity>
            <MaterialIcons name="image" size={30} color="rgb(0,145,255)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBottom}>
            <AntDesign name="camera" size={30} color="rgb(0,145,255)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBottom}>
            <MaterialIcons
              name="keyboard-voice"
              size={30}
              color="rgb(0,145,255)"
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "73%", flexDirection: "row" }}>
          <TextInput
            style={styles.chatInput}
            underlineColorAndroid="transparent"
            placeholder="Nhập tin nhắn..."
            multiline
            numberOfLines={99}
            onChangeText={(valueInput) => setValueInput(valueInput)}
            value={valueInput}
          />

          <TouchableOpacity style={[styles.iconBottom, { marginTop: 3 }]}>
            <Ionicons name="send" size={30} color="rgb(0,145,255)" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
