import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constant/Colors";
import { TypeList, WhenToTake } from "../../../constant/Options";
import { Picker } from "@react-native-picker/picker";

const MedicationForm = () => {
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medication Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      {/* Type List */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={TypeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Does Input */}
      <View style={styles.inputGroup}>
        <Feather name="droplet" size={24} color={Colors.PRIMARY} />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage (e.g. - 2 * 5ml)"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* Picker */}
      <View style={styles.inputGroup}>
        <Ionicons name="time-outline" size={24} color="black" />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake?.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputGroup: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 15,
  },
  typeText: {
    fontSize: 16,
  },
});

export default MedicationForm;
