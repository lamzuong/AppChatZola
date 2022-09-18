import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function Directory() {
  const listFriends = [
    {
      id: "1",
      ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
      name: "Phúc Du",
    },
    {
      id: "2",
      ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
      name: "Phuc Nguyen",
    },
    {
      id: "3",
      ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
      name: "Minh Vuong M4U",
    },
    {
      id: "4",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Nam Zuong",
    },
    {
      id: "5",
      ava: "https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg",
      name: "Ban Nuoc",
    },
    {
      id: "6",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Ân Nguyễn",
    },
    {
      id: "7",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Phuc Lon",
    },
    {
      id: "8",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Nguyễn Lữ",
    },
    {
      id: "9",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Quoc",
    },
    {
      id: "10",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Vuong",
    },
    {
      id: "11",
      ava: "https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg",
      name: "Nam",
    },
    {
      id: "12",
      ava: "https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg",
      name: "Phuc Cat",
    },
    {
      id: "13",
      ava: "https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg",
      name: "Nguyen Hue",
    },
    {
      id: "14",
      ava: "https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg",
      name: "Quoc Te",
    },
    {
      id: "15",
      ava: "https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg",
      name: "Vuong Quoc",
    },
  ];
  var listA = [];
  var listB = [];
  var listC = [];
  var listD = [];
  var listE = [];
  var listF = [];
  var listG = [];
  var listH = [];
  var listI = [];
  var listJ = [];
  var listK = [];
  var listL = [];
  var listM = [];
  var listN = [];
  var listO = [];
  var listP = [];
  var listQ = [];
  var listR = [];
  var listS = [];
  var listT = [];
  var listU = [];
  var listV = [];
  var listW = [];
  var listX = [];
  var listY = [];
  var listZ = [];
  var listAW = [];
  var listAA = [];
  var listDD = [];
  var listEE = [];
  var listOO = [];
  var listOW = [];
  var listUW = [];
  listFriends.forEach((element) => {
    if (element.name.startsWith("A")) {
      listA.push(element);
    } else if (element.name.startsWith("Ă")) {
      listAW.push(element);
    } else if (element.name.startsWith("Â")) {
      listAA.push(element);
    } else if (element.name.startsWith("B")) {
      listB.push(element);
    } else if (element.name.startsWith("C")) {
      listC.push(element);
    } else if (element.name.startsWith("D")) {
      listD.push(element);
    } else if (element.name.startsWith("Đ")) {
      listDD.push(element);
    } else if (element.name.startsWith("E")) {
      listE.push(element);
    } else if (element.name.startsWith("Ê")) {
      listEE.push(element);
    } else if (element.name.startsWith("F")) {
      listF.push(element);
    } else if (element.name.startsWith("G")) {
      listG.push(element);
    } else if (element.name.startsWith("H")) {
      listH.push(element);
    } else if (element.name.startsWith("I")) {
      listI.push(element);
    } else if (element.name.startsWith("J")) {
      listJ.push(element);
    } else if (element.name.startsWith("K")) {
      listK.push(element);
    } else if (element.name.startsWith("L")) {
      listL.push(element);
    } else if (element.name.startsWith("M")) {
      listM.push(element);
    } else if (element.name.startsWith("N")) {
      listN.push(element);
    } else if (element.name.startsWith("O")) {
      listO.push(element);
    } else if (element.name.startsWith("Ô")) {
      listOO.push(element);
    } else if (element.name.startsWith("Ơ")) {
      listOW.push(element);
    } else if (element.name.startsWith("P")) {
      listP.push(element);
    } else if (element.name.startsWith("Q")) {
      listQ.push(element);
    } else if (element.name.startsWith("R")) {
      listR.push(element);
    } else if (element.name.startsWith("S")) {
      listS.push(element);
    } else if (element.name.startsWith("T")) {
      listT.push(element);
    } else if (element.name.startsWith("U")) {
      listU.push(element);
    } else if (element.name.startsWith("Ư")) {
      listUW.push(element);
    } else if (element.name.startsWith("V")) {
      listV.push(element);
    } else if (element.name.startsWith("W")) {
      listW.push(element);
    } else if (element.name.startsWith("X")) {
      listX.push(element);
    } else if (element.name.startsWith("Y")) {
      listY.push(element);
    } else if (element.name.startsWith("Z")) {
      listZ.push(element);
    }
  });
  const listAll = [
    listA,
    listAW,
    listAA,
    listB,
    listC,
    listD,
    listDD,
    listE,
    listEE,
    listF,
    listG,
    listH,
    listI,
    listJ,
    listK,
    listL,
    listM,
    listN,
    listO,
    listOO,
    listOW,
    listP,
    listQ,
    listR,
    listS,
    listT,
    listU,
    listUW,
    listV,
    listW,
    listX,
    listY,
    listZ,
  ];
  const setShow = [];
  for (let i = 0; i < 32; i++) {
    if (listAll[i].length == 0) setShow[i] = false;
    else setShow[i] = true;
  }
  console.log(listM);
  return (
    <View>
      <ScrollView>
        <View>
          {setShow[0] ? <Text style={styles.title}>A</Text> : null}
          {listA.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[1] ? <Text style={styles.title}>Ă</Text> : null}
          {listAW.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[2] ? <Text style={styles.title}>Â</Text> : null}
          {listAA.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[3] ? <Text style={styles.title}>B</Text> : null}
          {listB.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[4] ? <Text style={styles.title}>C</Text> : null}
          {listC.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[5] ? <Text style={styles.title}>D</Text> : null}
          {listD.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[6] ? <Text style={styles.title}>Đ</Text> : null}
          {listDD.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[7] ? <Text style={styles.title}>E</Text> : null}
          {listE.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[8] ? <Text style={styles.title}>Ê</Text> : null}
          {listEE.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[9] ? <Text style={styles.title}>F</Text> : null}
          {listF.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[10] ? <Text style={styles.title}>G</Text> : null}
          {listG.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[11] ? <Text style={styles.title}>H</Text> : null}
          {listH.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[12] ? <Text style={styles.title}>I</Text> : null}
          {listI.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[13] ? <Text style={styles.title}>J</Text> : null}
          {listJ.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[14] ? <Text style={styles.title}>K</Text> : null}
          {listK.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[15] ? <Text style={styles.title}>L</Text> : null}
          {listL.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[16] ? <Text style={styles.title}>M</Text> : null}
          {listM.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[17] ? <Text style={styles.title}>N</Text> : null}
          {listN.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[18] ? <Text style={styles.title}>O</Text> : null}
          {listO.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[19] ? <Text style={styles.title}>Ô</Text> : null}
          {listOO.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[20] ? <Text style={styles.title}>Ơ</Text> : null}
          {listOW.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[21] ? <Text style={styles.title}>P</Text> : null}
          {listP.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[22] ? <Text style={styles.title}>Q</Text> : null}
          {listQ.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[23] ? <Text style={styles.title}>R</Text> : null}
          {listR.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[24] ? <Text style={styles.title}>S</Text> : null}
          {listS.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[25] ? <Text style={styles.title}>T</Text> : null}
          {listT.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[26] ? <Text style={styles.title}>U</Text> : null}
          {listU.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[27] ? <Text style={styles.title}>Ư</Text> : null}
          {listUW.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[28] ? <Text style={styles.title}>V</Text> : null}
          {listV.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[29] ? <Text style={styles.title}>W</Text> : null}
          {listW.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[30] ? <Text style={styles.title}>X</Text> : null}
          {listX.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[31] ? <Text style={styles.title}>Y</Text> : null}
          {listY.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
        <View>
          {setShow[32] ? <Text style={styles.title}>Z</Text> : null}
          {listZ.map((e, i) => (
            <ListFriend key={i} id={e.id} ava={e.ava} name={e.name} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const ListFriend = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.items}>
        <Image
          source={{
            uri: props.ava,
          }}
          style={styles.imageAva}
        />
        <Text style={styles.nickname}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  items: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
  },
  imageAva: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  nickname: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 7,
  },
});
