import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  CheckBox,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

export default function CreateRecord({ route, navigation }) {
  const [email, setEmail] = useState(route.params["email"]);
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [fee, setFee] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [followUp, setFollowUp] = useState(false);

  const timeOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const submitData = () => {
    if (
      email == "" ||
      doctor == "" ||
      patient == "" ||
      diagnosis == "" ||
      medication == "" ||
      fee == ""
    ) {
      alert("Please fill in all the fields");
      return;
    }
    axios
      .post("http://10.0.2.2:3000/newRecord", {
        email: email,
        doctor_name: doctor,
        patient_name: patient,
        diagnosis: diagnosis,
        medication: medication,
        fee: fee,
        date_time: date,
        follow_up: followUp,
      })
      .then((response) => {
        alert("Record Created!");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text>Doctor name</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={doctor}
            onChangeText={(text) => {
              setDoctor(text);
            }}
          />
          <Text>Patient name</Text>
          <TextInput
            style={styles.input}
            value={patient}
            onChangeText={(text) => {
              setPatient(text);
            }}
          />
          <Text>Diagnosis</Text>
          <TextInput
            style={styles.input}
            value={diagnosis}
            multiline={true}
            onChangeText={(text) => {
              setDiagnosis(text);
            }}
          />
          <Text>Medication</Text>
          <TextInput
            style={styles.input}
            value={medication}
            multiline={true}
            onChangeText={(text) => {
              setMedication(text);
            }}
          />
          <Text>Consultation Fee</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={fee}
            onChangeText={(text) => {
              setFee(text);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.dateTimebuttonContainer}>
              <Button onPress={showDatepicker} title="Date" color="skyblue" />
            </View>
            <View style={styles.dateContainer}>
              <Text>{date.toDateString()}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.dateTimebuttonContainer}>
              <Button onPress={showTimepicker} title="Time" color="skyblue" />
            </View>
            <View style={styles.dateContainer}>
              <Text>{date.toTimeString()}</Text>
            </View>
          </View>
          {show && (
            <DateTimePicker
              style={styles.input}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={timeOnChange}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <View style={styles.dateContainer}>
              <Text>Has Follow-up Consultation</Text>
            </View>
            <View style={styles.dateTimebuttonContainer}>
              <CheckBox
                style={styles.input}
                value={followUp}
                onValueChange={setFollowUp}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={submitData} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 3,
    color: "white",
    marginTop: 15,
  },
  heading: {
    marginTop: 50,
    marginBottom: 50,
    fontWeight: "bold",
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6eb9fa",
    padding: 8,
    width: 250,
    height: 35,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
  dateTimebuttonContainer: {
    marginTop: 10,
    width: 100,
  },
  dateContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
});
