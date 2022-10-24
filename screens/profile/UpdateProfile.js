import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import axiosCilent from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

export default function UpdateProfile({ navigation }) {
    const { user } = React.useContext(AuthContext);

    const [name, setname] = useState(user.fullName);
    const [birthday, setbirthday] = useState(user.birthdate);
    const [checked, setChecked] = useState(user.gender ? true : false);
    const [avatar, setavatar] = useState("https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg");
    const [icon, seticon] = useState("calendar");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [errorFullname, seterrorFullname] = useState('Lỗi');
    const [hideErrorFullname, sethideErrorFullname] = useState(false);
    const [hidebtn, sethidebtn] = useState(true);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setbirthday(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        seticon("close");
        hideDatePicker();
    };

    const isEmpty = (str) => {
        if (str.trim().length === 0) {
            return true;
        } else {
            return false;
        }
    };

    function removeAscent(str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }

    const validateFullname = (fullName) => {
        var re = /^[a-zA-Z ]{1,30}$/;
        return re.test(removeAscent(fullName));
    };

    const hideBtnSignup = (fullName) => {
        if (isEmpty(fullName)) {
            return true;
        } else {
            return false;
        }
    }

    const handleUpdateUser = async (id,fullName, birthdate, gender, img ,fullNameOld, birthdateOld, genderOld, imgOld) => {
        try {
          await axiosCilent.put("/zola/users/", { id, fullName ,birthdate, gender, img ,fullNameOld, birthdateOld, genderOld, imgOld });
          navigation.navigate("Home");
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.infoUser}>
                <TouchableOpacity>
                    <Image source={{ uri: user?.img ? user.img : "https://res.cloudinary.com/dicpaduof/image/upload/v1665828418/noAvatar_c27pgy.png" }} style={styles.AvatarURL}></Image>
                    <Ionicons
                        name="camera-reverse-outline"
                        size={28}
                        color="black"
                        style={styles.cam}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <TextInput
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={name}
                    placeholder="Nhập tên đầy đủ"
                    placeholderTextColor='gray'
                    onChangeText={(text) => {
                        if (isEmpty(text)) {
                            sethideErrorFullname(true);
                            seterrorFullname('Tên đầy đủ không được rỗng.');
                            sethidebtn(false);
                        } else {
                            if (!validateFullname(text)) {
                                sethideErrorFullname(true);
                                seterrorFullname('Tên đầy đủ không bao gồm chữ số, ký tự đặc biệt và tối đa 30 ký tự.');
                                sethidebtn(false);
                            } else {
                                seterrorFullname('');
                                sethideErrorFullname(false);
                                if (!hideBtnSignup(name)) {
                                    sethidebtn(true);
                                } else {
                                    sethidebtn(false);
                                }
                            }
                        }
                        setname(text)
                    }}
                />
                {name && (
                    <TouchableOpacity
                        style={{ marginTop: 15 }}
                        onPress={() => {
                            setname("");
                            sethidebtn(false);
                        }}
                    >
                        <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            {hideErrorFullname &&
                <Text style={{ fontSize: 14, color: "red", marginLeft: 25, marginRight: 25, marginTop: 10 }}>{errorFullname}</Text>
            }
            <TouchableOpacity style={styles.input}
                onPress={() => { showDatePicker() }}
            >
                <TextInput
                    style={{ fontSize: 18, color: "black", width: "90%" }}
                    value={birthday}
                    placeholder="Nhập ngày sinh"
                    placeholderTextColor='gray'
                    editable={false}
                    onChangeText={(text) => { setbirthday(text) }}
                />
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => {
                        if (icon === 'close') {
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
                <Text style={[styles.text, { paddingRight: 10 }]}>Giới tính:</Text>
                <RadioButton
                    value="true"
                    status={checked === true ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(true)}
                    color="#0091ff"
                /><Text style={styles.text}>Nam        </Text>
                <RadioButton
                    value="false"
                    status={checked === false ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(false)}
                    color="#0091ff"
                /><Text style={styles.text}>Nữ</Text>
            </View>

            <TouchableOpacity
                style={hidebtn ? styles.button : styles.buttonhide}
                disabled={!hidebtn}
                onPress = {() => {
                    handleUpdateUser(user.id, name,birthday, checked, null,user.fullName, user.birthdate, user.gender, user.img)
                }}
            >
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
                    date={new Date(2000, 1, 1)}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,

    },
    infoUser: {
        marginTop: 20,
        alignItems: "center",
        elevation: 1,
        margin: 20
    },
    AvatarURL: {
        borderColor: "gray",
        borderWidth: 1,
        width: 170,
        height: 170,
        borderRadius: 85,
        aspectRatio: 1,
        padding: 1,

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

    text: {
        marginTop: 5,
        fontSize: 18,
        color: "black",
        textAlign: 'left',
        paddingLeft: 20
    },
    gender: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 5,

    },
    input: {
        marginTop: 10,
        color: "black",
        height: 60,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#0091ff",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        paddingStart: 15,
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
    buttonhide: {
        paddingTop: 9,
        color: "white",
        alignItems: "center",
        backgroundColor: "#7EC0EE",
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


