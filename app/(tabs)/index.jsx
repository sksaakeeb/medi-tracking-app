import { View, Text, Button } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import Header from "../../components/Header";
import { RemoveLocalStorage } from "../../service/Storage"
import NullStateHome from "../../components/NullStateHome";

const Home = () => {
  return (
    <View style={{ padding: 20, backgroundColor: "white", height: "100%" }}>
      <Header />
      <NullStateHome />
    </View>
  );
};

export default Home;
