import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Colors from "../constant/Colors";

const MedicationCardItem = ({ medicine, selectedDate = "" }) => {
  const [status, setStatus] = useState();

  useEffect(() => {
    CheckStatus();
  }, [medicine]);

  const CheckStatus = () => {
    const data = medicine?.action?.find((item) => item.date == selectedDate);
    console.log(data);
    setStatus(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              height: 60,
              width: 60,
            }}
          />
        </View>

        <View style={{ width: "55%" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {medicine?.name}
          </Text>
          <Text>{medicine?.when}</Text>
          <Text>
            {medicine?.dose} {medicine?.type.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text>{medicine?.reminder}</Text>
      </View>

      {status?.date && (
        <View style={styles.status}>
          {status?.status == "Taken" ? (
            <AntDesign name="checkcircle" size={28} color="green" />
          ) : (
            status?.status == "Missed" && (
              <Octicons name="x-circle-fill" size={28} color="red" />
            )
          )}
        </View>
      )}
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.BLUE,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 10,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderContainer: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
  },
  status: {
    position: "absolute",
    padding: 5,
  },
});
