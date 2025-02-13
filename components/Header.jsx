import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../service/Storage";
import Feather from "@expo/vector-icons/Feather";

const Header = () => {
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
          justifyContent: "center",
          alignItems: "center",
          // justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Image
          source={require("../assets/images/smiley.png")}
          style={{ width: 45, height: 45 }}
        />

        <Text
          style={{ fontSize: 18, fontWeight: "bold", alignItems: "center" }}
        >
          Hello, {user?.email} 👋🏻
        </Text>

        {/* <Feather name="settings" size={24} color="black" /> */}
      </View>
    </View>
  );
};

export default Header;
