import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";
import Colors from "../../constant/Colors";

const SigninScreen = () => {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    setLoading(true);
    // if (!email || !password) {
    //   ToastAndroid.show("Please enter email and password.", ToastAndroid.LONG);
    // }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setLoading(false);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
        await setLocalStorage("userDetail", user);
        route.replace("/(tabs)");
        ToastAndroid.show("Logged in successful.", ToastAndroid.LONG);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (
          errorCode == "auth/invalid-email" ||
          errorCode == "auth/invalid-credential"
        ) {
          ToastAndroid.show("Invalid email or password.", ToastAndroid.LONG);
        }
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
              backgroundColor: Colors.LIGHT_GRAY,
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
              backgroundColor: Colors.LIGHT_GRAY,
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
          marginTop: 35,
          backgroundColor: Colors.PRIMARY,
          padding: 20,
          borderRadius: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => route.push("login/signup")}
        style={{
          marginTop: 15,
          backgroundColor: Colors.PRIMARY,
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
