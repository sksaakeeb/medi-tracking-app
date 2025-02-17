import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constant/Colors";
import { query, collection, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { GetPrevDateRangeToDisplay } from "../../service/ConvertToDate";
import moment from "moment";
import { getLocalStorage } from "../../service/Storage";
import MedicationCardItem from "../../components/MedicationCardItem";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [dateRange, setDateRange] = useState();
  const [loading, setLoading] = useState(false);
  const [medList, setMedList] = useState();

  useEffect(() => {
    GetDateList();
    GetMedicationList(selectedDate);
  }, []);

  const GetDateList = () => {
    const dates = GetPrevDateRangeToDisplay();
    setDateRange(dates);
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
    <FlatList
      style={{ backgroundColor: "white", height: "100%" }}
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/med-history.png")}
            style={{
              height: 200,
              width: "100%",
              borderRadius: 15,
              marginTop: 25,
            }}
          />

          <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 15 }}>
            Medication History
          </Text>

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
                      item.formattedDate == selectedDate
                        ? Colors.PRIMARY
                        : "gray",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.day,
                    {
                      color:
                        item.formattedDate == selectedDate ? "white" : "black",
                    },
                  ]}
                >
                  {item.day}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </TouchableOpacity>
            )}
          />

          {medList?.length > 0 ? (
            <FlatList
              onRefresh={() => GetMedicationList(selectedDate)}
              refreshing={loading}
              data={medList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                // onPress={() =>
                //   route.push({
                //     pathname: "/action-modal",
                //     params: {
                //       ...item,
                //       selectedDate: selectedDate,
                //     },
                //   })
                // }
                >
                  <MedicationCardItem
                    medicine={item}
                    selectedDate={selectedDate}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={{
                padding: 35,
                textAlign: "center",
                fontSize: 18,
                color: "gray",
              }}
            >
              No Medication History Found.
            </Text>
          )}
        </View>
      }
    />
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    marginRight: 7,
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
