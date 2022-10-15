import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../chat/SearchBar";

export default function AddFriend({ navigation }, props) {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={30} color="white" />
        </TouchableOpacity>
        <SearchBar title="Nhập email hoặc tên cần tìm..." />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconBack: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
