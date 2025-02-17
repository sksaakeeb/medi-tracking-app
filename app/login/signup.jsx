import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";
import Colors from "../../constant/Colors";

const SignupScreen = () => {
  const route = useRouter();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onCreateAccount = () => {
    setLoading(true);
    // if (!email || !password || !name) {
    //   ToastAndroid.show("Please enter all details.", ToastAndroid.LONG);
    // }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setLoading(false);
        // Signed up
        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, {
          displayName: name,
        });

        await setLocalStorage("userDetail", user);
        ToastAndroid.show("Account created successfully.", ToastAndroid.SHORT);
        route.replace("(tabs)");
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already exists.", ToastAndroid.SHORT);
        } else if (errorCode === "auth/weak-password") {
          ToastAndroid.show(
            "Password should be at least 6 characters.",
            ToastAndroid.LONG
          );
        } else if (errorCode === "auth/admin-restricted-operation") {
          ToastAndroid.show("Please enter a valid input.", ToastAndroid.LONG);
        } else if (errorCode === "auth/invalid-email") {
          ToastAndroid.show("Please enter a valid email.", ToastAndroid.LONG);
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
              backgroundColor: Colors.LIGHT_GRAY,
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
            placeholder="Password"
            secureTextEntry={true}
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
        onPress={onCreateAccount}
        style={{
          marginTop: 30,
          backgroundColor: Colors.PRIMARY,
          padding: 20,
          borderRadius: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>
            Create Account
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => route.push("login/signin")}
        style={{
          marginTop: 15,
          backgroundColor: Colors.PRIMARY,
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
