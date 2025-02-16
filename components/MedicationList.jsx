import { View, Text, Image } from "react-native";
import React from "react";

const MedicationList = () => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Image source={require('../assets/images/medication.jpeg')} style={{width: "100%", height: 200, borderRadius: 15}}/>
    </View>
  );
};

export default MedicationList;
