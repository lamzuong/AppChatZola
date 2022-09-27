import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const listImg = [
  {
    id: 1,
    img: "https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000",
  },
  { id: 2, img: "https://www.w3schools.com/w3css/img_lights.jpg" },
  {
    id: 3,
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    id: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvu2-L0ODW6fvsFBz2uiwyBnBM68XjksXbw&usqp=CAU",
  },
  { id: 5, img: "https://static-znews.zadn.vn/static/topic/person/jennie.jpg" },
  {
    id: 6,
    img: "https://ss-images.saostar.vn/wp700/pc/1660210289262/saostar-bmjs2gr1wqauwg0e.jpg",
  },
  {
    id: 7,
    img: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/307309439_775797003684498_7651677250973376773_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=LiGf-yO5FyQAX8a_7hp&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT8Ql94JX2KUIDZhzrU5oDl9fdsKjBy7Cc56t6EppphgOw&oe=6331C0DF",
  },
  {
    id: 8,
    img: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/305493495_770110814253117_4347664597530827370_n.jpg?stp=c0.193.1464.1464a_dst-jpg_s851x315&_nc_cat=109&ccb=1-7&_nc_sid=da31f3&_nc_ohc=LNFrM91nXbcAX_IRtFh&_nc_ht=scontent.fhan14-3.fna&oh=00_AT8Gy5JJ1MpRugPSLrl1ec93WyrXmMnsmaISj8QpAxO8qA&oe=6332935F",
  },
  {
    id: 9,
    img: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/300062413_760495215214677_3052793606819250638_n.jpg?stp=c0.183.1494.1494a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=da31f3&_nc_ohc=T9ozIN8ynO8AX8onboA&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT97WwFQkBc-rxb1vwIE01DDtVxpNNQJDLwA-FjgOeS-pQ&oe=633305D0",
  },
  {
    id: 10,
    img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/299589827_755926402338225_6825642757256425628_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=110&ccb=1-7&_nc_sid=da31f3&_nc_ohc=HSulbkCrAdQAX9EyGMj&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-h2NA_88UCFgV4zRsutYnF_-RBQUBP0jxWKpXwJW8e8Q&oe=63328661",
  },
  {
    id: 11,
    img: "https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/298464002_749055343025331_1167296593277346139_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=da31f3&_nc_ohc=lMq8OM3_iGAAX_sej1F&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_Z50bj2LYnfB5BhfItRjZJIfToo_HbrC5V9W8sR5GKJQ&oe=633236BC",
  },
  {
    id: 12,
    img: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/295049805_736802620917270_7612040871174002800_n.jpg?stp=c0.170.1534.1534a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=2PMGkZquOlQAX90MjGp&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT8zeFh-OF-LfV3UAiEhiGu0Ku0-quM3Xcy6z3l1l94J9Q&oe=63322DAD",
  },
  {
    id: 13,
    img: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/291968762_729048958359303_426274374217923795_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s851x315&_nc_cat=102&ccb=1-7&_nc_sid=da31f3&_nc_ohc=PR0tG6DccjAAX-XDyXE&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_kfbCUDKcq0afgmbLKiZppihFom48Q1GTCLUQD935hOw&oe=63328786",
  },
  {
    id: 14,
    img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/291975880_722576949006504_6343609623603038509_n.jpg?stp=c0.111.828.828a_dst-jpg_s851x315&_nc_cat=111&ccb=1-7&_nc_sid=da31f3&_nc_ohc=9gWxYgPPEUkAX8uoi9-&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-p6ouWQhcENLI0aUE3cqE4X-3JFuyZ9mwKlZI3oup0rQ&oe=63327404",
  },
  {
    id: 15,
    img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/289295104_716197346311131_5121845063860339154_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s851x315&_nc_cat=111&ccb=1-7&_nc_sid=da31f3&_nc_ohc=b8qllsC6jDAAX8FXTKl&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8kYFLCQvftvpiZDfXqXi4qKe_cLSIHBdjy0wR8t7iHgQ&oe=63331000",
  },
  {
    id: 16,
    img: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/286383047_708717027059163_3646638233984970685_n.jpg?stp=c0.177.1080.1080a_dst-jpg_s851x315&_nc_cat=101&ccb=1-7&_nc_sid=da31f3&_nc_ohc=yHujyKZdV6cAX-K9m-k&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_Q8mItzSfJ23vGJ3R7qZistOlwNaNYBC4IAMYoQUGv9w&oe=6332F307",
  },
  {
    id: 17,
    img: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/285059509_702190094378523_7789385719656744470_n.jpg?stp=c0.170.1534.1534a_dst-jpg_s851x315&_nc_cat=106&ccb=1-7&_nc_sid=da31f3&_nc_ohc=F0H4LopWt30AX-T2rBh&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9xeir2TJ1yRdauKkkVWYAUDGxC9s0wh7ZOAJuF1NcmsA&oe=6333806C",
  },
];
const listFile = [
  { id: 1, file: "nhom5.doc" },
  { id: 2, file: "nhom5.doc" },
  { id: 3, file: "nhom5.doc" },
  { id: 4, file: "nhom5.doc" },
  { id: 5, file: "nhom5.doc" },
  { id: 6, file: "nhom5.doc" },
  { id: 7, file: "nhom5.doc" },
  { id: 8, file: "nhom5.doc" },
  { id: 9, file: "nhom5.doc" },
];

export default function ChatInfo({ navigation, route }) {
  const { name, ava } = route.params;
  const [select, setSelected] = useState("image");

  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 33 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.navigate("ChatRoom", { nickname: name, avatar: ava });
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
            Tùy chọn
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image source={{ uri: ava }} style={styles.imgAva} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
          {name}
        </Text>
      </View>
      <View style={styles.viewTab}>
        <TouchableOpacity
          onPress={() => {
            setSelected("image");
          }}
        >
          <Text
            style={select == "image" ? styles.tabSelected : styles.tabNoSelect}
          >
            Ảnh/Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("file");
          }}
        >
          <Text
            style={select == "file" ? styles.tabSelected : styles.tabNoSelect}
          >
            File
          </Text>
        </TouchableOpacity>
      </View>
      <ChooseTab name={select} />
    </View>
  );
}
function ChooseTab(tab) {
  if (tab.name == "image") {
    return (
      <FlatList
        data={listImg}
        renderItem={({ item }) => <GridView name={item.img} />}
        // keyExtractor={(item, index) => index}
        numColumns={3}
        style={{ marginTop: 20 }}
      />
    );
  } else if (tab.name == "file") {
    return (
      <ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {listFile.map((e, i) => (
            <Files key={i} id={e.id} name={e.file} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const GridView = ({ name }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable
            style={{
              alignItems: "flex-end",
              paddingRight: 10,
              paddingTop: 10,
              zIndex: 4,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <MaterialIcons name="clear" size={30} color="white" />
          </Pressable>
          <Image
            source={{
              uri: name,
            }}
            style={styles.imageShow}
          />
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Image
          source={{
            uri: name,
          }}
          style={styles.imageItem}
        />
      </Pressable>
    </View>
  );
};
const Files = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.fileItem}>
        <AntDesign name="filetext1" size={24} color="black" />
        <Text style={styles.fileName}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    
  },
  imgAva: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  viewTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  tabNoSelect: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  tabSelected: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  imageItem: {
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width / 3,
  },
  fileItem: {
    padding: 20,
    flexDirection: "row",
    paddingLeft: 40,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  fileName: {
    fontSize: 17,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  imageShow: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    marginTop: -50,
  },
});
