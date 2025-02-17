import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

const MedicationCardItem = ({ medicine }) => {
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
        <View>
          <Text style={{fontSize: 22, fontWeight: "bold"}}>{medicine?.name}</Text>
          <Text>{medicine?.when}</Text>
          <Text>{medicine?.dose} {medicine?.type.name}</Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
      <Ionicons name="timer-outline" size={24} color="black" />
        <Text>{medicine?.reminder}</Text>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  container : {
    padding: 10,
    backgroundColor: "yellow",
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 15,
    marginRight: 10
  },
  subContainer :{
    flexDirection: 'row',
    alignItems: "center"
  },
  reminderContainer: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15
  }
});
