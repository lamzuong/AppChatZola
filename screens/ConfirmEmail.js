import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';


export default function ConfirmEmail({navigation}) {
    
    const [num, setNum] = useState('');
    
    function toHome(){
        navigation.navigate("Home");
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.signup}>Vui lòng không chia sẽ mã kích hoạt để tránh mất tài khoản.</Text>
            <TextInput 
                style={styles.input}
                value={num}
                placeholder="Nhập mã kích hoạt"
                onChangeText={(text) => {setNum(text)}}
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
    signup: {
        fontSize:13,
        textAlign:"left",
        margin:20
      },
    text:{
        marginTop:10,
        fontSize:18,
        color:"black" ,
        textAlign:'left',
        paddingLeft:20
    },
    gender:{
        flexDirection:'row',
        marginTop:10,
        paddingLeft:20,
       
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
  

