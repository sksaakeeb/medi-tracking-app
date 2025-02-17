import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constant/Colors";
import { TypeList, WhenToTake } from "../../../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../../../config/FirebaseConfig";
import {
  FormatDate,
  formatDateText,
  formatTime,
  getDatesRange,
} from "../../../service/ConvertToDate";
import { getLocalStorage } from "../../../service/Storage";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useRouter } from "expo-router";

const MedicationForm = () => {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const SaveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");

    if (
      !(
        formData?.name ||
        formData?.type ||
        formData?.dose ||
        formData?.startDate ||
        formData?.endDate ||
        formData?.reminder
      )
    ) {
      Alert.alert("Please enter all fields.");
      return;
    }

    const dates = getDatesRange(formData?.startDate, formData?.endDate);
    console.log(dates);
    setLoading(true);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
        dates: dates,
      });
      console.log("Saved");

      setLoading(false);

      Alert.alert("Success", "Medication saved.", [
        {
          text: "OK",
          onPress: () => route.push("(tabs)"),
        },
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
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
        <Feather
          style={styles.icon}
          name="droplet"
          size={24}
          color={Colors.PRIMARY}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage (e.g. - 2 * 5ml)"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* Picker */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="time-outline" size={24} color="" />
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

      {/* Start and End Date */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Feather
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.dateInput}>
            {formData?.startDate
              ? formatDateText(formData.startDate)
              : "Start Date"}
          </Text>
        </TouchableOpacity>

        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              if (event.nativeEvent.timestamp) {
                onHandleInputChange(
                  "startDate",
                  FormatDate(event.nativeEvent.timestamp)
                );
              }
              setShowStartDate(false);
            }}
            value={
              formData?.startDate ? new Date(formData.startDate) : new Date()
            }
          />
        )}

        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Feather
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.dateInput}>
            {formData?.endDate ? formatDateText(formData.endDate) : "End Date"}
          </Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              if (event.nativeEvent.timestamp) {
                onHandleInputChange(
                  "endDate",
                  FormatDate(event.nativeEvent.timestamp)
                );
              }
              setShowEndDate(false);
            }}
            value={formData?.endDate ? new Date(formData.endDate) : new Date()}
          />
        )}
      </View>

      {/* Set Reminder */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            style={styles.icon}
            name="time-outline"
            size={24}
            color="black"
          />
          <Text style={styles.dateInput}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <RNDateTimePicker
            mode="time"
            onChange={(event) => {
              onHandleInputChange(
                "reminder",
                formatTime(event.nativeEvent.timestamp)
              );
              setShowTimePicker(false);
            }}
            value={
              formData?.reminder ? new Date(formData.reminder) : new Date()
            }
          />
        )}
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={SaveMedication}
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 15,
          marginTop: 30,
          width: "100%",
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            + Add
          </Text>
        )}
      </TouchableOpacity>
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
  dateInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    padding: 10,
  },
});

export default MedicationForm;
