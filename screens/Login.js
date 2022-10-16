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
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [icon, seticon] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);

  function toHome() {
    
    const login = async () => {
      dispatch({type:'LOGIN_START'})
      try {
        const res = await axiosCilent.post('/zola/auth/login',{email, password});
        dispatch({type:'LOGIN_SUCCESS', payload: res});
        navigation.navigate("Home");
      } catch (error) {
        dispatch({type:'LOGIN_FAILURE'});
        Alert.alert(
          "Cảnh báo",
          "Username hoặc mật khẩu không đúng!",
          [
            {
              text: "Xác nhận",
              style: "cancel",
            },
          ]
        );
      }
    };

    login();
  }

  function forget() {
    navigation.navigate("ForgetPassword");
  }

  const {user, dispatch} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgb(13,120,202)" />
      <Text style={styles.login}>
        Vui lòng nhập username và mật khẩu để đăng nhập.
      </Text>

      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "90%" }}
          value={email}
          placeholder="Nhập Username"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setemail(text);
          }}
          // keyboardType="email-address"
        />
        {email && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setemail("");
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={password}
          placeholder="Nhập mật khẩu"
          placeholderTextColor="gray"
          onChangeText={(text) => {
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
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

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

      <TouchableOpacity style={styles.button} onPress={toHome}>
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
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: 13,
  },
});
