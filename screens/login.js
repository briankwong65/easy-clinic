import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginVerification = () => {
    axios
      .post("http://10.0.2.2:3000/getClinic", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (email == "" || password == "") {
          alert("Please enter your email and password");
        } else if (response.data.length == 0) {
          alert("Invalid Email/Password.");
        } else if (password != response.data[0]["password"]) {
          alert("Invalid Email/Password.");
        } else {
          alert("Welcome, " + response.data[0]["name"]);
          navigation.navigate("Clinic", { email: email });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Clinic</Text>
      </View>
      <View style={styles.body}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={loginVerification} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#999"
            title="Registration"
            onPress={() => navigation.navigate("Registration")}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
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
    //alignItems: 'center',
  },
  heading: {
    marginTop: 50,
    marginBottom: 50,
    fontWeight: "bold",
    fontSize: 36,
    color: "#6eb9fa",
    borderColor: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6eb9fa",
    padding: 8,
    margin: 10,
    width: 250,
    height: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "black",
  },
});
