import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function GroupFriends() {
  const listGroups = [
    {
      id: "1",
      ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
      name: "Nhóm 1",
    },
    {
      id: "2",
      ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
      name: "Nhóm 2",
    },
    {
      id: "3",
      ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
      name: "Nhóm 3",
    },
    {
      id: "4",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nhóm 4",
    },
    {
      id: "5",
      ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
      name: "Nhóm 5",
    },
    {
      id: "6",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Nhóm 6",
    },
    {
      id: "7",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Nhóm 7",
    },
    {
      id: "8",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Nhóm 8",
    },
    {
      id: "9",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nhóm 9",
    },
    {
      id: "10",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Nhóm 10",
    },
    {
      id: "11",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Nhóm 11",
    },
    {
      id: "12",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Nhóm 12",
    },
    {
      id: "13",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Nhóm 13",
    },
    {
      id: "14",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nhóm 14",
    },
    {
      id: "15",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Nhóm 15",
    },
  ];

  return (
    <View>
      <ScrollView>
        {listGroups.map((e, i) => (
          <ItemFriend key={i} id={e.id} ava={e.ava} name={e.name} />
        ))}
      </ScrollView>
    </View>
  );
}

const ItemFriend = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.items}>
        <Image
          source={{
            uri: props.ava,
          }}
          style={styles.imageAva}
        />
        <Text style={styles.nickname}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  items: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
  },
  imageAva: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  nickname: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 7,
  },
});
