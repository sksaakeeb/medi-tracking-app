import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Data from "../constant/Data";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

const NullStateHome = () => {
  const route = useRouter();

  return (
    <View
      style={{
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/medicine.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 22,
          fontWeight: "bold",
          color: "black",
          marginTop: 20,
        }}
      >
        {Data.NoMedications}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "gray",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {Data.SubText}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 15,
          marginTop: 30,
          width: "100%",
        }}
        onPress={() => route.push("/add-new-medication")}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          + Add New Medication
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NullStateHome;
