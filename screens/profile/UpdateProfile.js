import React, { useEffect,useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity,TextInput,Button, Platform} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function UpdateProfile() {
    const [name, setname] = useState("Anya");
    const [birthday, setbirthday] = useState('');
    const [checked, setChecked] = useState(true);
    const [avatar,setavatar] = useState("https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg");

    const [icon, seticon] = useState("calendar");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setbirthday(date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear());
        seticon("close");
        hideDatePicker();
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.infoUser}>
                <TouchableOpacity>
                    <Image source={{uri:avatar}} style={styles.AvatarURL}></Image>
                    <Ionicons
                        name="camera-reverse-outline"
                        size={28}
                        color="black"
                        style={styles.cam}
                    />
                </TouchableOpacity>  
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
            <TouchableOpacity  style={styles.input}
                onPress={() => {showDatePicker()}}
            >
                <TextInput 
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={birthday}
                    placeholder="Nhập ngày sinh"
                    placeholderTextColor='gray'
                    editable={false}
                    onChangeText={(text) => {setbirthday(text)}}
                />
                <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        if (icon==='close') {
                            setbirthday("");
                            seticon("calendar");
                        } else {
                            showDatePicker();
                        }
                    }}
                    >
                     <Ionicons
                        name={icon}
                        size={24}
                        color="black"
                        />
                </TouchableOpacity>
            </TouchableOpacity>
            
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

            

            <View>
                {/* <Text>{text}</Text>
                <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

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
        borderColor:"gray",
        borderWidth: 1,
        width: 170,
        height:170,
        borderRadius:85,
        aspectRatio:1,
        padding:1,
        
    },
    cam: {
        borderColor: "grey",
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 85,
        aspectRatio: 1,
        padding: 1,
        backgroundColor: "white",
        position: "absolute",
        alignSelf: "center",
        bottom: -12
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
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });
  

