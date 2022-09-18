import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
  },
  txtSearch: {
    height: 45,
    width: "90%",
    flexDirection: "row",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "rgb(124,189,255)",
    borderRadius: 10,
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  iconAdd: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 5,
  },
});
export default styles;
