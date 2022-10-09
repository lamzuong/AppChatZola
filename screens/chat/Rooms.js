import * as React from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import ChatList from "./ChatList";
import styles from "./styleRooms";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

const messageChat = [
  {
    owner: false,
    title: "Hello",
    time: "Hôm nay 1:00 p.m",
  },
  {
    owner: true,
    title: "Hi",
    time: "Hôm nay 1:01 p.m",
  },
  {
    owner: false,
    title: "Rất vui được gặp bạn!!",
    time: "Hôm nay 1:02 p.m",
  },
  {
    owner: true,
    title: "Có chuyện gì không ?",
    time: "Hôm nay 1:03 p.m",
  },
  {
    owner: false,
    title: "Tui muốn hỏi là bạn có tài liệu môn công nghệ mới không?",
    time: "Hôm nay 1:04 p.m",
  },
  {
    owner: false,
    title: "Gửi tui với",
    time: "Hôm nay 1:05 p.m",
  },
  {
    owner: true,
    title: "À có chứ",
    time: "Hôm nay 1:06 p.m",
  },
  {
    owner: true,
    title: "Tí nữa tui gửi cho",
    time: "Hôm nay 1:07 p.m",
  },
  {
    owner: false,
    title: "OK cám ơn nha",
    time: "Hôm nay 1:07 p.m",
  },
  {
    owner: false,
    title: "À còn môn gì nữa gửi hết cho tui luôn đi",
    time: "Hôm nay 1:08 p.m",
  },
  {
    owner: true,
    title: "OK nha",
    time: "Hôm nay 1:08 p.m",
  },
];
const messageChat2 = [
  {
    owner: false,
    title: "Hello",
    time: "Hôm nay 1:00 p.m",
  },
  {
    owner: true,
    title: "Hi",
    time: "Hôm nay 1:01 p.m",
  },
  {
    owner: false,
    title: "Ngày mai kiểm tra 1 tiết môn toán",
    time: "Hôm nay 1:02 p.m",
  },
  {
    owner: true,
    title: "Ủa vậy hã? Mới biết luôn",
    time: "Hôm nay 1:03 p.m",
  },
  {
    owner: false,
    title: "Có bài ôn chưa, hong có thì tui gửi nè",
    time: "Hôm nay 1:04 p.m",
  },
  {
    owner: false,
    title: "Tui mới giải xong đề thầy cho",
    time: "Hôm nay 1:05 p.m",
  },
  {
    owner: true,
    title: "Gửi tui với, cám ơn bạn nhiều luôn",
    time: "Hôm nay 1:06 p.m",
  },
  {
    owner: true,
    title: "Ngày mai kiểm đúng hong",
    time: "Hôm nay 1:07 p.m",
  },
  {
    owner: false,
    title: "Ừ mai kiểm",
    time: "Hôm nay 1:07 p.m",
  },
  {
    owner: false,
    title: "Lát tui gửi bài qua cho",
    time: "Hôm nay 1:08 p.m",
  },
  {
    owner: true,
    title: "Cám ơn nhiều nha!!",
    time: "Hôm nay 1:08 p.m",
  },
];
const userChat = [
  {
    id: "1",
    ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
    name: "Phúc Du",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "2",
    ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
    name: "Phuc Nguyen",
    messageLast: messageChat2[messageChat.length - 1].title,
    messageAll: messageChat2,
  },
  {
    id: "3",
    ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
    name: "Minh Vuong M4U",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "4",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Nam Zuong",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "5",
    ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
    name: "Trung Quoc",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "6",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Abalatrap",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "7",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Watson Dr.",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "8",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Nguyen",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "9",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Quất",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "10",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Vuong",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "11",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Nam Quốc",
    messageLast: messageChat[messageChat.length - 1].title,

    messageAll: messageChat,
  },
  {
    id: "12",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Phuc",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "13",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Ân Nguyen",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "14",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Lam Quoc",
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
  },
  {
    id: "15",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Chinh Vuong",
    messageLast: messageChat[messageChat.length - 1].title,

    messageAll: messageChat,
  },
];

export default function Rooms({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="rgb(13,120,202)" />
      <View style={styles.header}>
        <SearchBar title="Nhập tên cần tìm..." />
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
          <TouchableOpacity style={styles.menuFunction} onPress={closeMenu}>
            <AntDesign
              name="cloudo"
              size={24}
              color="black"
              style={styles.iconMenu}
            />
            <Text style={styles.iconMenu}>Cloud của tôi</Text>
          </TouchableOpacity>
        </Menu>
      </View>
      <ScrollView>
        {userChat.map((e, i) => (
          <ChatList
            key={i}
            id={e.id}
            ava={e.ava}
            name={e.name}
            messLast={e.messageLast}
            messAll={e.messageAll}
          ></ChatList>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
