import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchBar(props) {
  const addFr = props.addFr;
  const [appearX, setAppearX] = React.useState("");
  return (
    <View style={styles.txtSearch}>
      <EvilIcons
        name="search"
        size={30}
        color="white"
        style={{ paddingRight: 5 }}
      />
      <TextInput
        placeholder={
          addFr == "true"
            ? "Nhập số điện thoại cần tìm..."
            : "Nhập tên bạn cần tìm..."
        }
        style={{ fontSize: 18, color: "white", width: "80%" }}
        placeholderTextColor="rgb(124,189,255)"
        value={appearX}
        onChangeText={(appearX) => setAppearX(appearX)}
      />
      {appearX && (
        <TouchableOpacity
          onPress={() => {
            setAppearX("");
          }}
        >
          <MaterialIcons name="clear" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  txtSearch: {
    height: 45,
    width: "90%",
    flexDirection: "row",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "rgb(124,189,255)",
    borderRadius: 10,
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
});
