import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput} from 'react-native';

export default function ResetPassword({ navigation}) {
    const [oldpassword, setoldpassword] = useState('');
    const [password, setpassword] = useState('');
    const [passwordagain, setpasswordagain] = useState('');
    
    
  return (
    <View style={styles.container}>
            <Text style={styles.text}>Mật khẩu nên gồm chữ và số, không nên chứa năm sinh, username và tên Zola của bạn.</Text>
            <TextInput 
                style={styles.input}
                value={oldpassword}
                placeholder="Nhập mật khẩu cũ"
                placeholderTextColor='gray'
                onChangeText={(text) => {setoldpassword(text)}}
            />
           
            
            <TextInput 
                style={styles.input}
                value={password}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor='gray'
                onChangeText={(text) => {setpassword(text)}}
                secureTextEntry={true}
            />
            
            
            <TextInput 
                style={styles.input}
                value={passwordagain}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor='gray'
                onChangeText={(text) => {setpasswordagain(text)}}
                secureTextEntry={true}
            />
            
            <TouchableOpacity style={styles.button} >
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                Cập nhật
                </Text>
            </TouchableOpacity>
        </View>
  );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
    
    },
    text: {
        fontSize:13,
        textAlign:"left",
        margin:20
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
    
    button: {
        paddingTop: 9,
        color: "white",
        alignItems: "center",
        backgroundColor: "#0091ff",
        height: 50,
        width: 200,
        fontSize: 25,
        borderColor: "#0091ff",
        marginTop: 30,
        borderRadius: 100,
        alignSelf: "center",
      },
  });