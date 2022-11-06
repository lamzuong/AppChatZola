import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  items: {
    marginVertical: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageAva: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  nickname: {
    fontWeight: "normal",
    fontSize: 18,
    marginLeft: 20,
  },
  btnSend: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 15,
  },
  sended: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 15,
  },
});
export default styles;
