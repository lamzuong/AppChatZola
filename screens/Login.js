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
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [icon, seticon] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hidebtn, sethidebtn] = useState(false);

  const [errorUsername, seterrorUsername] = useState('Lỗi');
  const [hideErrorUsername, sethideErrorUsername] = useState(false);
  const [errorPassword, seterrorPassword] = useState('Lỗi');
  const [hideErrorPassword, sethideErrorPassword] = useState(false);

  function toHome() {
    
    const login = async () => {
      dispatch({type:'LOGIN_START'})
      try {
        const res = await axiosCilent.post('/zola/auth/login',{email, password});
        dispatch({type:'LOGIN_SUCCESS', payload: res});
        if (user.loginFirst) {
          navigation.navigate("LogInFirst");
        } else {
          navigation.navigate("Home");
        }
        
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

  const isEmpty = (str) => {
    if (str.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const hideBtnLogin = (email,password) => {
    if (isEmpty(email) || isEmpty(password)) {
      return true;
    } else {
      return false;
    }
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
            if (isEmpty(text)) {
              sethideErrorUsername(true);
              seterrorUsername('Username không được rỗng.');
              sethidebtn(false);
            } 
            else {
                seterrorUsername('');
                sethideErrorUsername(false);
                if (!hideBtnLogin(email,password)) {
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
      {hideErrorUsername && 
          <Text style={{fontSize:14,color:"red", marginLeft:25,marginRight:25,marginTop:10}}>{errorUsername}</Text>
      }
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={password}
          placeholder="Nhập mật khẩu"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            if (isEmpty(text)) {
              sethideErrorPassword(true);
              seterrorPassword('Mật khẩu không được rỗng.');
              sethidebtn(false);
            } 
            else {
                seterrorPassword('');
                sethideErrorPassword(false);
                if (!hideBtnLogin(email,password)) {
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
      {hideErrorPassword && 
          <Text style={{fontSize:14,color:"red", marginLeft:25,marginRight:25,marginTop:10}}>{errorPassword}</Text>
      }
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

      <TouchableOpacity style={hidebtn?styles.button:styles.buttonhide} onPress={toHome} disabled={!hidebtn}>
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
});
