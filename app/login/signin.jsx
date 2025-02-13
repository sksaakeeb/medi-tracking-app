import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";

const SigninScreen = () => {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.LONG);
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
        await setLocalStorage("userDetail", user);
        route.replace("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={{ flex: 1, padding: 30, backgroundColor: "white" }}>
      <Text style={{ fontSize: 45 }}>Welcome back</Text>
      <Text style={{ fontSize: 30, color: "grey" }}>Let's sign you in</Text>

      <View style={{ marginTop: 70 }}>
        <View>
          <Text>Email*</Text>
          <TextInput
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
            style={{
              borderWidth: 1,
              padding: 20,
              borderRadius: 20,
              marginTop: 5,
            }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Password*</Text>
          <TextInput
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            placeholder="Password"
            style={{
              borderWidth: 1,
              padding: 20,
              borderRadius: 20,
              marginTop: 5,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={onLogin}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => route.push("login/signup")}
        style={{
          marginTop: 15,
          backgroundColor: "black",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Create New Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninScreen;
