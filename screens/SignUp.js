import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput, Image, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
export default function SignUp({navigation}) {
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [checked, setChecked] = useState(true);
    const [icon, seticon] = useState("eye-outline");
    const [icon1, seticon1] = useState("eye-outline");
    const [hide, sethide] = React.useState(true);
    const [hide1, sethide1] = React.useState(true);
    function conFirm(){
        Alert.alert(
          "Xác nhận Email",
          `Chúng tôi sẽ gửi mã kích hoạt đến Email: \n \t\t${email.toString()} \n Vui lòng xác nhận Email này là đúng.`,
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
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={username}
                    placeholder="Nhập Username"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setusername(text)}}
                    
                />
                {username && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setusername("");
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
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
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={name}
                    placeholder="Nhập tên đầy đủ"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setname(text)}}
                    
                />
                {name && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setname("");
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "80%" }}
                    value={password}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setpassword(text)}}
                    secureTextEntry={hide}
                />
                {password && (
                    <TouchableOpacity
                    style={{marginTop:15, marginRight: 10}}
                    onPress={() => {
                        if (hide===true){
                            sethide(false);
                            seticon("eye-off-outline");
                        }else{
                            sethide(true);
                            seticon("eye-outline"); 
                        }
                        
                    }}
                    >
                    <Ionicons
                        name={icon}
                        size={24}
                        color="black"
                        style={styles.cam}
                        />
                    </TouchableOpacity>
                )}
                {password && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setpassword("");
                        sethide(true);
                        seticon("eye-outline");
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "80%" }}
                    value={repassword}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setrepassword(text)}}
                    secureTextEntry={hide1}
                />
                {repassword && (
                    <TouchableOpacity
                    style={{marginTop:15, marginRight: 10}}
                    onPress={() => {
                        if (hide1===true){
                            sethide1(false);
                            seticon1("eye-off-outline");
                        }else{
                            sethide1(true);
                            seticon1("eye-outline"); 
                        }
                        
                    }}
                    >
                    <Ionicons
                        name={icon1}
                        size={24}
                        color="black"
                        style={styles.cam}
                        />
                    </TouchableOpacity>
                )}
                {repassword && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setrepassword("");
                        sethide1(true);
                        seticon1("eye-outline");
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            
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
  

