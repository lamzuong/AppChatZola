import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image} from 'react-native';

export default function RecoverPassword({navigation}) {
    
    const [password, setpassword] = useState('');
    const [passwordagain, setpasswordagain] = useState('');
    
    function toHome(){
        navigation.navigate("Home");
    }
    
  return (
    <View style={styles.container}>
            <Text style={styles.text}>Mật khẩu nên gồm chữ và số, không nên chứa năm sinh, username và tên Zola của bạn.</Text>
            
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
            
            <TouchableOpacity style={styles.button} onPress={toHome}>
                <Image source={require('../assets/next.png')} style={styles.image}></Image>
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