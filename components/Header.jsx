import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Header = () => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/smiley.png")}
            style={{ width: 45, height: 45 }}
          />

          <Text
            style={{ fontSize: 20, fontWeight: "bold", alignItems: "center" }}
          >
            Hi, {user?.displayName} 👋🏻
          </Text>
        </View>

        <TouchableOpacity onPress={() => route.push("/add-new-medication")}>
          <Ionicons name="medkit-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
