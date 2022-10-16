import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function InviteAddFrReceive() {
  const listInvite = [
    {
      id: "1",
      ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
      name: "Phúc Du",
      message: "hello",
    },
    {
      id: "2",
      ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
      name: "Phuc Nguyen",
      message: "hello",
    },
    {
      id: "3",
      ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
      name: "Minh Vuong M4U",
      message: "hello",
    },
    {
      id: "4",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nam Zuong",
      message: "hello",
    },
    {
      id: "5",
      ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
      name: "Trung Quoc",
      message: "hello",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={listInvite}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemLeft}>
                <Image source={{ uri: item.ava }} style={styles.ava} />
                <Text style={styles.txtName}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.itemRight}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <AntDesign name="checkcircle" size={30} color="green" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name="closecircle" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  ava: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  txtName: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
