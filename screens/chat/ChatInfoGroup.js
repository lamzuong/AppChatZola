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
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styleChatInfoGroup";

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
  const { name, ava, conversation } = route.params;
  const [select, setSelected] = useState("image");

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
            Tùy chọn
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image source={{ uri: ava }} style={styles.imgAva} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
          {name}
        </Text>
      </View>
      <View style={styles.viewOption}>
        <TouchableOpacity style={styles.option}>
          <View style={styles.iconOption}>
            <AntDesign name="addusergroup" size={24} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Thêm{"\n"}thành viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View style={styles.iconOption}>
            <AntDesign name="edit" size={24} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Chỉnh sửa{"\n"}tên nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
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
              members: conversation.members,
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
        <TouchableOpacity style={styles.btnInfoGr}>
          <Entypo name="log-out" size={30} color="red" />
          <View style={styles.borderBot}>
            <Text style={[styles.txtInfoGr, { color: "red" }]}>
              Rời khỏi nhóm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
