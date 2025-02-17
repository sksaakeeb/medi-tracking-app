import { View, Text, ScrollView } from "react-native";
import React from "react";
import MedicationForm from "../add-new-medication/_components/MedicationForm";
import Header from "../add-new-medication/_components/Header";

const AddNew = () => {
  return (
    <ScrollView>
      <Header />
      <MedicationForm />
    </ScrollView>
  );
};

export default AddNew;
