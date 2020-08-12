import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { format, add, sub, isSameMonth, isWithinInterval } from "date-fns";
import axios from "axios";

export default function Clinic({ route, navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsID, setDetailsID] = useState("");
  const [email, setEmail] = useState(route.params["email"]);
  const [dailyColor, setDailyColor] = useState("#ebab34");
  const [weeklyColor, setWeeklyColor] = useState("skyblue");
  const [monthlyColor, setMonthlyColor] = useState("skyblue");
  const [tableHead, setTableHead] = useState({
    dateTime: "Date & Time",
    doctor: "Doctor",
    patient: "Patient",
    fee: "Consultation Fee",
  });
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState(new Date());
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const refreshOnPress = () => {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  };
  const dailyOnPress = () => {
    setDailyColor("#ebab34");
    setWeeklyColor("skyblue");
    setMonthlyColor("skyblue");
    setDaily(true);
    setWeekly(false);
    setMonthly(false);
    setDate(new Date());
    setDetailsID("");
  };
  const weeklyOnPress = () => {
    setDailyColor("skyblue");
    setWeeklyColor("#ebab34");
    setMonthlyColor("skyblue");
    setDaily(false);
    setWeekly(true);
    setMonthly(false);
    setDate(new Date());
    setDetailsID("");
  };
  const monthlyOnPress = () => {
    setDailyColor("skyblue");
    setWeeklyColor("skyblue");
    setMonthlyColor("#ebab34");
    setDaily(false);
    setWeekly(false);
    setMonthly(true);
    setDate(new Date());
    setDetailsID("");
  };
  const leftOnpress = () => {
    if (daily) {
      setDate(sub(date, { days: 1 }));
    } else if (weekly) {
      setDate(sub(date, { weeks: 1 }));
    } else {
      setDate(sub(date, { months: 1 }));
    }
    setDetailsID("");
  };
  const rightOnpress = () => {
    if (daily) {
      setDate(add(date, { days: 1 }));
    } else if (weekly) {
      setDate(add(date, { weeks: 1 }));
    } else {
      setDate(add(date, { months: 1 }));
    }
    setDetailsID("");
  };
  useEffect(() => {
    axios
      .post("http://10.0.2.2:3000/getRecord", {
        email: email,
      })
      .then((response) => {
        const tempRecords = response.data.map((obj) => ({
          key: obj["id"],
          date: obj["date_time"],
          doctor: obj["doctor_name"],
          patient: obj["patient_name"],
          diagnosis: obj["diagnosis"],
          medication: obj["medication"],
          fee: obj["fee"],
          follow_up: obj["follow_up"],
        }));
        if (daily) {
          const filteredRecords = tempRecords.filter(
            (tempRecord) =>
              new Date(Date.parse(tempRecord["date"])).toDateString() ===
              date.toDateString()
          );
          setRecords(filteredRecords);
        } else if (weekly) {
          const filteredRecords = tempRecords.filter((tempRecord) =>
            isWithinInterval(new Date(Date.parse(tempRecord["date"])), {
              start: sub(date, { weeks: 1 }),
              end: date,
            })
          );
          setRecords(filteredRecords);
        } else if (monthly) {
          const filteredRecords = tempRecords.filter((tempRecord) =>
            isSameMonth(new Date(Date.parse(tempRecord["date"])), date)
          );
          setRecords(filteredRecords);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [daily, weekly, monthly, refresh, date]);

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen}>
        <View style={{ padding: 10 }}>
          <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModalOpen(false)}
          />
          {records.length > 0 && detailsID !== "" && (
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Date</Text>
              <Text style={styles.details}>
                {new Date(
                  Date.parse(records[detailsID]["date"])
                ).toDateString()}
              </Text>
              <Text style={styles.text}>Time</Text>
              <Text style={styles.details}>
                {new Date(
                  Date.parse(records[detailsID]["date"])
                ).toTimeString()}
              </Text>
              <Text style={styles.text}>Doctor</Text>
              <Text style={styles.details}>{records[detailsID]["doctor"]}</Text>
              <Text style={styles.text}>Patient</Text>
              <Text style={styles.details}>
                {records[detailsID]["patient"]}
              </Text>
              <Text style={styles.text}>Diagnosis</Text>
              <Text style={styles.details}>
                {records[detailsID]["diagnosis"]}
              </Text>
              <Text style={styles.text}>Medication</Text>
              <Text style={styles.details}>
                {records[detailsID]["medication"]}
              </Text>
              <Text style={styles.text}>Consultation fee </Text>
              <Text style={styles.details}>
                {"$" + records[detailsID]["fee"]}
              </Text>
              <Text style={styles.text}>Follow-up Consultation</Text>
              <Text style={styles.details}>
                {records[detailsID]["follow_up"] ? "Yes" : "No"}
              </Text>
            </View>
          )}
        </View>
      </Modal>
      <View style={{ marginBottom: 10 }}>
        <MaterialIcons
          name="refresh"
          size={26}
          color="#3ad6bf"
          onPress={refreshOnPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ width: 100 }}>
          <Button title="Daily" color={dailyColor} onPress={dailyOnPress} />
        </View>
        <View style={{ width: 100 }}>
          <Button title="Weekly" color={weeklyColor} onPress={weeklyOnPress} />
        </View>
        <View style={{ width: 100 }}>
          <Button
            title="Monthly"
            color={monthlyColor}
            onPress={monthlyOnPress}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <AntDesign name="left" size={24} color="black" onPress={leftOnpress} />
        <Text>
          {daily
            ? date.toDateString()
            : weekly
            ? sub(date, { weeks: 1 }).toDateString() +
              " - " +
              date.toDateString()
            : format(date, "MMMM") + " " + format(date, "yyyy")}
        </Text>
        <AntDesign
          name="right"
          size={24}
          color="black"
          onPress={rightOnpress}
        />
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{tableHead.doctor}</DataTable.Title>
          <DataTable.Title>{tableHead.patient}</DataTable.Title>
          <DataTable.Title numeric>{tableHead.fee}</DataTable.Title>
        </DataTable.Header>

        {records.map((record, index) => (
          <DataTable.Row
            key={record.id}
            onPress={() => {
              setModalOpen(true);
              setDetailsID(index);
              console.log(records);
            }}
          >
            <DataTable.Cell>{record.doctor}</DataTable.Cell>
            <DataTable.Cell>{record.patient}</DataTable.Cell>
            <DataTable.Cell numeric>{record.fee}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Create New Record"
          onPress={() => {
            navigation.navigate("CreateRecord", {
              email: email,
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  details: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 18,
    alignItems: "center",
  },
});
