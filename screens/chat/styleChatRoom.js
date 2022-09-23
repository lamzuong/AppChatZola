import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
  },
  iconBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  nickname: {
    marginLeft: 20,
    fontSize: 20,
    color: "white",
  },
  statusUser: {
    marginLeft: 20,
    color: "white",
  },
  iconTop: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    padding: 10,
  },
  iconBottom: {
    marginLeft: 5,
  },
  chatInput: {
    height: 40,
    width: "85%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgb(0,145,255)",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
export default styles;
