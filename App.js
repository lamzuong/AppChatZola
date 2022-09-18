import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import ConfirmPhone from "./screens/ConfirmPhone";
import Rooms from "./screens/chat/Rooms";
import ChatRoom from "./screens/chat/ChatRoom";
import AddFriend from "./screens/friend/AddFriend";
import Directory from "./screens/friend/Directory";
import GroupFriends from "./screens/friend/GroupFriends";

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
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ConfirmPhone"
          component={ConfirmPhone}
          options={{
            title: "Nhập mã kích hoạt",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0091ff" },
          }}
        ></Stack.Screen>
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
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
