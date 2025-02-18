import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage, RemoveLocalStorage } from "../../service/Storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUser(userInfo);
  };

  const Logout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "NO",
        onPress: () => console.log("Logout cancelled"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await RemoveLocalStorage('userDetail'); // Clears all storage
            ToastAndroid.show("Logged Out Successful", ToastAndroid.LONG);
            route.replace("login"); // Navigate to login screen
          } catch (e) {
            console.log("Logout Error:", e);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 34 }}>Profile</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 25 }}>
        <Image
          source={require("../../assets/images/smiley.png")}
          style={{ height: 70, width: 70 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 24,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {user?.displayName}
        </Text>
        <Text
          style={{
            marginTop: 2,
            color: "gray",
            fontSize: 20,
            fontWeight: "",
            alignItems: "center",
          }}
        >
          {user?.email}
        </Text>
      </View>

      <View style={{ marginTop: 15, marginLeft: 18 }}>
        <TouchableOpacity
          onPress={() => route.push("add-new-medication")}
          style={styles.container}
        >
          <AntDesign
            style={styles.icon}
            name="pluscircle"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 20 }}>Add New Medication</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => route.push("")}
          style={styles.container}
        >
          <Ionicons
            style={styles.icon}
            name="medkit-outline"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 20 }}>My Medication</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => route.push()}
          style={styles.container}
        >
          <AntDesign
            style={styles.icon}
            name="clockcircleo"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 20 }}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Logout} style={styles.container}>
          <AntDesign
            style={styles.icon}
            name="logout"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 20 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.BLUE,
    borderRadius: 15,
  },
  container: {
    gap: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
