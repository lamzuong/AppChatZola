import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import Rooms from "./screens/chat/Rooms";
import ChatRoom from "./screens/chat/ChatRoom";
import AddFriend from "./screens/friend/AddFriend";
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
        <Stack.Screen name="AddFriend" component={AddFriend} />
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
        {/* <Stack.Screen name="Danh bạ" component={TopNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// const TopNavigator = () => {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="Bạn bè" component={Directory} />
//       <TopTab.Screen name="Nhóm" component={GroupFriends} />
//     </TopTab.Navigator>
//   );
// };
