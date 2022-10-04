import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function Directory() {
  const listFriends = [
    {
      id: "1",
      ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
      name: "Phúc Du",
      message: "gutboiz",
    },
    {
      id: "2",
      ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
      name: "Phuc Nguyen",
      message: "facboi",
    },
    {
      id: "3",
      ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
      name: "Minh Vuong M4U",
      message: "ka xy",
    },
    {
      id: "4",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nam Zuong",
      message: "mo i lo ep",
    },
    {
      id: "5",
      ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
      name: "Ban Nuoc",
      message: "Ziet Cong",
    },
    {
      id: "6",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Abalatrap",
      message: "dcm",
    },
    {
      id: "7",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Watson Dr.",
      message: "dcm",
    },
    {
      id: "8",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Nguyen FBoiz",
      message: "dcm",
    },
    {
      id: "9",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Quất",
      message: "dcm",
    },
    {
      id: "10",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Vuong Lon",
      message: "dcm",
    },
    {
      id: "11",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Nam Quốc Sơn Hà Nam Đế Cư Tuyệt Nhiên Định Phận Tại Thiên Thư",
      message: "dcm",
    },
    {
      id: "12",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Phuc Cat",
      message: "dcm",
    },
    {
      id: "13",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Ân Nguyen",
      message: "dcm",
    },
    {
      id: "14",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Lon Quoc",
      message: "dcm",
    },
    {
      id: "15",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Cho Vuong",
      message: "dcm",
    },
  ];
  const listTitle = [
    "A",
    "Ă",
    "Â",
    "B",
    "C",
    "D",
    "Đ",
    "E",
    "Ê",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ô",
    "Ơ",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "Ư",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const sort_ListFriends = [...listFriends].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  var list = [];
  var setShow = [];
  for (let i = 0; i < listTitle.length; i++) {
    list[i] = [];
    sort_ListFriends.forEach((element) => {
      // lọc theo chữ cái
      if (element.name.startsWith(listTitle[i])) {
        list[i].push(element);
      }
    });
    // ẩn đi nếu không có phần tử nào thuộc chữ cái đó
    if (list[i].length == 0) setShow[i] = false;
    else setShow[i] = true;
  }
  var listAll = [];
  for (let i = 0; i < listTitle.length; i++) {
    listAll[i] = { title: listTitle[i], show: setShow[i], listFr: list[i] };
  }

  return (
    <View>
      <ScrollView>
        {listAll.map((e, i) => (
          <ViewListFriend
            key={i}
            title={e.title}
            show={e.show}
            list={e.listFr}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const ViewListFriend = (props) => {
  return (
    <View>
      {props.show ? <Text style={styles.title}>{props.title}</Text> : null}
      {props.list.map((e, i) => (
        <ItemFriend key={i} id={e.id} ava={e.ava} name={e.name} />
      ))}
    </View>
  );
};
const ItemFriend = (props) => {
  const [showName, setShowName] = React.useState(props.name);
  const strName = new String(showName);
  if (strName.length > 25) {
    setShowName(strName.slice(0, 22) + "...");
  }
  return (
    <TouchableOpacity>
      <View style={styles.items}>
        <Image
          source={{
            uri: props.ava,
          }}
          style={styles.imageAva}
        />
        <Text style={styles.nickname}>{showName}</Text>
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
