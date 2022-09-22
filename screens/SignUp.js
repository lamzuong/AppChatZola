import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';


export default function SignUp({navigation}) {
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [checked, setChecked] = useState(true);

   
    

    function conFirm(){
        Alert.alert(
          "Xác nhận Email",
          "Chúng tôi sẽ gửi mã kích hoạt đến Email trên. Vui lòng xác nhận Email này là đúng.",
          [
            {
              text: "Thay đổi",
              style: "cancel"
            },
            { text: "Xác nhận", onPress:() => navigation.navigate("ConfirmEmail")}
          ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.signup}>Vui lòng nhập đầy đủ tên, Email và mật khẩu để đăng ký.</Text>
            <TextInput 
                style={styles.input}
                value={name}
                placeholder="Nhập tên đầy đủ"
                onChangeText={(text) => {setname(text)}}
            />
            <TextInput 
                style={styles.input}
                value={email}
                placeholder="Nhập Email"
                onChangeText={(text) => {setemail(text)}}
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input}
                value={password}
                placeholder="Nhập mật khẩu"
                onChangeText={(text) => {setpassword(text)}}
                secureTextEntry={true}
                
            />
            <TextInput 
                style={styles.input}
                value={repassword}
                placeholder="Nhập lại mật khẩu"
                onChangeText={(text) => {setrepassword(text)}}
                secureTextEntry={true}
                
            />
            
            {/* <View style={styles.gender}>
                <RadioButton
                    value="true"
                    status={ checked === true ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(true)}
                    color="#0091ff"
                /><Text style={styles.text}>Nam        </Text>
                <RadioButton
                    value="false"
                    status={ checked === false ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(false)}
                    color="#0091ff"
                /><Text style={styles.text}>Nữ</Text>
            </View> */}

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
  

