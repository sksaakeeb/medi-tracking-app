import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetDatesRangeToDisplay } from "../service/ConvertToDate";
import moment from "moment";
import Colors from "../constant/Colors";
import { getLocalStorage } from "../service/Storage";
import { query, collection, where, getDocs, doc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import MedicationCardItem from "./MedicationCardItem";
import NullStateHome from "../components/NullStateHome";
import { useRouter } from "expo-router";

const MedicationList = () => {
  const route = useRouter();

  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);

  const GetDateRangeList = () => {
    const dateRange = GetDatesRangeToDisplay();
    setDateRange(dateRange);
  };

  const GetMedicationList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");
    setMedList([]);

    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Image
        source={require("../assets/images/medication.jpeg")}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      />

      <FlatList
        style={{ marginTop: 15 }}
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate);
            }}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate == selectedDate ? Colors.PRIMARY : "gray",
              },
            ]}
          >
            <Text
              style={[
                styles.day,
                {
                  color: item.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        onRefresh={() => GetMedicationList(selectedDate)}
        refreshing={loading}
        data={medList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              route.push({
                pathname: "/action-modal",
                params: {
                  ...item,
                  selectedDate: selectedDate,
                },
              })
            }
          >
            <MedicationCardItem medicine={item} selectedDate={selectedDate} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  dateGroup: {
    padding: 10,
    backgroundColor: "gray",
    marginRight: 10,
    borderRadius: 15,
    alignItems: "center",
    display: "flex",
  },
  day: {
    fontSize: 18,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
