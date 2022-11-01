import * as React from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
  BackHandler,
  Alert,
} from "react-native";
import ChatList from "./ChatList";
import styles from "./styleRooms";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axiosCilent from "../../api/axiosClient";

export default function Rooms({ navigation }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [conversation, setConversation] = useState([]);
  const { user } = useContext(AuthContext);
  const [rerender, setRerender] = useState(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgb(13,120,202)" />
      <View style={styles.header}>
        <Pressable
          style={styles.btnSearch}
          onPress={() => {
            navigation.navigate("AddFriend");
          }}
        >
          <EvilIcons
            name="search"
            size={40}
            color="white"
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.txtSearch}>Tìm kiếm</Text>
        </Pressable>
        {/* <SearchBar title="Nhập tên cần tìm..." /> */}
        <Menu
          style={{ flex: 1, marginTop: 40 }}
          visible={visible}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Ionicons
                name="add-outline"
                size={40}
                color="white"
                style={styles.iconAdd}
              />
            </TouchableOpacity>
          }
          onRequestClose={closeMenu}
        >
          <TouchableOpacity
            style={styles.menuFunction}
            onPress={() => {
              navigation.navigate("AddFriend");
            }}
          >
            <AntDesign
              name="adduser"
              size={24}
              color="black"
              style={styles.iconMenu}
            />
            <Text style={styles.iconMenu}>Thêm bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuFunction}
            onPress={() => {
              navigation.navigate("AddGroup");
            }}
          >
            <AntDesign
              name="addusergroup"
              size={24}
              color="black"
              style={styles.iconMenu}
            />
            <Text style={styles.iconMenu}>Tạo nhóm</Text>
          </TouchableOpacity>
        </Menu>
      </View>
      {conversation.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, color: "grey" }}>
            Bạn chưa có cuộc trò chuyện nào!
          </Text>
        </View>
      ) : (
        <ScrollView>
          {conversation.map((e, i) => (
            <ChatList key={i} conversation={e} currentUser={user} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
