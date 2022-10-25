import React from "react";
import {
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useWindowDimensions } from "react-native";
import LogInFirst from "./screens/LogInFirst";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import ChatRoom from "./screens/chat/ChatRoom";
import ChatInfo from "./screens/chat/ChatInfo";
import ChatInfoGroup from "./screens/chat/ChatInfoGroup";
import ListMemberGroup from "./screens/chat/ListMemberGroup";
import FileMediaGroup from "./screens/chat/FileMediaGroup";
import AddFriend from "./screens/friend/AddFriend";
import AddGroup from "./screens/friend/AddGroup";
import ResetPassword from "./screens/profile/ResetPassword";
import UpdateProfile from "./screens/profile/UpdateProfile";
import ForgetPassword from "./screens/ForgetPassword";
import { AuthContextProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
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
              headerShown: false,
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
            name="LogInFirst"
            component={LogInFirst}
            options={{
              title: "Nhập mã kích hoạt",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#0091ff" },
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen
            name="ListMemberGroup"
            component={ListMemberGroup}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="FileMediaGroup"
            component={FileMediaGroup}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ChatInfo"
            component={ChatInfo}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ChatInfoGroup"
            component={ChatInfoGroup}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="AddFriend"
            component={AddFriend}
            options={{ animation: "fade" }}
          />
          <Stack.Screen name="AddGroup" component={AddGroup} />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              title: "Đổi mật khẩu",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#0091ff" },
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{
              title: "Cập nhật thông tin",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#0091ff" },
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              title: "Lấy lại mật khẩu",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#0091ff" },
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
