import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

export default function Welcome({ navigation }) {
  function logIn() {
    navigation.navigate("Login");
  }

  function signUp() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.zola}>Zola</Text>

      <Image
        source={require("../assets/icon.png")}
        style={{ width: "100%", height: 300, marginBottom: 45 }}
      ></Image>

      <TouchableOpacity style={styles.buttonSignIn} onPress={logIn}>
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          ĐĂNG NHẬP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSignUp} onPress={signUp}>
        <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
          ĐĂNG KÝ
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
  zola: {
    color: "#0091ff",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    paddingTop: 45,
    paddingBottom: 45,
  },

  buttonSignIn: {
    paddingTop: 15,
    color: "white",
    alignItems: "center",
    backgroundColor: "#0091ff",
    height: 60,
    width: 300,
    fontSize: 25,
    borderColor: "#0091ff",
    marginBottom: 30,
    borderRadius: 100,
    alignSelf: "center",
  },
  buttonSignUp: {
    paddingTop: 15,
    color: "white",
    alignItems: "center",
    backgroundColor: "#f3f4f9",
    height: 60,
    width: 300,
    fontSize: 25,
    borderColor: "#f3f4f9",
    borderRadius: 100,
    alignSelf: "center",
  },
});
