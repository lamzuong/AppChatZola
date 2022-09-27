import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";

export default function ForgetPassword({navigation}) {
    const [email, setemail] = useState('');
    
    function conFirm(){
        Alert.alert(
          "Xác nhận Email",
          `Chúng tôi sẽ gửi mã xác thực đến Email: \n \t\t${email.toString()} \n Vui lòng xác nhận Email này là đúng.`,
          [
            {
              text: "Thay đổi",
              style: "cancel"
            },
            { text: "Xác nhận", onPress:() => navigation.navigate("ConfirmEmailForget")}
          ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.signup}>Vui lòng nhập Email để lấy lại mật khẩu.</Text>
            
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={email}
                    placeholder="Nhập Email"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setemail(text)}}
                    keyboardType="email-address"
                />
                {email && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setemail("");
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            
            <TouchableOpacity style={styles.button} onPress={conFirm}>
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
        flexDirection: "row",
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
  

