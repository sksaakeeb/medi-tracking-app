import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";

const SignupScreen = () => {
  const route = useRouter();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onCreateAccount = () => {
    if (!email || !password || !name) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.LONG);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, {
          displayName: name,
        });

        await setLocalStorage("userDetail", user);
        // ToastAndroid.show("Account created successfully", ToastAndroid.SHORT);
        route.replace("(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already in use", ToastAndroid.SHORT);
        }
        // ..
      });
  };

  return (
    <View style={{ flex: 1, padding: 30, backgroundColor: "white" }}>
      <Text style={{ fontSize: 45 }}>Hey, Let's create account</Text>

      <View style={{ marginTop: 70 }}>
        <View>
          <Text>Name*</Text>
          <TextInput
            onChangeText={(value) => setName(value)}
            placeholder="Name"
            style={{
              borderWidth: 1,
              padding: 20,
              borderRadius: 20,
              marginTop: 5,
            }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
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
            placeholder="Password"
            secureTextEntry={true}
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
        onPress={onCreateAccount}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => route.push("login/signin")}
        style={{
          marginTop: 15,
          backgroundColor: "black",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
