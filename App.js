import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./screens/chat/SearchBar";
import { useWindowDimensions } from "react-native";

import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import Rooms from "./screens/chat/Rooms";
import ChatRoom from "./screens/chat/ChatRoom";
import ChatInfo from "./screens/chat/ChatInfo";
import AddFriend from "./screens/friend/AddFriend";
import AddGroup from "./screens/friend/AddGroup";
import Directory from "./screens/friend/Directory";
import GroupFriends from "./screens/friend/GroupFriends";
import Profile from "./screens/profile/Profile";
import ResetPassword from "./screens/profile/ResetPassword";
import UpdateProfile from "./screens/profile/UpdateProfile";
import ConfirmEmail from "./screens/ConfirmEmail";
import ConfirmEmailForget from "./screens/ConfirmEmailForget";
import ForgetPassword from "./screens/ForgetPassword";
import RecoverPassword from "./screens/RecoverPassword";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Đăng nhập",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Tạo tài khoản",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ConfirmEmail"
          component={ConfirmEmail}
          options={{
            title: "Nhập mã kích hoạt",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ConfirmEmailForget"
          component={ConfirmEmailForget}
          options={{
            title: "Nhập mã xác thực",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Thông tin cá nhân",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="ChatInfo" component={ChatInfo} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen
          name="AddGroup"
          component={AddGroup}
          options={{
            headerLeft: HeaderAddGroup,
            headerShown: true,
            headerStyle: {},
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: "Đổi mật khẩu",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{
            title: "Cập nhật thông tin",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            title: "Lấy lại mật khẩu",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{
            title: "Lấy lại mật khẩu",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
            headerShown: true,
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const HeaderAddGroup = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerAddGroup]}>
      <TouchableOpacity
        style={styles.iconBackAddGroup}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons name="md-arrow-back-sharp" size={40} color="white" />
      </TouchableOpacity>
      <SearchBar title="Nhập tên cần tìm..." />
    </View>
  );
};
const styles = StyleSheet.create({
  headerAddGroup: {
    width: "88%",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconBackAddGroup: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
