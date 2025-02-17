import { View, Text, Button, FlatList } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import Header from "../../components/Header";
import { RemoveLocalStorage } from "../../service/Storage";
import NullStateHome from "../../components/NullStateHome";
import MedicationList from "../../components/MedicationList";

const Home = () => {
  return (
    <FlatList
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
      data={[]}
      ListHeaderComponent={
        <View style={{ padding: 20, backgroundColor: "white", height: "100%" }}>
          <Header />
          {/* <NullStateHome /> */}
          <MedicationList />
        </View>
      }
    />
  );
};

export default Home;
