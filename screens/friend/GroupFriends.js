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
      ava: "https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000",
      name: "Nhóm Facebook",
    },
    {
      id: "2",
      ava: "https://static-znews.zadn.vn/static/topic/person/jennie.jpg",
      name: "Nhóm Zalo",
    },
    {
      id: "3",
      ava: "https://ss-images.saostar.vn/wp700/pc/1660210289262/saostar-bmjs2gr1wqauwg0e.jpg",
      name: "Nhóm Instagram",
    },
    {
      id: "4",
      ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvu2-L0ODW6fvsFBz2uiwyBnBM68XjksXbw&usqp=CAU",
      name: "Nhóm Telegram",
    },
    {
      id: "5",
      ava: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/307309439_775797003684498_7651677250973376773_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=LiGf-yO5FyQAX8a_7hp&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT8Ql94JX2KUIDZhzrU5oDl9fdsKjBy7Cc56t6EppphgOw&oe=6331C0DF",
      name: "Nhóm Twitter",
    },
    {
      id: "6",
      ava: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/300062413_760495215214677_3052793606819250638_n.jpg?stp=c0.183.1494.1494a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=da31f3&_nc_ohc=T9ozIN8ynO8AX8onboA&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT97WwFQkBc-rxb1vwIE01DDtVxpNNQJDLwA-FjgOeS-pQ&oe=633305D0",
      name: "Nhóm Messenger",
    },
    {
      id: "7",
      ava: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/299589827_755926402338225_6825642757256425628_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=110&ccb=1-7&_nc_sid=da31f3&_nc_ohc=HSulbkCrAdQAX9EyGMj&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-h2NA_88UCFgV4zRsutYnF_-RBQUBP0jxWKpXwJW8e8Q&oe=63328661",
      name: "Nhóm Tiktok",
    },
    {
      id: "8",
      ava: "https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/298464002_749055343025331_1167296593277346139_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=da31f3&_nc_ohc=lMq8OM3_iGAAX_sej1F&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_Z50bj2LYnfB5BhfItRjZJIfToo_HbrC5V9W8sR5GKJQ&oe=633236BC",
      name: "Nhóm Pỏn",
    },
    {
      id: "9",
      ava: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/295049805_736802620917270_7612040871174002800_n.jpg?stp=c0.170.1534.1534a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=2PMGkZquOlQAX90MjGp&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT8zeFh-OF-LfV3UAiEhiGu0Ku0-quM3Xcy6z3l1l94J9Q&oe=63322DAD",
      name: "Nhóm Only Quạt",
    },
    {
      id: "10",
      ava: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/291968762_729048958359303_426274374217923795_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s851x315&_nc_cat=102&ccb=1-7&_nc_sid=da31f3&_nc_ohc=PR0tG6DccjAAX-XDyXE&tn=BQxfjurnSuuiGsnJ&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_kfbCUDKcq0afgmbLKiZppihFom48Q1GTCLUQD935hOw&oe=63328786",
      name: "Nhóm QQ Live",
    },
    {
      id: "11",
      ava: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/291975880_722576949006504_6343609623603038509_n.jpg?stp=c0.111.828.828a_dst-jpg_s851x315&_nc_cat=111&ccb=1-7&_nc_sid=da31f3&_nc_ohc=9gWxYgPPEUkAX8uoi9-&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-p6ouWQhcENLI0aUE3cqE4X-3JFuyZ9mwKlZI3oup0rQ&oe=63327404",
      name: "Nhóm Tinder",
    },
  ];
  
  return (
    <View>
      <ScrollView>
        {listGroups.map((e, i) => (
          <ItemFriend
            key={i}
            id={e.id}
            ava={e.ava}
            name={e.name}
          />
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
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f0",
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
