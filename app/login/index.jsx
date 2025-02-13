import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { router, useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <View>
      <View>
        <Image
          source={require("../../assets/images/consult.png")}
          style={{ height: 500, width: "100%" }}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          backgroundColor: Colors.PRIMARY,
          height: "100%",
        }}
      >
        <Text>Consult a doctor</Text>
        <Text>For free</Text>

        <TouchableOpacity
          onPress={() => router.push("login/signin")}
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 99,
            marginTop: 20,
            width: "80%",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
        <Text>By continueing you agree to trms</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
