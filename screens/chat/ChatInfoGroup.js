import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style/styleChatInfoGroup";
import { AuthContext } from "../../context/AuthContext";
import axiosCilent from "../../api/axiosClient";
import { Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const listImg = [
  {
    id: 1,
    img: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
  },
  {
    id: 3,
    img: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
  },
  {
    id: 4,
    img: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
  },
  {
    id: 5,
    img: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
  },
  {
    id: 6,
    img: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
  },
  {
    id: 7,
    img: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
  },
  {
    id: 8,
    img: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
  },
  {
    id: 9,
    img: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
  },
  {
    id: 10,
    img: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
  },
  {
    id: 11,
    img: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
  },
  {
    id: 12,
    img: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
  },
  {
    id: 13,
    img: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
  },
  {
    id: 14,
    img: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
  },
  {
    id: 15,
    img: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
  },
  {
    id: 16,
    img: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
  },
  {
    id: 17,
    img: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
  },
];
const listFile = [
  { id: 1, file: "nhom5.doc" },
  { id: 2, file: "nhom5.doc" },
  { id: 3, file: "nhom5.doc" },
  { id: 4, file: "nhom5.doc" },
  { id: 5, file: "nhom5.doc" },
  { id: 6, file: "nhom5.doc" },
  { id: 7, file: "nhom5.doc" },
  { id: 8, file: "nhom5.doc" },
  { id: 9, file: "nhom5.doc" },
];

export default function ChatInfoGroup({ navigation, route }) {
  const { name, ava, conversation, tempRender, rerenderTemp } = route.params;
  const { user } = useContext(AuthContext);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleImg, setModalVisibleImg] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [conversationRender, setConversationRerender] = useState(conversation);
  const [nameRender, setNameRerender] = useState(name);
  const [nameTemp, setNameTemp] = useState(nameRender);
  const [avaRender, setAvaRerender] = useState(ava);
  const [editName, setEditName] = useState(false);
  const [listAdd, setListAdd] = useState(
    user.friends.filter((x) => !conversation.members.includes(x))
  );
  useEffect(() => {
    if (route.params.tempRender != null) {
      setRerender(tempRender);
    }
  });
  const [listMem, setListMem] = useState([]);
  var list = [];
  useEffect(() => {
    if (listAdd != 0) {
      var i = 0;
      const getInfoFriends = async (mem) => {
        try {
          const res = await axiosCilent.get("/zola/users/" + mem);
          list.push(res);
          ++i;
          if (i === listAdd.length) {
            const arrSort = list.sort((a, b) =>
              a.fullName > b.fullName ? 1 : -1
            );
            setListMem(arrSort);
            i = 0;
          }
        } catch (error) {
          console.log(error);
        }
      };
      listAdd.forEach((element) => {
        getInfoFriends(element);
      });
    } else {
      setListMem([]);
    }
  }, [conversationRender.members, listAdd]);
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
        setListAdd(user.friends.filter((x) => !res.members.includes(x)));
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [rerender, conversation]);
  //========Button Back====
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("ChatRoom", {
        nickname: nameRender,
        avatar: avaRender,
        conversation: conversationRender,
        rerenderTemp: !rerenderTemp,
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const [itemChoose, setItemChoose] = useState([]);
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
  const Friend = (props) => {
    return (
      <TouchableOpacity
        style={styles.itemMemAdd}
        onPress={() => {
          onUserPress(props.item);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: props.item.img }}
            style={{ height: 50, width: 50, borderRadius: 100 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>
            {props.item.fullName}
          </Text>
        </View>

        <Checkbox
          status={isUserSelected(props.item) ? "checked" : "unchecked"}
          onPress={() => {
            onUserPress(props.item);
          }}
          style={styles.styleCkb}
        />
      </TouchableOpacity>
    );
  };
  const addMember = async () => {
    try {
      var list = [];
      itemChoose.forEach((e) => {
        list.push(e.id);
      });
      var conv = {
        conversationId: conversation.id,
        listFriendId: list,
        members: conversation.members,
      };
      await axiosCilent.put("/zola/conversation/addMem", conv);
      setRerender(!rerender);
    } catch (error) {}
  };
  //=======getGalleryImageCamera======
  const [imageSelected, setImageSelected] = useState("");
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      setImageSelected(result.uri);
      let imageBase64 = `data:image/jpeg;base64,${result.base64}`;
      const image = result.uri.split(".");
      const fileType = image[image.length - 1];
      try {
        await axiosCilent.put("/zola/conversation/mobile/avaGroup", {
          conversationId: conversation.id,
          avatarGroup: {
            base64: imageBase64,
            fileType: fileType,
          },
          avatarOld: avaRender,
        });
      } catch (err) {
        console.log(err);
      }
      setRerender(!rerender);
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
      setImageSelected(result.uri);
      let imageBase64 = `data:image/jpeg;base64,${result.base64}`;
      const image = result.uri.split(".");
      const fileType = image[image.length - 1];
      try {
        await axiosCilent.put("/zola/conversation/mobile/avaGroup", {
          conversationId: conversation.id,
          avatarGroup: {
            base64: imageBase64,
            fileType: fileType,
          },
          avatarOld: avaRender,
        });
        // setAvaRerender(result.uri);
      } catch (err) {
        console.log(err);
      }
      setRerender(!rerender);
    }
  };
  //==================
  const renameGroup = async (name) => {
    try {
      await axiosCilent.put("/zola/conversation/renameGroup", {
        conversationId: conversation.id,
        groupName: name,
      });
    } catch (error) {}
  };
  //==================
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAdd}
        onRequestClose={() => {
          setModalVisibleAdd(!modalVisibleAdd);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisibleAdd(!modalVisibleAdd);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                style={{ marginTop: 10 }}
                data={listMem}
                renderItem={({ item, index }) => {
                  return <Friend item={item} />;
                }}
                keyExtractor={(item, index) => "#" + index}
                key={"#"}
              />
              <View style={styles.viewBtn}>
                {itemChoose.length > 0 ? (
                  <TouchableOpacity
                    style={[
                      styles.btnAddMem,
                      { backgroundColor: "rgb(0,145,255)" },
                    ]}
                    onPress={() => {
                      addMember();
                      setModalVisibleAdd(!modalVisibleAdd);
                    }}
                  >
                    <Text style={styles.txtAddMem}>Thêm</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[styles.btnAddMem, { backgroundColor: "#ccccff" }]}
                  >
                    <Text style={styles.txtAddMem}>Thêm</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.btnAddMem}
                  onPress={() => {
                    itemChoose.length > 0
                      ? Alert.alert("Thông báo", "Bạn có muốn hủy không?", [
                          {
                            text: "Hủy",
                            onPress: () => {},
                          },
                          {
                            text: "OK",
                            onPress: () => setModalVisibleAdd(!modalVisibleAdd),
                          },
                        ])
                      : setModalVisibleAdd(!modalVisibleAdd);
                  }}
                >
                  <Text style={styles.txtAddMem}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisibleImg}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisibleImg(!modalVisibleImg);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { width: "65%" }]}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  showImagePicker();
                  setModalVisibleImg(!modalVisibleImg);
                }}
              >
                <View styles={{ width: "100%" }}>
                  <FontAwesome
                    name="image"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View styles={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingVertical: 10,
                    }}
                  >
                    Chọn ảnh từ thư viện
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  openCamera();
                  setModalVisibleImg(!modalVisibleImg);
                }}
              >
                <View styles={{ width: "100%" }}>
                  <AntDesign
                    name="camera"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View styles={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingVertical: 10,
                    }}
                  >
                    Chụp ảnh
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.navigate("ChatRoom", {
              nickname: nameRender,
              avatar: avaRender,
              conversation: conversationRender,
              rerenderTemp: !rerenderTemp,
            });
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Tùy chọn
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image source={{ uri: avaRender }} style={styles.imgAva} />
        {editName ? (
          <View>
            <TextInput
              style={[styles.txtNameGr, { textAlign: "center" }]}
              value={nameTemp}
              onChangeText={(text) => setNameTemp(text)}
              selectTextOnFocus={true}
              autoFocus={true}
            />
            <View style={styles.viewBtnRename}>
              <TouchableOpacity
                style={[{ backgroundColor: "blue" }, styles.btnRename]}
                onPress={() => {
                  setNameRerender(nameTemp);
                  setEditName(false);
                  renameGroup(nameTemp);
                }}
              >
                <Text style={styles.txtRename}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{ backgroundColor: "red" }, styles.btnRename]}
                onPress={() => {
                  setNameRerender(nameRender);
                  setNameTemp(nameRender);
                  setEditName(false);
                }}
              >
                <Text style={styles.txtRename}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.txtNameGr}>{nameRender}</Text>
        )}
      </View>
      <View style={styles.viewOption}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setModalVisibleAdd(!modalVisibleAdd);
          }}
        >
          <View style={styles.iconOption}>
            <AntDesign name="addusergroup" size={24} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Thêm{"\n"}thành viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setEditName(true)}
        >
          <View style={styles.iconOption}>
            <AntDesign name="edit" size={24} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Chỉnh sửa{"\n"}tên nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setModalVisibleImg(!modalVisibleImg);
          }}
        >
          <View style={styles.iconOption}>
            <MaterialCommunityIcons
              name="image-edit-outline"
              size={24}
              color="black"
            />
          </View>
          <Text style={{ textAlign: "center" }}>Chỉnh sửa{"\n"}ảnh nhóm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={styles.btnInfoGr}
          onPress={() => {
            navigation.navigate("ListMemberGroup", {
              conversation: conversationRender,
              name: nameRender,
              ava: avaRender,
              rerender: rerender,
            });
          }}
        >
          <Ionicons name="people" size={30} color="black" />
          <View style={styles.borderBot}>
            <Text style={styles.txtInfoGr}>Thành viên nhóm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnInfoGr}
          onPress={() => {
            navigation.navigate("FileMediaGroup", {
              listFile: listFile,
              listImg: listImg,
            });
          }}
        >
          <FontAwesome name="image" size={28} color="black" />
          <View style={styles.borderBot}>
            <Text style={styles.txtInfoGr}>Ảnh/Video, File</Text>
          </View>
        </TouchableOpacity>
        {conversationRender.creator == user?.id ? (
          <TouchableOpacity
            style={styles.btnInfoGr}
            onPress={() => {
              navigation.navigate("ListMemberGrant", {
                conversation: conversationRender,
                name: nameRender,
                ava: avaRender,
                rerender: rerender,
              });
            }}
          >
            <Entypo name="cycle" size={28} color="black" />
            <View style={styles.borderBot}>
              <Text style={styles.txtInfoGr}>Ủy quyền</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.btnInfoGr}>
          <Entypo name="log-out" size={30} color="red" />
          <View style={styles.borderBot}>
            <Text style={[styles.txtInfoGr, { color: "red" }]}>
              Rời khỏi nhóm
            </Text>
          </View>
        </TouchableOpacity>
        {conversationRender.creator == user?.id ? (
          <TouchableOpacity style={styles.btnInfoGr}>
            <AntDesign name="delete" size={30} color="red" />
            <View style={styles.borderBot}>
              <Text style={[styles.txtInfoGr, { color: "red" }]}>
                Giải tán nhóm
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
