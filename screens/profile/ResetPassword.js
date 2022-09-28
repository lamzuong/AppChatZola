import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function ResetPassword({ navigation}) {
    const [oldpassword, setoldpassword] = useState('');
    const [password, setpassword] = useState('');
    const [passwordagain, setpasswordagain] = useState('');
    const [icon, seticon] = useState("eye-outline");
    const [icon1, seticon1] = useState("eye-outline");
    const [icon2, seticon2] = useState("eye-outline");
    const [hide, sethide] = React.useState(true);
    const [hide1, sethide1] = React.useState(true);
    const [hide2, sethide2] = React.useState(true);
    
  return (
    <View style={styles.container}>
            <Text style={styles.text}>Mật khẩu nên gồm chữ và số, không nên chứa năm sinh, username và tên Zola của bạn.</Text>
            <View  style={styles.input}>
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "80%" }}
                    value={oldpassword}
                    placeholder="Nhập mật khẩu cũ"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setoldpassword(text)}}
                    secureTextEntry={hide2}
                />
                {oldpassword && (
                    <TouchableOpacity
                    style={{marginTop:15, marginRight: 10}}
                    onPress={() => {
                        if (hide2===true){
                            sethide2(false);
                            seticon2("eye-off-outline");
                        }else{
                            sethide2(true);
                            seticon2("eye-outline"); 
                        }
                        
                    }}
                    >
                    <Ionicons
                        name={icon2}
                        size={24}
                        color="black"
                        style={styles.cam}
                        />
                    </TouchableOpacity>
                )}
                {oldpassword && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setoldpassword("");
                        sethide2(true);
                        seticon2("eye-outline"); 
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
                    placeholder="Nhập mật khẩu mới"
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
                    value={passwordagain}
                    placeholder="Nhập lại mật khẩu mới"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {setpasswordagain(text)}}
                    secureTextEntry={hide1}
                />
                {passwordagain && (
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
                {passwordagain && (
                    <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setpasswordagain("");
                        sethide1(true);
                        seticon1("eye-outline"); 
                    }}
                    >
                    <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
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
        flexDirection: "row",
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