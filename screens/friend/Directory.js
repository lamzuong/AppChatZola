import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

export default function Directory() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [renderUser, setRenderUser] = useState(false);
  const [listFriendsId, setListFriendsId] = useState([]);
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosCilent.get("/zola/users/" + user?.id);
        setCurrentUser(res);
        setListFriendsId(res.friends);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, [renderUser]);
  //========================
  var listFriends = [];
  const [listMem, setListMem] = useState([]);
  useEffect(() => {
    var i = 0;
    const getInfoFriends = async (mem) => {
      try {
        const res = await axiosCilent.get("/zola/users/" + mem);
        listFriends.push(res);
        ++i;
        if (i === listFriendsId.length) {
          setListMem(listFriends);
          i = 0;
        }
      } catch (error) {
        console.log(error);
      }
    };
    listFriendsId.forEach((element) => {
      getInfoFriends(element);
    });
    if (listFriendsId.length == 0) {
      setListMem([]);
    }
  }, [listFriendsId]);
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
  const sort_ListFriends = [...listMem].sort((a, b) =>
    a.fullName > b.fullName ? 1 : -1
  );
  // console.log(sort_ListFriends);
  var list = [];
  var setShow = [];
  for (let i = 0; i < listTitle.length; i++) {
    list[i] = [];
    sort_ListFriends.forEach((element) => {
      // lọc theo chữ cái
      if (element.fullName.startsWith(listTitle[i])) {
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
  //========================

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
        <ItemFriend key={i} id={e.id} ava={e.img} name={e.fullName} />
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
