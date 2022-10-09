import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styleChatInfoGroup";

const yourself = {
  ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
  name: "Anya",
};
export default function ListMemberGroup({ navigation, route }) {
  const { users } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Thành viên nhóm
          </Text>
        </View>
      </View>
      <MySelf />
      <FlatList
        data={users}
        renderItem={({ item }) => <ListMem users={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
const ListMem = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "80%" }}>
        <TouchableOpacity style={styles.itemMember}>
          <Image source={{ uri: props.users.ava }} style={styles.imgAvaMini} />
          <Text style={styles.txtNameMember}>{props.users.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconAction}>
        <TouchableOpacity>
          <Ionicons name="person-add-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person-remove" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const MySelf = () => {
  return (
    <View>
      <TouchableOpacity style={styles.itemMember}>
        <Image source={{ uri: yourself.ava }} style={styles.imgAvaMini} />
        <Text style={styles.txtNameMember}>
          {yourself.name}{" "}
          <Text style={{ color: "rgb(200,200,200)" }}>(Tôi)</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
