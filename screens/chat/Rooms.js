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
import SearchBar from "./SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axiosCilent from "../../api/axiosClient";

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
const user = [
  {
    id: "1",
    ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
    name: "Phúc Du",
  },
  {
    id: "2",
    ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
    name: "Phuc Nguyen",
  },
  {
    id: "3",
    ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
    name: "Minh Vuong M4U",
  },
  {
    id: "4",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Nam Zuong",
  },
  {
    id: "5",
    ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
    name: "Trung Quoc",
  },
  {
    id: "6",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Abalatrap",
  },
  {
    id: "7",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Watson",
  },
  {
    id: "8",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Nguyen",
  },
  {
    id: "9",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Quất",
  },
  {
    id: "10",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Vuong",
  },
  {
    id: "11",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Nam Quốc",
  },
  {
    id: "12",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Phuc",
  },
  {
    id: "13",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Ân Nguyen",
  },
  {
    id: "14",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Lam Quoc",
  },
  {
    id: "15",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Chinh Vuong",
  },
];
const group = [
  {
    idGr: 1,
    ava: "https://thumbs.dreamstime.com/b/teamwork-group-friends-logo-image-holding-each-other-39918563.jpg",
    name: "Anh em cay khe",
    users: [user[0], user[2], user[4], user[6]],
    message: [
      {
        owner: user[0],
        title: "Hello",
        time: "Hôm nay 1:00 p.m",
      },
      {
        owner: user[2],
        title: "Hi",
        time: "Hôm nay 1:00 p.m",
      },
      {
        owner: user[4],
        title: "Chào",
        time: "Hôm nay 1:00 p.m",
      },
      {
        owner: user[6],
        title: "2222",
        time: "Hôm nay 1:00 p.m",
      },
      {
        owner: "own",
        title: "Hi",
        time: "Hôm nay 1:01 p.m",
      },
      {
        owner: user[2],
        title: "Nhóm mình tuần sau đi chơi Vũng tàu đi",
        time: "Hôm nay 1:02 p.m",
      },
      {
        owner: "own",
        title: "Cần chuẩn bị gì không?",
        time: "Hôm nay 1:03 p.m",
      },
      {
        owner: user[4],
        title: "Đem tiền nhiều là được",
        time: "Hôm nay 1:04 p.m",
      },
      {
        owner: user[6],
        title: "Đúng rồi tới chỗ thiếu gì thì móc tiền mua thoi",
        time: "Hôm nay 1:05 p.m",
      },
      {
        owner: user[4],
        title: "Nghe ổn đó",
        time: "Hôm nay 1:05 p.m",
      },
      {
        owner: user[0],
        title: "Đúng rồi làm vậy là tiện nhất rồi, khỏi suy nghĩ",
        time: "Hôm nay 1:05 p.m",
      },
      {
        owner: "own",
        title: "Hay đó ae",
        time: "Hôm nay 1:06 p.m",
      },
      {
        owner: "own",
        title: "Tuần sau chủ nhật triển thoi",
        time: "Hôm nay 1:07 p.m",
      },
      {
        owner: user[0],
        title: "Okela",
        time: "Hôm nay 1:07 p.m",
      },
      {
        owner: user[0],
        title: "Tui rủ thêm bạn tui nha",
        time: "Hôm nay 1:08 p.m",
      },
      {
        owner: "own",
        title: "Ok càng đông càng vui",
        time: "Hôm nay 1:08 p.m",
      },
    ],
  },
  {
    idGr: 2,
    users: [user[1], user[6], user[10], user[11]],
    message: [],
  },
  {
    idGr: 3,
    users: [user[2], user[4], user[7], user[12]],
    message: [],
  },
  {
    idGr: 4,
    users: [user[3], user[9], user[12], user[13]],
    message: [],
  },
  {
    idGr: 5,
    users: [user[4], user[5], user[10], user[14]],
    message: [],
  },
];
const userChat = [
  {
    user: user[0],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[1],
    messageLast: messageChat2[messageChat.length - 1].title,
    messageAll: messageChat2,
    typeChat: "user",
  },
  {
    user: user[2],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[3],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[4],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[5],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[6],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[7],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[8],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[9],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[10],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[11],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[12],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[13],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    user: user[14],
    messageLast: messageChat[messageChat.length - 1].title,
    messageAll: messageChat,
    typeChat: "user",
  },
  {
    group: group[0],
    messageLast: group[0].message[group[0].message.length - 1].title,
    messageAll: group[0].message,
    typeChat: "group",
  },
];

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
      <ScrollView>
        {conversation.map((e, i) => (
          <ChatList key={i} conversation={e} currentUser={user} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
