import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import axiosCilent from "../api/axiosClient";

export default function Login({ navigation }) {
  const [email, setemail] = useState("lamzuong");
  const [password, setpassword] = useState("L@mzuong2001");
  const [icon, seticon] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hidebtn, sethidebtn] = useState(false);

  const [errorUsername, seterrorUsername] = useState("Lỗi");
  const [hideErrorUsername, sethideErrorUsername] = useState(false);
  const [errorPassword, seterrorPassword] = useState("Lỗi");
  const [hideErrorPassword, sethideErrorPassword] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  function toHome() {
    const login = async () => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axiosCilent.post("/zola/auth/login", {
          email,
          password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
        if (res?.loginFirst == true) {
          navigation.navigate("LogInFirst");
        } else if (res?.loginFirst == false) {
          navigation.navigate("Home");
        }
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE" });
        if (error.response.data === "Incorrect username or password.") {
          Alert.alert("Cảnh báo", "Username hoặc mật khẩu không đúng!", [
            {
              text: "Xác nhận",
              style: "cancel",
            },
          ]);
        } else if (error.response.data === "User is not confirmed.") {
          Alert.alert(
            "Cảnh báo",
            "Tài khoản của bạn chưa được xác thực qua Email, vui lòng truy cập địa chỉ Email đã đăng ký để xác thực trước khi đăng nhập!",
            [
              {
                text: "Xác nhận",
                style: "cancel",
              },
            ]
          );
        }
        console.log(error.response.data);
      }
    };
    login();
  }

  function forget() {
    navigation.navigate("ForgetPassword");
  }

  const isEmpty = (str) => {
    if (str.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const hideBtnLogin = (email, password) => {
    if (isEmpty(email) || isEmpty(password)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          >
            <Ionicons name="md-arrow-back-sharp" size={30} color="white" />
          </TouchableOpacity>
          <Text style={[styles.textHeader, { marginLeft: 20 }]}>Đăng nhập</Text>
        </View>
      </View>
      <StatusBar animated={true} backgroundColor="rgb(13,120,202)" />
      <Text style={styles.login}>
        Vui lòng nhập username và mật khẩu để đăng nhập.
      </Text>

      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "90%" }}
          value={email}
          placeholder="Nhập Username hoặc Email"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            if (isEmpty(text)) {
              sethideErrorUsername(true);
              seterrorUsername("Username không được rỗng.");
              sethidebtn(false);
            } else {
              seterrorUsername("");
              sethideErrorUsername(false);
              if (!hideBtnLogin(email, password)) {
                sethidebtn(true);
              } else {
                sethidebtn(false);
              }
            }
            setemail(text);
          }}
          // keyboardType="email-address"
        />
        {email && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setemail("");
              sethidebtn(false);
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {hideErrorUsername && (
        <Text
          style={{
            fontSize: 14,
            color: "red",
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
          }}
        >
          {errorUsername}
        </Text>
      )}
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={password}
          placeholder="Nhập mật khẩu"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            if (isEmpty(text)) {
              sethideErrorPassword(true);
              seterrorPassword("Mật khẩu không được rỗng.");
              sethidebtn(false);
            } else {
              seterrorPassword("");
              sethideErrorPassword(false);
              if (!hideBtnLogin(email, password)) {
                sethidebtn(true);
              } else {
                sethidebtn(false);
              }
            }
            setpassword(text);
          }}
          secureTextEntry={hide}
        />
        {password && (
          <TouchableOpacity
            style={{ marginTop: 15, marginRight: 10 }}
            onPress={() => {
              if (hide === true) {
                sethide(false);
                seticon("eye-off-outline");
              } else {
                sethide(true);
                seticon("eye-outline");
              }
            }}
          >
            <Ionicons name={icon} size={24} color="black" style={styles.cam} />
          </TouchableOpacity>
        )}
        {password && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setpassword("");
              sethide(true);
              seticon("eye-outline");
              sethidebtn(false);
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {hideErrorPassword && (
        <Text
          style={{
            fontSize: 14,
            color: "red",
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
          }}
        >
          {errorPassword}
        </Text>
      )}
      <TouchableOpacity style={{ margin: 20 }} onPress={forget}>
        <Text
          style={{
            fontSize: 18,
            color: "#0091ff",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Lấy lại mật khẩu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={hidebtn ? styles.button : styles.buttonhide}
        onPress={toHome}
        disabled={!hidebtn}
      >
        <Image
          source={require("../assets/next.png")}
          style={styles.image}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
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
  login: {
    fontSize: 13,
    textAlign: "left",
    margin: 20,
  },
  button: {
    backgroundColor: "#0091ff",
    borderRadius: 100,
    height: 55,
    width: 55,
    flex: 1,
    alignSelf: "flex-end",
    margin: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  buttonhide: {
    backgroundColor: "#7EC0EE",
    borderRadius: 100,
    height: 55,
    width: 55,
    flex: 1,
    alignSelf: "flex-end",
    margin: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: 13,
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
});
