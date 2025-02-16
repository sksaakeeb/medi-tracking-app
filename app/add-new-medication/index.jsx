import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./_components/Header";
import MedicationForm from "./_components/MedicationForm";

const AddNewMedication = () => {
  return (
    <ScrollView>
      <Header />
      <MedicationForm />
    </ScrollView>
  );
};

export default AddNewMedication;
