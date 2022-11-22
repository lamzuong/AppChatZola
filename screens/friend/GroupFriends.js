import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosCilent from "../../api/axiosClient";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function GroupFriends() {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [rerender, setRerender] = useState(false);
  const isFocused = useIsFocused();
  // console.log(isFocused);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosCilent.get("/zola/conversation/" + user.id);
        setConversation(res);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user.id, rerender, isFocused]);

  return (
    <View>
      <ScrollView>
        {conversation.map((e, i) =>
          e.group ? (
            <ItemFriend
              key={i}
              id={e.id}
              ava={e.avatarGroup}
              name={e.groupName}
            />
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const ItemFriend = (props) => {
  const navigation = useNavigation();
  const navigateChatRoom = async (id, name, ava) => {
    try {
      const res2 = await axiosCilent.get("/zola/conversation/idCon/" + id);
      navigation.navigate("ChatRoom", {
        nickname: name,
        avatar: ava,
        conversation: res2,
      });
    } catch (error) {}
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigateChatRoom(props.id, props.name, props.ava);
      }}
    >
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
