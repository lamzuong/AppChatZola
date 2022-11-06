import { Dimensions, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
  },
  imgAva: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  txtNameGr: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    maxHeight: 300,
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
  viewOption: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconOption: {
    width: 35,
    height: 35,
    borderRadius: 100,
    padding: 5,
    backgroundColor: "#f2f2f2",
  },
  btnInfoGr: {
    alignItems: "center",
    paddingLeft: 20,
    flexDirection: "row",
  },
  txtInfoGr: {
    fontSize: 18,
    padding: 10,
    paddingVertical: 15,
  },
  borderBot: {
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "rgb(230,230,230)",
    marginLeft: 20,
  },
  btnAddMem: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  txtAddMem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  itemMemAdd: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  viewBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  viewBtnRename: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
    marginTop: 10,
  },
  btnRename: {
    padding: 5,
    width: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  txtRename: {
    color: "white",
    fontWeight: "bold",
  },
});
export default styles;
