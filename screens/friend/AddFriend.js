import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styleAddFriend";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import SearchBar from "../chat/SearchBar";

export default function AddFriend({ navigation }, props) {
  const [appearX, setAppearX] = React.useState("");
  return (
    <View style={{ marginTop: 33 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
        </TouchableOpacity>
        <SearchBar addFr="true" />
      </View>
    </View>
  );
}
