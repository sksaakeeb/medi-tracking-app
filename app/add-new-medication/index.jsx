import { View, Text } from "react-native";
import React from "react";
import Header from "./_components/Header";
import MedicationForm from "./_components/MedicationForm";

const AddNewMedication = () => {
  return (
    <View>
      <Header />
      <MedicationForm />
    </View>
  );
};

export default AddNewMedication;
