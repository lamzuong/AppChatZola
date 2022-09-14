import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import ConfirmPhone from './screens/ConfirmPhone';

const Stack=createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={Login} options={{title: 'Đăng nhập', headerTintColor: 'white',headerStyle: {backgroundColor: '#0091ff'}}}></Stack.Screen>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}  options={{title: 'Tạo tài khoản', headerTintColor: 'white',headerStyle: {backgroundColor: '#0091ff'}}} ></Stack.Screen>
        <Stack.Screen name="ConfirmPhone" component={ConfirmPhone}  options={{title: 'Nhập mã kích hoạt', headerTintColor: 'white',headerStyle: {backgroundColor: '#0091ff'}}} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}