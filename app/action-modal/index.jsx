import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MedicationActionModal = () => {
  const medicine = useLocalSearchParams();
  console.log(medicine);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/notification.gif")}
        style={{
          height: 130,
          width: 130,
        }}
      />
      <Text>{medicine?.selectedDate}</Text>
      <Text>{medicine?.reminder}</Text>
      <Text>Its time to take</Text>

      <View style={{ marginTop: 15, flexDirection: "row", gap: 15 }}>
        <TouchableOpacity style={styles.missedBtn}>
          <Ionicons name="close-circle-outline" size={24} color="red" />
          <Text style={{ fontSize: 18, color: "red" }}>Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.takenBtn}>
          <MaterialIcons name="done" size={24} color="green" />
          <Text style={{ fontSize: 18, color: "green" }}>Taken</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicationActionModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  missedBtn: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },

  takenBtn: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
  },
});
