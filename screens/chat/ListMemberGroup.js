import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Button,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styleChatInfoGroup";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

export default function ListMemberGroup({ navigation, route }) {
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);
  const [listMem, setListMem] = useState([]);
  const [rerender, setRerender] = useState(false);

  var list = [];
  useEffect(() => {
    const getInfoFriends = async (mem) => {
      try {
        const res = await axiosCilent.get("/zola/users/" + mem);
        list.push(res);
        if (mem == conversation.members[conversation.members.length - 1]) {
          const arrSort = list.sort((a, b) =>
            a.fullName > b.fullName ? 1 : -1
          );
          setListMem(arrSort);
          setRerender(!rerender);
        }
      } catch (error) {
        console.log(error);
      }
    };
    conversation.members.forEach((element) => {
      getInfoFriends(element);
    });
  }, [conversation.members]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.goBack();
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
            Thành viên nhóm
          </Text>
        </View>
      </View>
      <MySelf currentUser={user} />
      <FlatList
        data={listMem}
        renderItem={({ item }) => (
          <ListMem
            members={item}
            currentUser={user}
            conversation={conversation}
            user={user}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
const ListMem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addFr, setAddFr] = useState(false);
  const [inListFr, setInListFr] = useState(true);

  let img = props.members.img;
  if (img == "")
    img =
      "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png";
  let name = props.members.fullName;
  return (
    <View style={{ flexDirection: "row" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewInfo}>
            <View style={styles.contentModal}>
              <Image
                source={{
                  uri: img,
                }}
                style={styles.imgAvaModal}
              />
              <Text style={styles.nameModal}>{name}</Text>
              {inListFr ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.btnAddFr, { marginRight: 10 }]}
                  >
                    <Text style={styles.txtAddFr}>Chấp nhận</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnCancelAddFr, { marginLeft: 10 }]}
                  >
                    <Text style={styles.txtCancelAddFr}>Xóa lời mời</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {addFr ? (
                    <TouchableOpacity
                      style={styles.btnCancelAddFr}
                      onPress={() => {
                        setAddFr(!addFr);
                      }}
                    >
                      <Text style={styles.txtCancelAddFr}>Hủy lời mời</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.btnAddFr}
                      onPress={() => {
                        setAddFr(!addFr);
                      }}
                    >
                      <Text style={styles.txtAddFr}>Kết bạn</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {props.members.id == props.currentUser.id ? null : (
        <>
          <View style={{ width: "80%" }}>
            <TouchableOpacity
              style={styles.itemMember}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image
                source={{
                  uri: img,
                }}
                style={styles.imgAvaMini}
              />
              <Text style={styles.txtNameMember}>{props.members.fullName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconAction}>
            {props.conversation.creator == props.user.id ? (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Cảnh báo",
                    "Bạn có chắc muốn xóa '" + name + "' ra khỏi nhóm không?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") },
                    ]
                  );
                }}
              >
                <MaterialIcons name="person-remove" size={32} color="red" />
              </TouchableOpacity>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
};
const MySelf = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.itemMember}>
        <Image
          source={{ uri: props.currentUser.img }}
          style={styles.imgAvaMini}
        />
        <Text style={styles.txtNameMember}>
          {props.currentUser.fullName}{" "}
          <Text style={{ color: "rgb(200,200,200)" }}>(Tôi)</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
