import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style/styleFileMediaGroup";

export default function FileMediaGroup({ navigation, route }) {
  const { listFile, listImg } = route.params;
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
            Ảnh/Video, File
          </Text>
        </View>
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
      <ChooseTab name={select} listImg={listImg} listFile={listFile} />
    </View>
  );
}
function ChooseTab(props) {
  if (props.name == "image") {
    return (
      <FlatList
        data={props.listImg}
        renderItem={({ item }) => <GridView name={item.img} />}
        keyExtractor={(item, index) => index}
        numColumns={3}
        style={{ marginTop: 20 }}
      />
    );
  } else if (props.name == "file") {
    return (
      <ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {props.listFile.map((e, i) => (
            <Files key={i} id={e.id} name={e.file} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const GridView = ({ name }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
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
        <Pressable
          onPress={() => {
            setShowCloseBtn(!showCloseBtn);
          }}
        >
          <View style={styles.modalView}>
            {showCloseBtn ? (
              <Pressable
                style={styles.btnCloseModal}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <MaterialIcons name="clear" size={30} color="white" />
              </Pressable>
            ) : (
              <View style={{ height: 40 }}></View>
            )}
            <Image
              source={{
                uri: name,
              }}
              style={styles.imageShow}
            />
          </View>
        </Pressable>
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
