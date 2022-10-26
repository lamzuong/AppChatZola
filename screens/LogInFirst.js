import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import axiosCilent from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

export default function LogInFirst({ navigation }) {
  const { user } = React.useContext(AuthContext);

  const [birthday, setbirthday] = useState("");
  const [checked, setChecked] = useState(true);
  const [avatar, setavatar] = useState(
    "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png"
  );

  const [icon, seticon] = useState("calendar");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hidebtn, sethidebtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date === undefined) {
      sethidebtn(false);
    } else {
      setbirthday(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
      seticon("close");
      sethidebtn(true);
      hideDatePicker();
    }
  };

  const handleUpdateUser = async (
    id,
    birthdate,
    gender,
    img,
    fullNameOld,
    birthdateOld,
    genderOld,
    imgOld
  ) => {
    const loginFirst = false;
    try {
      await axiosCilent.put("/zola/users/", {
        id,
        birthdate,
        gender,
        img,
        fullNameOld,
        birthdateOld,
        genderOld,
        imgOld,
        loginFirst,
      });
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };
  //=======getGalleryImageCamera======
  const [imagesSelected, setImagesSelected] = useState([]);
  const arrShowImages = [];
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (result.selected) {
      const arr = result.selected;
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i].uri;
        arrShowImages.push(element);
        setImagesSelected(arrShowImages);
      }
      console.log(arrShowImages);
      console.log(1);
    } else if (!result.selected) {
      arrShowImages.push(result.uri);
      setImagesSelected(arrShowImages);
      console.log(arrShowImages);
      console.log(2);
    }
  };

  const [imageCamera, setImageCamera] = useState("");
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageCamera(result.uri);
      console.log(result.uri);
    }
  };
  //==================
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              styles={{ width: "100%", flexDirection: "row" }}
              onPress={() => {
                showImagePicker();
              }}
            >
              <FontAwesome name="image" size={24} color="black" />
              <Text
                style={{
                  fontSize: 20,
                  paddingVertical: 10,
                }}
              >
                Chọn ảnh từ thư viện
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              styles={{ width: "100%", flexDirection: "row" }}
              onPress={() => {
                openCamera();
              }}
            >
              <AntDesign name="camera" size={24} color="black" />
              <Text
                style={{
                  fontSize: 20,
                  paddingVertical: 10,
                }}
              >
                Chụp ảnh
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="md-arrow-back-sharp" size={30} color="white" />
          </TouchableOpacity>
          <Text style={[styles.textHeader, { marginLeft: 20 }]}>
            Cập nhật thông tin
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleUpdateUser(
              user.id,
              null,
              null,
              null,
              user.fullName,
              user.birthdate,
              user.gender,
              user.img
            );
          }}
        >
          <Text style={styles.textHeader}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoUser}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: avatar }} style={styles.avatarURL}></Image>
          <Ionicons
            name="camera-reverse-outline"
            size={28}
            color="black"
            style={styles.cam}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          showDatePicker();
        }}
      >
        <TextInput
          style={{ fontSize: 18, color: "black", width: "90%" }}
          value={birthday}
          placeholder="Nhập ngày sinh"
          placeholderTextColor="gray"
          editable={false}
          onChangeText={(text) => {
            setbirthday(text);
          }}
        />
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => {
            if (icon === "close") {
              setbirthday("");
              sethidebtn(false);
              seticon("calendar");
            } else {
              showDatePicker();
            }
          }}
        >
          <Ionicons name={icon} size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.gender}>
        <Text style={[styles.text, { marginTop: 5 }]}>Giới tính:</Text>
        <View style={styles.rbnGender}>
          <RadioButton
            value="true"
            status={checked === true ? "checked" : "unchecked"}
            onPress={() => setChecked(true)}
            color="#0091ff"
          />
          <Text style={styles.text}>Nữ</Text>
        </View>
        <View style={styles.rbnGender}>
          <RadioButton
            value="false"
            status={checked === false ? "checked" : "unchecked"}
            onPress={() => setChecked(false)}
            color="#0091ff"
          />
          <Text style={styles.text}>Nam</Text>
        </View>
      </View>

      <TouchableOpacity
        style={hidebtn ? styles.button : styles.buttonhide}
        disabled={!hidebtn}
        onPress={() => {
          handleUpdateUser(
            user.id,
            birthday,
            checked,
            null,
            user.fullName,
            user.birthdate,
            user.gender,
            user.img
          );
        }}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          Cập nhật
        </Text>
      </TouchableOpacity>

      <View>
        {/* <Text>{text}</Text>
                <Button title="Show Date Picker" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date(2000, 1, 1)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  infoUser: {
    marginTop: 20,
    alignItems: "center",
    elevation: 1,
    margin: 20,
  },
  avatarURL: {
    borderColor: "gray",
    borderWidth: 1,
    width: 170,
    height: 170,
    borderRadius: 85,
    aspectRatio: 1,
    padding: 1,
  },
  cam: {
    borderColor: "grey",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 85,
    aspectRatio: 1,
    padding: 1,
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    bottom: -12,
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
  },
  gender: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 25,
  },
  input: {
    marginTop: 10,
    color: "black",
    height: 60,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#0091ff",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingStart: 15,
    backgroundColor: "white",
    flexDirection: "row",
  },
  button: {
    paddingTop: 9,
    color: "white",
    alignItems: "center",
    backgroundColor: "#0091ff",
    height: 50,
    width: 200,
    fontSize: 25,
    borderColor: "#0091ff",
    marginTop: 30,
    borderRadius: 100,
    alignSelf: "center",
  },
  buttonhide: {
    paddingTop: 9,
    color: "white",
    alignItems: "center",
    backgroundColor: "#7EC0EE",
    height: 50,
    width: 200,
    fontSize: 25,
    borderColor: "#0091ff",
    marginTop: 30,
    borderRadius: 100,
    alignSelf: "center",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  iconBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  rbnGender: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  //=======Modal========
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "70%",
    // margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //====================
});
