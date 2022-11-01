import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
  BackHandler,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const listFriends = [
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
  },
  {
    id: "6",
    ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
    name: "Abalatrap",
  },
  {
    id: "7",
    ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
    name: "Watson Dr.",
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
const listTitle = [
  "A",
  "Ă",
  "Â",
  "B",
  "C",
  "D",
  "Đ",
  "E",
  "Ê",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ô",
  "Ơ",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "Ư",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const sort_ListFriends = [...listFriends].sort((a, b) =>
  a.name > b.name ? 1 : -1
);
export default function AddGroup({ navigation }, props) {
  var list = [];
  var setShow = [];
  for (let i = 0; i < listTitle.length; i++) {
    list[i] = [];
    sort_ListFriends.forEach((element) => {
      // lọc theo chữ cái
      if (element.name.startsWith(listTitle[i])) {
        list[i].push(element);
      }
    });
    // ẩn đi nếu không có phần tử nào thuộc chữ cái đó
    if (list[i].length == 0) setShow[i] = false;
    else setShow[i] = true;
  }
  var listAll = [];
  for (let i = 0; i < listTitle.length; i++) {
    listAll[i] = { title: listTitle[i], show: setShow[i], listFr: list[i] };
  }
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
  return (
    <View style={{ justifyContent: "flex-end" }}>
      <Header />
      <FlatList
        data={listAll}
        renderItem={({ item }) => (
          <ViewListFriend
            title={item.title}
            show={item.show}
            list={item.listFr}
          />
        )}
        keyExtractor={(item, index) => index}
      />
      <Footer />
    </View>
  );
}
const ViewListFriend = (props) => {
  return (
    <View>
      {props.show ? <Text style={styles.title}>{props.title}</Text> : null}
      {props.list.map((e, i) => (
        <ItemFriend key={i} id={e.id} ava={e.ava} name={e.name} />
      ))}
    </View>
  );
};
const ItemFriend = (props) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}
    >
      <View style={styles.items}>
        <View style={{ justifyContent: "center", marginRight: 10 }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
            style={styles.styleCkb}
          />
        </View>

        <Image
          source={{
            uri: props.ava,
          }}
          style={styles.imageAva}
        />
        <Text style={styles.nickname}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Header = () => {
  const navigation = useNavigation();
  const [appearX, setAppearX] = useState("");
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconBack}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
      </TouchableOpacity>
      {/* <SearchBar title="Nhập tên cần tìm..." /> */}
      <View style={styles.txtSearch}>
        <EvilIcons
          name="search"
          size={30}
          color="white"
          style={{ paddingRight: 5 }}
        />
        <TextInput
          placeholder="Nhập email hoặc tên cần tìm..."
          style={{ fontSize: 18, color: "white", width: "80%" }}
          placeholderTextColor="rgb(124,189,255)"
          value={appearX}
          onChangeText={(appearX) => setAppearX(appearX)}
          autoFocus={true}
        />

        {appearX && (
          <TouchableOpacity
            onPress={() => {
              setAppearX("");
            }}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.buttonCreate}>
        <Text style={{ color: "white", fontWeight: "bold" }}>TẠO NHÓM</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => {
          Alert.alert("Trở về màn hình chính?", "Bạn có muốn trở về không?", [
            {
              text: "Hủy",
              onPress: () => {},
            },
            { text: "OK", onPress: () => navigation.navigate("Home") },
          ]);
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>HỦY</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    justifyContent: "center",
  },
  txtSearch: {
    height: 40,
    width: "90%",
    flexDirection: "row",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "rgb(124,189,255)",
    borderRadius: 10,
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  iconBack: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  styleCkb: {
    marginTop: 10,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  items: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
  },
  imageAva: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  nickname: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 7,
  },
  footer: {
    height: 130,
    backgroundColor: "white",
    marginTop: 10,
    alignItems: "center",
  },
  buttonCreate: {
    backgroundColor: "rgb(0,145,255)",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
  },
  buttonCancel: {
    backgroundColor: "red",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
  },
});
