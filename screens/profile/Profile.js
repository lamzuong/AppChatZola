import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

export default function Profile({ navigation }) {
  const [userName, setuserName] = useState("User Name");
  const [avatar, setavatar] = useState(
    "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
  );
  const [birthday, setBirthday] = useState("10/10/2000");
  const [gender, setgender] = useState("Nam");
  const [phoneNumber, setphoneNumber] = useState("0987654321");

  async function resetpass() {
    navigation.navigate("ResetPassword");
  }

  async function updateProfile() {
    navigation.navigate("UpdateProfile");
  }

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.containerUser}>
          <View style={style.infoUser}>
            <Image source={{ uri: avatar }} style={style.AvatarURL}></Image>
            <TextInput
              editable={false}
              style={style.inputUser}
              value={userName}
              onChangeText={(text) => {
                setuserName(text);
              }}
            />
          </View>
        </View>
        <View style={style.info}>
          <Text style={style.text}>Điện thoại:</Text>
          <TextInput
            style={style.input}
            value={phoneNumber}
            editable={false}
            onChangeText={(text) => {
              setphoneNumber(text);
            }}
          />
          <Text style={style.text}>Giới tính:</Text>
          <TextInput
            style={style.input}
            value={gender}
            editable={false}
            onChangeText={(text) => {
              setgender(text);
            }}
          />

          <Text style={style.text}>Ngày sinh:</Text>
          <TextInput
            style={style.input}
            value={birthday}
            editable={false}
            onChangeText={(text) => {
              setBirthday(text);
            }}
          />
          <TouchableOpacity style={style.button} onPress={updateProfile}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Cập nhật thông tin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={resetpass}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
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
  },

  inputUser: {
    marginTop: 5,
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
});
