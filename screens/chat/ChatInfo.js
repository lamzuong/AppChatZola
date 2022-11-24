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
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styleModal from "./style/styleModalImage";
import { AuthContext } from "../../context/AuthContext";
import axiosCilent from "../../api/axiosClient";
import { Video, AVPlaybackStatus } from "expo-av";

export default function ChatInfo({ navigation, route }) {
  const { name, ava, conversation } = route.params;
  const [select, setSelected] = useState("image");
  const [listImg, setListImg] = useState([]);
  const [listFile, setListFile] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosCilent.get(
          "/zola/conversation/idCon/" + conversation.id
        );
        var listI = [];
        var listF = [];
        res.images.forEach((e) => {
          var type = e.split(".").slice(-1);
          if (
            type == "png" ||
            type == "jpg" ||
            type == "jpeg" ||
            type == "jfif" ||
            type == "gif" ||
            type == "mp4"
          ) {
            listI.push(e);
          } else listF.push(e);
        });
        setListImg(listI);
        setListFile(listF);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [conversation]);
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
      <ChooseTab name={select} listImg={listImg} listFile={listFile} />
    </View>
  );
}
function ChooseTab(props) {
  if (props.name == "image") {
    return (
      <FlatList
        data={props.listImg}
        renderItem={({ item }) => <GridView name={item} />}
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
            <Files key={i} name={e} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const GridView = ({ name }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [status, setStatus] = useState({});
  var fileType = name.split(".").reverse()[0];
  // console.log(fileType);
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
          <View style={styleModal.modalView}>
            {showCloseBtn ? (
              <Pressable
                style={styleModal.btnCloseModal}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <MaterialIcons name="clear" size={30} color="white" />
              </Pressable>
            ) : (
              <View style={{ height: 40 }}></View>
            )}
            {fileType == "mp4" ? (
              <Video
                style={styleModal.imageShow}
                source={{
                  uri: name,
                }}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            ) : (
              <Image
                source={{
                  uri: name,
                }}
                style={styleModal.imageShow}
              />
            )}
          </View>
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => {
          console.log(fileType);
          setModalVisible(!modalVisible);
        }}
      >
        {fileType == "mp4" ? (
          <Video
            style={styles.imageItem}
            source={{
              uri: name,
            }}
            useNativeControls
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image
            source={{
              uri: name,
            }}
            style={styles.imageItem}
          />
        )}
      </Pressable>
    </View>
  );
};
const Files = (props) => {
  async function downloadFile(url) {
    await Linking.openURL(url);
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.fileItem}
        onPress={() => {
          downloadFile(props.name);
        }}
      >
        <AntDesign name="filetext1" size={24} color="black" />
        <Text style={styles.fileName}>
          {props.name.split("/").reverse()[0]}
        </Text>
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
    padding: 15,
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  fileName: {
    fontSize: 17,
    marginLeft: 10,
    maxWidth: "90%",
  },
});
