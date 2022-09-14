import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image} from 'react-native';
import { FloatingAction } from "react-native-floating-action";


export default function Login({navigation}) {
    const [phoneNumber, setphoneNumber] = useState();
    const [password, setpassword] = useState();
    const [error, seterror] = useState('');

    async function toHome(){
        navigation.navigate("Home");
    }

    function resetpass(){
        navigation.navigate("ResetPassword");
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.login}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            
            <TextInput 
                style={styles.input}
                value={phoneNumber}
                placeholder="Nhập số điện thoại"
                placeholderTextColor='gray'
                onChangeText={(text) => {setphoneNumber(text)}}
                keyboardType="phone-pad"
                
            />
            <TextInput 
                style={styles.input}
                value={password}
                placeholder="Nhập mật khẩu"
                placeholderTextColor='gray'
                onChangeText={(text) => {setpassword(text)}}
                secureTextEntry={true}
            />
            <TouchableOpacity style={{margin:20}}>
                <Text style={{fontSize:18,color:"#0091ff",fontWeight:"bold",textAlign:'left',}}>Lấy lại mật khẩu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={toHome}>
                <Image source={require('../assets/next.png')} style={styles.image} ></Image>
            </TouchableOpacity>
                
            
        </View>
        
    );
    
  
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
    
    },
    input: {
        marginTop:10,
        color:"black",
        height: 60,
        fontSize:18,
        borderWidth: 2,
        borderColor: "#0091ff",
        marginLeft: 20,
        marginRight: 20,
        borderRadius:10,
        paddingStart:15,
        backgroundColor: "white",
    },
    login: {
        fontSize:13,
        textAlign:"center",
        margin:20
      },
    button: {
        backgroundColor: '#0091ff',
        borderRadius: 100,
        height: 55,
        width:55,
        flex:1,
        alignSelf: 'flex-end',
        margin: 15,
        position: 'absolute',
        bottom:0,
        right:0,
        
        
    },
    image: {
        width:30,
        height:30,
        alignSelf: 'center',
        marginTop: 13
    }
  });
  

