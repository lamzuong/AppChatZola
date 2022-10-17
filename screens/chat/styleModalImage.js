import { Dimensions, StyleSheet } from "react-native";
const styleModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "flex-end",
  },
  imageShow: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    marginTop: -50,
  },
  btnCloseModal: {
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
    zIndex: 4,
    width: 40,
    height: 40,
  },
});
export default styleModal;
