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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

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

export default function AddGroup({ navigation, route }, props) {
  const { user } = useContext(AuthContext);
  const [listFriendsId, setListFriendsId] = useState([]);
  const [renderUser, setRenderUser] = useState(false);
  const [itemChoose, setItemChoose] = useState([]);
  let { rerender } = route.params;
  //=======================
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user.id);
        setListFriendsId(res.friends);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, [renderUser]);
  //========================
  var listFriends = [];
  const [listMem, setListMem] = useState([]);
  useEffect(() => {
    if (listFriendsId.length != 0) {
      var i = 0;
      const getInfoFriends = async (mem) => {
        try {
          const res = await axiosCilent.get("/zola/users/" + mem);
          listFriends.push(res);
          ++i;
          if (i === listFriendsId.length) {
            setListMem(listFriends);
            i = 0;
          }
        } catch (error) {
          console.log(error);
        }
      };
      listFriendsId.forEach((element) => {
        getInfoFriends(element);
      });
    } else {
      setListMem([]);
    }
  }, [listFriendsId]);
  //=======================
  const sort_ListFriends = [...listMem].sort((a, b) =>
    a.fullName > b.fullName ? 1 : -1
  );
  var list = [];
  var setShow = [];

  for (let i = 0; i < listTitle.length; i++) {
    list[i] = [];
    sort_ListFriends.forEach((element) => {
      // lọc theo chữ cái
      if (element.fullName.startsWith(listTitle[i])) {
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
  //========================

  const AllFriends = () => {
    return (
      <ScrollView>
        {listAll.map((e, i) => (
          <ViewListFriend
            key={i}
            title={e.title}
            show={e.show}
            list={e.listFr}
          />
        ))}
      </ScrollView>
    );
  };
  const ViewListFriend = (props) => {
    return (
      <View>
        {props.show ? <Text style={styles.title}>{props.title}</Text> : null}
        {props.list.map((e, i) => (
          <ItemFriend key={i} user={e} />
        ))}
      </View>
    );
  };
  const ItemFriend = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onUserPress(props.user);
        }}
      >
        <View style={styles.items}>
          <View style={{ justifyContent: "center", marginRight: 10 }}>
            <Checkbox
              status={isUserSelected(props.user) ? "checked" : "unchecked"}
              onPress={() => {
                onUserPress(props.user);
              }}
              style={styles.styleCkb}
            />
          </View>
          <Image
            source={{
              uri: props.user.img,
            }}
            style={styles.imageAva}
          />
          <Text style={styles.nickname}>{props.user.fullName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const isUserSelected = (user) => {
    // xem có id trong itemChoose không, trả về true false
    return itemChoose.some((selectedUser) => selectedUser.id === user.id);
  };
  const onUserPress = (user) => {
    if (isUserSelected(user)) {
      // remove it from selected
      // Lấy những phần tử khác user.id trong mảng có sẵn
      setItemChoose(
        itemChoose.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setItemChoose([...itemChoose, user]);
    }
  };
  return (
    <View>
      <Header />
      <View style={{ height: "68%", marginBottom: 5 }}>
        <AllFriends />
      </View>
      <View style={[styles.reviewItem, { height: "7%" }]}>
        <FlatList
          data={itemChoose}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  style={{ height: 50, width: 50, borderRadius: 100 }}
                  source={{ uri: item.img }}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
      </View>
      <Footer item={itemChoose} rerender={rerender} />
    </View>
  );
}

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
const Footer = (props) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  var bool = true;
  if (props.item.length > 1) bool = false;
  const addGroup = async () => {
    var nameGr = "";
    var memGr = [];
    props.item.forEach((e) => {
      nameGr += e.fullName + ", ";
      memGr.push(e.id);
    });
    nameGr += user.fullName;
    const conversation = {
      members: [...memGr, user.id],
      nameGroup: nameGr,
      id: user.id,
    };
    try {
      await axiosCilent.post("/zola/conversation", conversation);
      Alert.alert("Thông báo", "Tạo nhóm chat thành công!", [
        {},
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Rooms", { rerender: !props.rerender }),
        },
      ]);
    } catch (error) {}
  };
  //====================
  return (
    <View style={styles.footer}>
      {bool ? (
        <View style={[styles.buttonCreate, { backgroundColor: "#ccccff" }]}>
          <Text style={{ color: "white", fontWeight: "bold" }}>TẠO NHÓM</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={() => {
            addGroup();
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>TẠO NHÓM</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => {
          bool
            ? navigation.goBack()
            : Alert.alert(
                "Trở về màn hình chính?",
                "Bạn có muốn trở về không?",
                [
                  {
                    text: "Hủy",
                    onPress: () => {},
                  },
                  { text: "OK", onPress: () => navigation.goBack() },
                ]
              );
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
  reviewItem: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  footer: {
    height: 130,
    backgroundColor: "white",
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
