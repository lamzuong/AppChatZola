import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
    alignItems: "center",
  },
  iconAdd: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  menuFunction: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 10,
  },
  iconMenu: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  btnSearch: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  txtSearch: {
    marginLeft: 10,
    color: "rgb(124,189,255)",
    fontSize: 18,
  },
});
export default styles;
