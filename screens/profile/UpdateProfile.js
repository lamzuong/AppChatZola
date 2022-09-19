import React, { useEffect,useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import { RadioButton } from 'react-native-paper';


export default function UpdateProfile() {
    
    
    const [name, setname] = useState("User Name");
    const [birthday, setbirthday] = useState();
    const [checked, setChecked] = useState(true);
    const [avatar,setavatar] = useState();
    
    return (
        <View style={styles.container}>
            <View style={styles.infoUser}>
                <TouchableOpacity>
                    <Image source={{uri:avatar}} style={styles.AvatarURL}></Image>
                </TouchableOpacity>  
            </View>
            <TextInput 
                style={styles.input}
                value={name}
                placeholder="Nhập tên của bạn"
                onChangeText={(text) => {setname(text)}}
            />
            <TextInput 
                style={styles.input}
                value={birthday}
                placeholder="Nhập ngày sinh"
                onChangeText={(text) => {setbirthday(text)}}
            />
            <View style={styles.gender}>
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
            </View>
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
    infoUser:{
        marginTop:20,
        alignItems:"center",
        elevation:1, 
        margin: 20
    },
    AvatarURL:{
        borderColor:"black",
        borderWidth: 2,
        width: 170,
        height:170,
        borderRadius:85,
        aspectRatio:1,
        padding:1,
        
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
  

