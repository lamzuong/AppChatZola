import React, {useContext ,useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Ionicons } from "@expo/vector-icons";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
export default function ForgetPassword({ navigation }) {
  const { user, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [icon, seticon] = useState("eye-outline");
  const [icon1, seticon1] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hide1, sethide1] = React.useState(true);

  const [errorCode, setErrorCode] = useState("Lỗi");
  const [hideErrorCode, setHideErrorCode] = useState(false);
  const [errorEmail, seterrorEmail] = useState("Lỗi");
  const [hideErrorEmail, sethideErrorEmail] = useState(false);
  const [errorPassword, seterrorPassword] = useState("Lỗi");
  const [hideErrorPassword, sethideErrorPassword] = useState(false);
  const [errorRepassword, seterrorRepassword] = useState("Lỗi");
  const [hideErrorRepassword, sethideErrorRepassword] = useState(false);
  const [hidebtn, sethidebtn] = useState(true);

  const validateEmail = (email) => {
    var re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    return re.test(email);
  };
  const isEmpty = (str) => {
    if (str.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateCode = (code) => {
    var re = /^\d{6}$/;
    return re.test(code);
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

  const hideBtnSignup = (code, password, repassword) => {
    if (isEmpty(code) || isEmpty(password) || isEmpty(repassword)) {
      return true;
    } else {
      return false;
    }
  };

  const poolData = {
    UserPoolId: "ap-southeast-1_cvABWaWG8",
    ClientId: "ro3jpgd83rfom7v4h1cqsg719",
  };

  const pool = new CognitoUserPool(poolData);
  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: pool,
    });
  };

  const sendCode = (event) => {
    // event.preventDefault();
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setStage(2);
      },
    });
  };
  async function login() {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosClient.post("/zola/auth/login", {
        email: email,
        password: password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      navigation.navigate("Home");

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error);
    }
}

  const resetPassword = (event) => {
    // event.preventDefault();
    const overLimited =
      "LimitExceededException: Attempt limit exceeded, please try after some time.";
    const mistakeCode =
      "CodeMismatchException: Invalid verification code provided, please try again.";
    const mistakeCode2 =
      "ExpiredCodeException: Invalid code provided, please request a code again.";
    const codeEmpty =
      "InvalidParameterException: 2 validation errors detected: Value '' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+; Value '' at 'confirmationCode' failed to satisfy constraint: Member must have length greater than or equal to 1";
    const codeEmpty2 =
      "InvalidParameterException: 3 validation errors detected: Value '' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+; Value '' at 'confirmationCode' failed to satisfy constraint: Member must have length greater than or equal to 1; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\S]+.*[\\S]+$";
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Nhập lại mật khẩu không trùng khớp!", [
        {
          text: "Xác nhận",
          style: "cancel",
        },
      ]);
      return;
    }
    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        Alert.alert("Thành công", "Lấy lại mật khẩu thành công", [
          {
            text: "Xác nhận",
            onPress: () => {
              login();
            },
          },
        ]);
      },
      onFailure: (err) => {
        console.log(new Error(err).message.toString());
        if (err.toString() == overLimited) {
          Alert.alert(
            "Lỗi",
            "Bạn nhập sai quá nhiều lần, vui lòng trở lại trong 1 giờ tới!",
            [
              {
                text: "Xác nhận",
                style: "cancel",
              },
            ]
          );
          return;
        } else if (
          err.toString() == mistakeCode ||
          err.toString() == mistakeCode2 ||
          err.toString() == codeEmpty ||
          err.toString() == codeEmpty2
        ) {
          Alert.alert("Lỗi", "Mã xác nhận không hợp lệ!", [
            {
              text: "Xác nhận",
              style: "cancel",
            },
          ]);
          return;
        } else {
          Alert.alert(
            "Lỗi",
            "Mật khẩu phải có 8 ký tự bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt!",
            [
              {
                text: "Xác nhận",
                style: "cancel",
              },
            ]
          );
          return;
        }
      },
    });
  };

  function conFirm() {
    Alert.alert(
      "Xác nhận Email",
      `Chúng tôi sẽ gửi mã xác thực đến Email: \n \t\t${email.toString()} \n Vui lòng xác nhận Email này là đúng.`,
      [
        {
          text: "Thay đổi",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            sendCode();
            sethidebtn(true);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {stage === 1 && (
        <View>
          <Text style={styles.signup}>
            Vui lòng nhập Email để lấy lại mật khẩu.
          </Text>
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
                  sethidebtn(true);
                } else {
                  if (!validateEmail(text)) {
                    sethideErrorEmail(true);
                    seterrorEmail("Địa chỉ email không hợp lệ.");
                    sethidebtn(true);
                  } else {
                    seterrorEmail("");
                    sethideErrorEmail(false);
                    sethidebtn(false);
                  }
                }
                setEmail(text);
              }}
              keyboardType="email-address"
            />
            {email && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setEmail("");
                  sethideErrorEmail(true);
                  seterrorEmail("Địa chỉ email không được rỗng.");
                  sethidebtn(true);
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {hideErrorEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
        </View>
      )}
      {stage === 2 && (
        <View>
          <Text style={styles.signup}>
            Vui lòng không chia sẽ mã xác thực để tránh mất tài khoản.
          </Text>
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "90%" }}
              value={code}
              placeholder="Nhập mã xác thực"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  setHideErrorCode(true);
                  setErrorCode("Mã xác thực không được rỗng.");
                  sethidebtn(false);
                } else {
                  if (!validateCode(text)) {
                    setHideErrorCode(true);
                    setErrorCode("Mã xác thực không hợp lệ.");
                  } else {
                    setErrorCode("");
                    setHideErrorCode(false);
                    if (hideBtnSignup(code, password, confirmPassword)) {
                      sethidebtn(true);
                    } else {
                      sethidebtn(false);
                    }
                  }
                }
                setCode(text);
              }}
            />
            {code && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setCode("");
                  setHideErrorCode(true);
                  setErrorCode("Mã xác thực không được rỗng.");
                  sethidebtn(true);
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {hideErrorCode && <Text style={styles.errorText}>{errorCode}</Text>}
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "80%" }}
              value={password}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  sethideErrorPassword(true);
                  seterrorPassword("Mật khẩu không được rỗng.");
                  sethidebtn(true);
                } else {
                  if (!validatePassword(text)) {
                    sethideErrorPassword(true);
                    seterrorPassword(
                      "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự."
                    );
                  } else {
                    seterrorPassword("");
                    sethideErrorPassword(false);
                    if (hideBtnSignup(code, password, confirmPassword)) {
                      sethidebtn(true);
                    } else {
                      sethidebtn(false);
                    }
                  }
                }
                setPassword(text);
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
                  setPassword("");
                  sethide(true);
                  seticon("eye-outline");
                  sethideErrorPassword(true);
                  seterrorPassword("Mật khẩu không được rỗng.");
                  sethidebtn(true);
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {hideErrorPassword && (
            <Text style={styles.errorText}>{errorPassword}</Text>
          )}
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "80%" }}
              value={confirmPassword}
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                if (isEmpty(text)) {
                  sethideErrorRepassword(true);
                  seterrorRepassword("Nhập lại mật khẩu không được rỗng.");
                  sethidebtn(true);
                } else {
                  if (!validateRepassword(password, text)) {
                    sethideErrorRepassword(true);
                    seterrorRepassword("Nhập lại mật khẩu không đúng.");
                  } else {
                    seterrorRepassword("");
                    sethideErrorRepassword(false);
                    if (hideBtnSignup(code, password, confirmPassword)) {
                      sethidebtn(true);
                    } else {
                      sethidebtn(false);
                    }
                  }
                }
                setConfirmPassword(text);
              }}
              secureTextEntry={hide1}
            />
            {confirmPassword && (
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
            {confirmPassword && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setConfirmPassword("");
                  sethide1(true);
                  seticon1("eye-outline");
                  sethideErrorRepassword(true);
                  seterrorRepassword("Nhập lại mật khẩu không được rỗng.");
                  sethidebtn(true);
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {hideErrorRepassword && (
            <Text style={styles.errorText}>{errorRepassword}</Text>
          )}
        </View>
      )}
      <TouchableOpacity
        disabled={hidebtn}
        style={!hidebtn ? styles.button : styles.buttonhide}
        onPress={() => {
          stage == 1 ? conFirm() : resetPassword();
        }}
      >
        <Image source={require("../assets/next.png")} style={styles.image} />
      </TouchableOpacity>
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
  errorText: {
    fontSize: 14,
    color: "red",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
  },
});
