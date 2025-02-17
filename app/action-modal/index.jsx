import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import moment from "moment";

const MedicationActionModal = () => {
  const route = useRouter();

  const medicine = useLocalSearchParams();

  const UpdateActionStatus = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });

      Alert.alert(status, "Your status has been saved.", [
        {                         
          text: "OK",
          onPress: () => route.replace("(tabs)"),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/notification.gif")}
        style={{
          height: 130,
          width: 130,
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {medicine?.selectedDate}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
        {medicine?.reminder}
      </Text>

      <View style={{ marginTop: 15, flexDirection: "row", gap: 15 }}>
        <TouchableOpacity
          style={styles.missedBtn}
          onPress={() => UpdateActionStatus("Missed")}
        >
          <Ionicons name="close-circle-outline" size={24} color="red" />
          <Text style={{ fontSize: 18, color: "red" }}>Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.takenBtn}
          onPress={() => UpdateActionStatus("Taken")}
        >
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
