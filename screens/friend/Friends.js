import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./styleFriends";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchBar from "../chat/SearchBar";

import Directory from "./Directory";
import GroupFriends from "./GroupFriends";
// import TopNavigator from "../Home";

export default function Friends({ navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{ marginTop: 25 }}>
      <View style={styles.header}>
        <SearchBar addFr="true" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddFriend");
          }}
        >
          <AntDesign
            name="adduser"
            size={30}
            color="white"
            style={styles.iconAdd}
          />
        </TouchableOpacity>
      </View>
      {/* <TopNavigator /> */}
    </View>
  );
}
