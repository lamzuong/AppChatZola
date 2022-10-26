import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
export default function Profile({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [rerender, setRerender] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (route.params != null) {
      setRerender(route.params.rerender);
    }
  });

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user?.id);
        setCurrentUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(new Date());
    getInfoUser();
  }, [rerender]);
  const [userName, setuserName] = useState("Anya");
  const [avatar, setavatar] = useState(
    "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
  );
  const [birthday, setBirthday] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("abc123@gmail.com");

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  async function resetpass() {
    navigation.navigate("ResetPassword");
  }

  function updateProfile() {
    navigation.navigate("UpdateProfile", {
      user: currentUser,
      rerender: rerender,
    });
  }

  async function logout() {
    Alert.alert("Cảnh báo", "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?", [
      {
        text: "Ở lại",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: () => {
          navigation.navigate("Welcome");
        },
      },
    ]);
  }
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
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
          Thông tin cá nhân
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible); }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  styles={{ width: "100%" }}
                  onPress={() => {
                    showImagePicker();
                  }}
                >
                  <FontAwesome name="image" size={25} color="black" style={{ margin: 10, marginTop: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  styles={{ width: "100%" }}
                  onPress={() => {
                    showImagePicker();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      paddingVertical: 10,
                    }}
                  >
                    Chọn ảnh từ thư viện
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  styles={{ width: "100%" }}
                  onPress={() => {
                    openCamera();
                  }}
                >
                  <AntDesign name="camera" size={25} color="black" style={{ margin: 10, marginTop: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  styles={{ width: "100%" }}
                  onPress={() => {
                    openCamera();
                  }}
                >
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
          </View>
        </TouchableWithoutFeedback>
      </Modal>
          <View style={styles.containerUser}>
            <View style={styles.infoUser}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{
                    uri: currentUser?.img
                      ? currentUser.img
                      : "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png",
                  }}
                  style={styles.AvatarURL}
                ></Image>

                <Ionicons
                  name="camera-reverse-outline"
                  size={28}
                  color="black"
                  style={styles.cam}
                />
              </TouchableOpacity>

              <TextInput
                editable={false}
                style={styles.inputUser}
                value={currentUser.fullName}
                onChangeText={(text) => {
                  setuserName(text);
                }}
              />
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              value={currentUser.email}
              editable={false}
              onChangeText={(text) => {
                setemail(text);
              }}
            />
            <Text style={styles.text}>Giới tính:</Text>
            <TextInput
              style={styles.input}
              value={currentUser?.gender == false ? "Nam" : "Nữ"}
              editable={false}
              onChangeText={(text) => {
                setgender(text);
              }}
            />

            <Text style={styles.text}>Ngày sinh:</Text>
            <TextInput
              style={styles.input}
              value={
                currentUser?.birthdate != null
                  ? currentUser.birthdate
                  : "1/1/2000"
              }
              editable={false}
              onChangeText={(text) => {
                setBirthday(text);
              }}
            />

            <TouchableOpacity style={styles.button} onPress={updateProfile}>
              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                Cập nhật thông tin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetpass}>
              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                Đổi mật khẩu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOut} onPress={logout}>
              <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 80,
  },
  containerUser: {
    borderRadius: 10,
    width: 370,
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    elevation: 1,
    marginTop: 10,
    alignSelf: "center",
  },
  infoUser: {
    marginTop: 15,
    alignItems: "center",
    elevation: 1,
  },

  info: {
    padding: 5,
    marginTop: 15,
    width: 370,
    borderRadius: 10,
    backgroundColor: "white",
  },
  AvatarURL: {
    borderColor: "grey",
    borderWidth: 1,
    width: 170,
    height: 170,
    borderRadius: 85,
    aspectRatio: 1,
    padding: 1,
    alignSelf: "center",
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

  inputUser: {
    marginTop: 15,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  input: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: "#696969",
    textAlign: "left",
    marginLeft: 10,
  },
  button: {
    paddingTop: 15,
    color: "white",
    alignItems: "center",
    backgroundColor: "#f3f4f9",
    height: 60,
    width: 350,
    fontSize: 25,
    borderColor: "#f3f4f9",
    borderRadius: 10,
    alignSelf: "center",
    margin: 15,
  },
  buttonOut: {
    paddingTop: 15,
    color: "white",
    alignItems: "center",
    backgroundColor: "#f3f4f9",
    height: 60,
    width: 350,
    fontSize: 25,
    borderColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    margin: 15,
  },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  //=======Modal========
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -150,
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
    borderRadius: 10,
  },
  //====================
});
