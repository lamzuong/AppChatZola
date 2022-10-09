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

export default function ChatInfo({ navigation, route }) {
  const { name, ava } = route.params;
  const [select, setSelected] = useState("image");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
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
      <View style={styles.viewTab}>
        <TouchableOpacity
          onPress={() => {
            setSelected("image");
          }}
        >
          <Text
            style={select == "image" ? styles.tabSelected : styles.tabNoSelect}
          >
            Ảnh/Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("file");
          }}
        >
          <Text
            style={select == "file" ? styles.tabSelected : styles.tabNoSelect}
          >
            File
          </Text>
        </TouchableOpacity>
      </View>
      <ChooseTab name={select} />
    </View>
  );
}
function ChooseTab(tab) {
  if (tab.name == "image") {
    return (
      <FlatList
        data={listImg}
        renderItem={({ item }) => <GridView name={item.img} />}
        // keyExtractor={(item, index) => index}
        numColumns={3}
        style={{ marginTop: 20 }}
      />
    );
  } else if (tab.name == "file") {
    return (
      <ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {listFile.map((e, i) => (
            <Files key={i} id={e.id} name={e.file} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const GridView = ({ name }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable
            style={{
              alignItems: "flex-end",
              paddingRight: 10,
              paddingTop: 10,
              zIndex: 4,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <MaterialIcons name="clear" size={30} color="white" />
          </Pressable>
          <Image
            source={{
              uri: name,
            }}
            style={styles.imageShow}
          />
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Image
          source={{
            uri: name,
          }}
          style={styles.imageItem}
        />
      </Pressable>
    </View>
  );
};
const Files = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.fileItem}>
        <AntDesign name="filetext1" size={24} color="black" />
        <Text style={styles.fileName}>{props.name}</Text>
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
  },
  imgAva: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  viewTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  tabNoSelect: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  tabSelected: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  imageItem: {
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width / 3,
  },
  fileItem: {
    padding: 20,
    flexDirection: "row",
    paddingLeft: 40,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  fileName: {
    fontSize: 17,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageShow: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    marginTop: -50,
  },
});
