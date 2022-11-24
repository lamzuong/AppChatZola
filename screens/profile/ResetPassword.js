import React, {useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import axiosCilent from "../../api/axiosClient";
export default function ResetPassword({ navigation }) {
  const [oldpassword, setoldpassword] = useState("");
  const [passwordchange, setpasswordchange] = useState("");
  const [passwordagain, setpasswordagain] = useState("");
  const [icon, seticon] = useState("eye-outline");
  const [icon1, seticon1] = useState("eye-outline");
  const [icon2, seticon2] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hide1, sethide1] = React.useState(true);
  const [hide2, sethide2] = React.useState(true);

  const [errorPassword, seterrorPassword] = useState("Lỗi");
  const [hideErrorPassword, sethideErrorPassword] = useState(false);
  const [errorRepassword, seterrorRepassword] = useState("Lỗi");
  const [hideErrorRepassword, sethideErrorRepassword] = useState(false);
  const [hidebtn, sethidebtn] = useState(false);

  const { user,dispatch } = useContext(AuthContext);

  //==========
  async function ResetPassword() {
    // console.log(user);
      try {
        const email = user.email;

        const password = oldpassword;
        const res = await axiosCilent.post("/zola/auth/login", {
          email: email,
          password: password,
        });

        repassword();

      } catch (error) {
        console.log(error);
        Alert.alert("Cảnh báo", "Nhập mật khẩu hiện tại không đúng!", [
          {
            text: "Xác nhận",
            style: "cancel",
          },
        ]);
        }
  }
  const repassword = async () => {
    try {
      console.log('123');
      const password = passwordchange;
      const username = user.email;
      await axiosCilent.post("/zola/auth/changePassword", {
        password: password,
        username: username,
      });
      Alert.alert("Thông báo", "Đổi mật khẩu thành công!", [
        {
          text: "Xác nhận",
          style: "cancel",
        },
      ]);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  //======Button Back=======
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  //==========
  const validatePassword = (password) => {
    var re =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    return re.test(password);
  };

  const isEmpty = (str) => {
    if (str.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateRepassword = (password, repassword) => {
    if (password === repassword) {
      return true;
    } else {
      return false;
    }
  };

  const hideBtnSignup = (oldpassword, password, repassword) => {
    if (
      isEmpty(oldpassword) ||
      isEmpty(password) ||
      isEmpty(repassword)
    ) {
      return true;
    } else {
      return false;
    }
  };
  //==========
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Mật khẩu nên gồm chữ và số, không nên chứa năm sinh, username và tên
        Zola của bạn.
      </Text>
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={oldpassword}
          placeholder="Nhập mật khẩu cũ"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setoldpassword(text);
          }}
          secureTextEntry={hide2}
        />
        {oldpassword && (
          <TouchableOpacity
            style={{ marginTop: 15, marginRight: 10 }}
            onPress={() => {
              if (hide2 === true) {
                sethide2(false);
                seticon2("eye-off-outline");
              } else {
                sethide2(true);
                seticon2("eye-outline");
              }
            }}
          >
            <Ionicons name={icon2} size={24} color="black" style={styles.cam} />
          </TouchableOpacity>
        )}
        {oldpassword && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setoldpassword("");
              sethide2(true);
              seticon2("eye-outline");
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={passwordchange}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            if (isEmpty(text)) {
              sethideErrorPassword(true);
              seterrorPassword("Mật khẩu không được rỗng.");
              sethidebtn(false);
            } else {
              if (!validatePassword(text)) {
                sethideErrorPassword(true);
                seterrorPassword(
                  "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự."
                );
                sethidebtn(false);
              } else {
                if (oldpassword === text) {
                  sethidebtn(false);
                  sethideErrorPassword(true);
                  seterrorPassword(
                    "Mật khẩu cũ và mật khẩu mới phải khác nhau."
                  );
                } else {
                  seterrorPassword("");
                  sethideErrorPassword(false);
                  if (
                    !hideBtnSignup(
                      oldpassword,
                      passwordchange,
                      passwordagain
                    )
                  ) {
                    if (!validateRepassword(text, passwordagain)) {
                      sethidebtn(false);
                      sethideErrorPassword(true);
                      seterrorPassword(
                        "Mật khẩu và mật khẩu nhập lại phải giống nhau."
                      );
                    } else {
                      sethidebtn(true);
                    }
                  } else {
                    sethidebtn(false);
                  }
                }

              }
            }
            setpasswordchange(text);
          }}
          secureTextEntry={hide}
        />
        {passwordchange && (
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
        {passwordchange && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setpasswordchange("");
              sethide(true);
              seticon("eye-outline");
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
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 18, color: "black", width: "80%" }}
          value={passwordagain}
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            if (isEmpty(text)) {
              sethideErrorRepassword(true);
              seterrorRepassword("Nhập lại mật khẩu không được rỗng.");
              sethidebtn(false);
            } else {
              if (!validateRepassword(passwordchange, text)) {
                sethideErrorRepassword(true);
                seterrorRepassword("Nhập lại mật khẩu không đúng.");
                sethidebtn(false);
              } else {
                seterrorRepassword("");
                sethideErrorRepassword(false);
                if (
                  !hideBtnSignup(
                    oldpassword,
                    passwordchange,
                    passwordagain
                  )
                ) {
                  sethideErrorPassword(false);
                  sethideErrorPassword("");
                  sethidebtn(true);
                } else {
                  sethidebtn(false);
                }
              }
            }
            setpasswordagain(text);
          }}
          secureTextEntry={hide1}
        />
        {passwordagain && (
          <TouchableOpacity
            style={{ marginTop: 15, marginRight: 10 }}
            onPress={() => {
              if (hide1 === true) {
                sethide1(false);
                seticon1("eye-off-outline");
              } else {
                sethide1(true);
                seticon1("eye-outline");
              }
            }}
          >
            <Ionicons name={icon1} size={24} color="black" style={styles.cam} />
          </TouchableOpacity>
        )}
        {passwordagain && (
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setpasswordagain("");
              sethide1(true);
              seticon1("eye-outline");
            }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {hideErrorRepassword && (
        <Text
          style={{
            fontSize: 14,
            color: "red",
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
          }}
        >
          {errorRepassword}
        </Text>
      )}
      <TouchableOpacity
        style={hidebtn ? styles.button : styles.hidebutton}
        disabled={!hidebtn}
        onPress={ResetPassword}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          Đổi mật khẩu
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    fontSize: 13,
    textAlign: "left",
    margin: 20,
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
  hidebutton: {
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
});
