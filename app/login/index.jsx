import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const route = useRouter();

  return (
    <View>
      <Image
        source={require("../../assets/images/consult.png")}
        style={{
          height: 400,
          width: "100%",
        }}
      />

      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderRadius: 40,
          padding: 15,
        }}
      >
        <Text
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Stay on Track, Stay Healthy.
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Track your meds, take control of your health. Stay consistant, stay
          healthy.
        </Text>

        <TouchableOpacity
          onPress={() => route.push("login/signin")}
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            margin: 20,
            marginTop: 50,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
