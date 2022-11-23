import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axiosClient from "../api/axiosClient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp({ navigation }) {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [checked, setChecked] = useState(true);
  const [icon, seticon] = useState("eye-outline");
  const [icon1, seticon1] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hide1, sethide1] = React.useState(true);
  const [errorUsername, seterrorUsername] = useState("Lỗi");
  const [hideErrorUsername, sethideErrorUsername] = useState(false);
  const [errorEmail, seterrorEmail] = useState("Lỗi");
  const [hideErrorEmail, sethideErrorEmail] = useState(false);
  const [errorFullname, seterrorFullname] = useState("Lỗi");
  const [hideErrorFullname, sethideErrorFullname] = useState(false);
  const [errorPassword, seterrorPassword] = useState("Lỗi");
  const [hideErrorPassword, sethideErrorPassword] = useState(false);
  const [errorRepassword, seterrorRepassword] = useState("Lỗi");
  const [hideErrorRepassword, sethideErrorRepassword] = useState(false);
  const [hidebtn, sethidebtn] = useState(false);

  const [countdown, setCountdown] = useState()
  const [hideCountdown, sethideCountdown] = useState(false);
  function conFirm() {
    const register = async () => {
      try {
        await axiosClient.post("/zola/auth/register", {
          email,
          fullName,
          password,
        });
        // navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Cảnh báo", "Username đã tồn tại!", [
          {
            text: "Xác nhận",
            style: "cancel",
          },
        ]);
      }
    };

    Alert.alert(
      "Xác nhận Email",
      `Chúng tôi sẽ gửi một Email kích hoạt đến địa chỉ: \n \t\t${email.toString()} \nVui lòng truy cập và xác nhận Email để hoàn thành đăng ký.`,
      [
        {
          text: "Thay đổi",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            sethidebtn(false);
            sethideCountdown(true);
            setCountdown(60)
            register();
          },
        },
      ]
    );
  }
  async function login() {
      try {
        const res = await axiosClient.post("/zola/auth/login", {
          email: email,
          password: password,
        });
        setCountdown();
        navigation.navigate("LogInFirst");

      } catch (error) {

      }
  }

  useEffect(() => {
    if(countdown==0){
      Alert.alert("Cảnh báo", "Vui lòng đăng ký lại!", [
        {
          text: "Xác nhận",
          style: "cancel",
          onPress: () =>{
            sethideCountdown(false);
            sethidebtn(true)
          }
        },
      ]);
      
      return;
    }
    const timerId = setInterval(() => {
      login();
      setCountdown((prev) => prev -1);
    },1000);
    return() => clearInterval(timerId);
  },[countdown>0]);

  useEffect(() => {
    const UsernamRegex = async (username) => {
      try {
        const listUsers = await axiosClient.get("/zola/users/");
        listUsers.forEach((u) => {
          if (u.username === username) {
            sethideErrorUsername(true);
            seterrorUsername("Username đã tồn tại.");
            sethidebtn(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    UsernamRegex(username);
  }, [username]);

  useEffect(() => {
    const EmailRegex = async (email) => {
      try {
        const listUsers = await axiosClient.get("/zola/users/");
        listUsers.forEach((u) => {
          if (u.email === email) {
            sethideErrorEmail(true);
            seterrorEmail("Email đã được đăng ký.");
            sethidebtn(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    EmailRegex(email);
  }, [email]);

  const isEmpty = (str) => {
    if (str.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // const validateUsername = (username) => {
  //   var re = /^[a-zA-Z0-9]{4,16}$/;
  //   return re.test(username);
  // };

  const validateEmail = (email) => {
    var re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    return re.test(email);
  };

  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  const validateFullname = (fullName) => {
    var re = /^[a-zA-Z ]{1,30}$/;
    return re.test(removeAscent(fullName));
  };

  const validatePassword = (password) => {
    var re =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    return re.test(password);
  };

  const validateRepassword = (password, repassword) => {
    if (password === repassword) {
      return true;
    } else {
      return false;
    }
  };

  const hideBtnSignup = (email, fullName, password, repassword) => {
    if (
      isEmpty(email) ||
      isEmpty(fullName) ||
      isEmpty(password) ||
      isEmpty(repassword)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // hideBtnSignup(username, email, fullName, password, repassword);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgb(13,120,202)" />
      <Text style={styles.signup}>
        Vui lòng nhập Email, tên đầy đủ và mật khẩu để đăng ký.
      </Text>
      <SafeAreaView>
        <ScrollView style={{ height: "auto", marginBottom: 150 }}>
          {/* <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "90%" }}
              value={username}
              placeholder="Nhập Username"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (!validateUsername(text)) {
                  sethideErrorUsername(true);
                  seterrorUsername(
                    "Username chỉ chứa chữ cái và số từ 4 đến 16 ký tự."
                  );
                  sethidebtn(false);
                } else {
                  seterrorUsername("");
                  sethideErrorUsername(false);
                  if (
                    !hideBtnSignup(
                      username,
                      email,
                      fullName,
                      password,
                      repassword
                    )
                  ) {
                    sethidebtn(true);
                  } else {
                    sethidebtn(false);
                  }
                }
                setusername(text);
              }}
            />
            {username && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setusername("");
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
          )} */}
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "90%" }}
              value={email}
              placeholder="Nhập Email"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  sethideErrorEmail(true);
                  seterrorEmail("Địa chỉ email không được rỗng.");
                  sethidebtn(false);
                } else {
                  if (!validateEmail(text)) {
                    sethideErrorEmail(true);
                    seterrorEmail("Địa chỉ email không hợp lệ.");
                    sethidebtn(false);
                  } else {
                    seterrorEmail("");
                    sethideErrorEmail(false);
                    if (
                      !hideBtnSignup(
                        email,
                        fullName,
                        password,
                        repassword
                      )
                    ) {
                      sethidebtn(true);
                    } else {
                      sethidebtn(false);
                    }
                  }
                }
                setemail(text);
              }}
              keyboardType="email-address"
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
          {hideErrorEmail && (
            <Text
              style={{
                fontSize: 14,
                color: "red",
                marginLeft: 25,
                marginRight: 25,
                marginTop: 10,
              }}
            >
              {errorEmail}
            </Text>
          )}
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "90%" }}
              value={fullName}
              placeholder="Nhập tên đầy đủ"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  sethideErrorFullname(true);
                  seterrorFullname("Tên đầy đủ không được rỗng.");
                  sethidebtn(false);
                } else {
                  if (!validateFullname(text)) {
                    sethideErrorFullname(true);
                    seterrorFullname(
                      "Tên đầy đủ không bao gồm chữ số, ký tự đặc biệt và tối đa 30 ký tự."
                    );
                    sethidebtn(false);
                  } else {
                    seterrorFullname("");
                    sethideErrorFullname(false);
                    if (
                      !hideBtnSignup(
                        email,
                        fullName,
                        password,
                        repassword
                      )
                    ) {
                      sethidebtn(true);
                    } else {
                      sethidebtn(false);
                    }
                  }
                }
                setfullName(text);
              }}
            />
            {fullName && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setfullName("");
                  sethidebtn(false);
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {hideErrorFullname && (
            <Text
              style={{
                fontSize: 14,
                color: "red",
                marginLeft: 25,
                marginRight: 25,
                marginTop: 10,
              }}
            >
              {errorFullname}
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
                  if (!validatePassword(text)) {
                    sethideErrorPassword(true);
                    seterrorPassword(
                      "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự."
                    );
                    sethidebtn(false);
                  } else {
                    seterrorPassword("");
                    sethideErrorPassword(false);
                    if (
                      !hideBtnSignup(
                        email,
                        fullName,
                        password,
                        repassword
                      )
                    ) {
                      if (!validateRepassword(text, repassword)) {
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
                <Ionicons
                  name={icon}
                  size={24}
                  color="black"
                  style={styles.cam}
                />
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
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "80%" }}
              value={repassword}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  sethideErrorRepassword(true);
                  seterrorRepassword("Nhập lại mật khẩu không được rỗng.");
                  sethidebtn(false);
                } else {
                  if (!validateRepassword(password, text)) {
                    sethideErrorRepassword(true);
                    seterrorRepassword("Nhập lại mật khẩu không đúng.");
                    sethidebtn(false);
                  } else {
                    seterrorRepassword("");
                    sethideErrorRepassword(false);
                    if (
                      !hideBtnSignup(
                        email,
                        fullName,
                        password,
                        repassword
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
                setrepassword(text);
              }}
              secureTextEntry={hide1}
            />
            {repassword && (
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
                <Ionicons
                  name={icon1}
                  size={24}
                  color="black"
                  style={styles.cam}
                />
              </TouchableOpacity>
            )}
            {repassword && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setrepassword("");
                  sethide1(true);
                  seticon1("eye-outline");
                  sethidebtn(false);
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
          {hideCountdown && (
            <Text
              style={{
                fontSize: 14,
                color: "red",
                marginLeft: 25,
                marginRight: 25,
                marginTop: 10,
              }}
            >
              Vui lòng xác nhận Email trong: {countdown} giây
            </Text>
          )}

          {/* this.setState({showTheThing: true}) */}
        </ScrollView>
      </SafeAreaView>

      {/* <View style={styles.gender}>
             <RadioButton
                 value="true"
                 status={ checked === true ? 'checked' : 'unchecked' }
                 onPress={() => setChecked(true)}
                 color="#0091ff"
             /><Text style={styles.text}>Nam        </Text>
             <RadioButton
                 value="false"
                 status={ checked === false ? 'checked' : 'unchecked' }
                 onPress={() => setChecked(false)}
                 color="#0091ff"
             /><Text style={styles.text}>Nữ</Text>
         </View> */}
      {/* { hidebtn &&  */}
      <TouchableOpacity
        style={hidebtn ? styles.button : styles.buttonhide}
        onPress={conFirm}
        disabled={!hidebtn}
      >
        <Image
          source={require("../assets/next.png")}
          style={styles.image}
        ></Image>
      </TouchableOpacity>
      {/* } */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  signup: {
    fontSize: 13,
    textAlign: "left",
    margin: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
    textAlign: "left",
    paddingLeft: 20,
  },
  gender: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 20,
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
