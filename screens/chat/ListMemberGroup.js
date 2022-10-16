import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styleChatInfoGroup";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

const yourself = {
  ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
  name: "Anya",
};
export default function ListMemberGroup({ navigation, route }) {
  const { members } = route.params;
  const { user } = useContext(AuthContext);
  const [listMem, setListMem] = useState([]);
  const [rerender, setRerender] = useState(false);

  var list = [];
  useEffect(() => {
    const getInfoFriends = async (mem) => {
      try {
        const res = await axiosCilent.get("/zola/users/" + mem);
        list.push(res);
        if (mem == members[members.length - 1]) {
          setListMem(list);
          setRerender(!rerender);
        }
      } catch (error) {
        console.log(error);
      }
    };
    members.forEach((element) => {
      getInfoFriends(element);
    });
  }, [members]);
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
      <MySelf currentUser={user} />
      <FlatList
        data={listMem}
        renderItem={({ item }) => <ListMem members={item} currentUser={user} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
const ListMem = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {props.members.id == props.currentUser.id ? null : (
        <>
          <View style={{ width: "80%" }}>
            <TouchableOpacity style={styles.itemMember}>
              {props.members.img ? (
                <Image
                  source={{ uri: props.members.img }}
                  style={styles.imgAvaMini}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png",
                  }}
                  style={styles.imgAvaMini}
                />
              )}
              <Text style={styles.txtNameMember}>{props.members.fullName}</Text>
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
        </>
      )}
    </View>
  );
};
const MySelf = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.itemMember}>
        <Image
          source={{ uri: props.currentUser.img }}
          style={styles.imgAvaMini}
        />
        <Text style={styles.txtNameMember}>
          {props.currentUser.fullName}{" "}
          <Text style={{ color: "rgb(200,200,200)" }}>(Tôi)</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
