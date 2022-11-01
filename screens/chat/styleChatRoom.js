import { StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // marginTop: StatusBar.currentHeight,
  },
  header: {
    width: "100%",
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(0,145,255)",
    flexDirection: "row",
  },
  iconBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
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
    marginTop: 7,
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-end",
  },
  iconBottom: {
    marginLeft: 5,
  },
  chatInput: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgb(0,145,255)",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  btnRemoveImg: {
    marginTop: -5,
    marginLeft: -15,
    backgroundColor: "grey",
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
export default styles;
