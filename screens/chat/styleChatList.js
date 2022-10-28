import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  items: {
    marginVertical: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  user: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f0",
  },
  imageAva: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  nickname: {
    fontWeight: "normal",
    fontSize: 22,
    marginLeft: 20,
  },
  chatLastTime: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 5,
    color: "grey",
    maxWidth: "70%",
    maxHeight: 25,
  },
});
export default styles;
