import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/images/consult.png")}
        style={{
          height: 280,
          width: "100%",
        }}
      />

      {/* <TouchableOpacity>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;
