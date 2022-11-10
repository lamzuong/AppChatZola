import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert, BackHandler } from "react-native";
import { Appbar } from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";

import Rooms from "./chat/Rooms";
import Profile from "./profile/Profile";
import Directory from "./friend/Directory";
import GroupFriends from "./friend/GroupFriends";
import InviteAddFrReceive from "./friend/InviteAddFrReceive";
import { io } from "socket.io-client";
import apiConfig from "../api/apiConfig";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function Home() {
  //=======Button Back============
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Thông báo", "Bạn có chắc muốn rời khỏi ứng dụng?", [
        {
          text: "Hủy",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Có", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      // initialRouteName="Rooms"
      screenOptions={{
        tabBarActiveTintColor: "#0091ff",
        tabBarInactiveTintColor: "#0091ff",
        tabBarActiveBackgroundColor: "#0091ff",
        tabBarInactiveBackgroundColor: "#0091ff",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                {focused ? <Text style={styles.label}>Tin nhắn</Text> : null}
              </View>
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AntDesign
                  style={{
                    color: focused ? "white" : "#c3c3c3",
                    paddingTop: 5,
                  }}
                  name="message1"
                  size={30}
                  color="black"
                ></AntDesign>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={TopNavigator}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                {focused ? <Text style={styles.label}>Danh bạ</Text> : null}
              </View>
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialCommunityIcons
                  style={{
                    color: focused ? "white" : "#c3c3c3",
                    paddingTop: 5,
                  }}
                  name="account-multiple-outline"
                  size={30}
                  color="black"
                ></MaterialCommunityIcons>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTintColor: "white",
          headerShown: false,
          headerStyle: { backgroundColor: "#0091ff" },
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                {focused ? <Text style={styles.label}>Cá nhân</Text> : null}
              </View>
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialCommunityIcons
                  style={{
                    color: focused ? "white" : "#c3c3c3",
                    paddingTop: 5,
                  }}
                  name="account-circle-outline"
                  size={30}
                  color="black"
                ></MaterialCommunityIcons>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const TopNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarPressColor: "#000033",
        tabBarStyle: [
          {
            justifyContent: "center",
            backgroundColor: "#0091ff",
            height: 60,
          },
        ],
      }}
    >
      <TopTab.Screen name="Lời mời" component={InviteAddFrReceive} />
      <TopTab.Screen name="Bạn bè" component={Directory} />
      <TopTab.Screen name="Nhóm" component={GroupFriends} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  topTab: {
    marginTop: Constants.statusBarHeight,
  },
});
