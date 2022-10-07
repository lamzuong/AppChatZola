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

const mess = [
  {
    id: "1",
    ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
    name: "Phúc Du",
    message: "hello",
  },
  {
    id: "2",
    ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
    name: "Phuc Nguyen",
    message: "hello",
  },
  {
    id: "3",
    ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
    name: "Minh Vuong M4U",
    message: "hello",
  },
  {
    id: "4",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Nam Zuong",
    message: "hello",
  },
  {
    id: "5",
    ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
    name: "Trung Quoc",
    message: "hello",
  },
  {
    id: "6",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Abalatrap",
    message: "hello",
  },
  {
    id: "7",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Watson Dr.",
    message: "hello",
  },
  {
    id: "8",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Nguyen",
    message: "hello",
  },
  {
    id: "9",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Quất",
    message: "hello",
  },
  {
    id: "10",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Vuong",
    message: "hello",
  },
  {
    id: "11",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Nam Quốc",
    message: "hello",
  },
  {
    id: "12",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Phuc",
    message: "hello",
  },
  {
    id: "13",
    ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
    name: "Ân Nguyen",
    message: "hello",
  },
  {
    id: "14",
    ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
    name: "Lam Quoc",
    message: "hello",
  },
  {
    id: "15",
    ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
    name: "Chinh Vuong",
    message: "hello",
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
        {mess.map((e, i) => (
          <ChatList
            key={i}
            id={e.id}
            ava={e.ava}
            name={e.name}
            mess={e.message}
          ></ChatList>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
