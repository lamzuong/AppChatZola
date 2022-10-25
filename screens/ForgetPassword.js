import React, { useEffect, useState } from "react";
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

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [icon, seticon] = useState("eye-outline");
  const [icon1, seticon1] = useState("eye-outline");
  const [hide, sethide] = React.useState(true);
  const [hide1, sethide1] = React.useState(true);

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
              navigation.navigate("Login");
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
                setEmail(text);
              }}
              keyboardType="email-address"
            />
            {email && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setEmail("");
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
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
                setCode(text);
              }}
            />
            {code && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  setCode("");
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
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="gray"
              onChangeText={(text) => {
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
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.input}>
            <TextInput
              style={{ fontSize: 18, color: "black", width: "80%" }}
              value={confirmPassword}
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor="gray"
              onChangeText={(text) => {
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
                }}
              >
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
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
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: 13,
  },
});
