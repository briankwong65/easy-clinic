import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function Registration({ navigation }) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitData = () => {
    axios
      .post("http://10.0.2.2:3000/getClinic", {
        email: email,
      })
      .then((response) => {
        console.log(response.data.length);
        console.log(response.data.length > 0);
        if (
          email == "" ||
          confirmEmail == "" ||
          password == "" ||
          confirmPassword == "" ||
          name == "" ||
          phone == "" ||
          address == ""
        ) {
          alert("Please fill in all the fields");
          return;
        } else if (!email.includes("@")) {
          alert("Invalid Email!");
          return;
        } else if (response.data.length > 0) {
          alert("Email already existed. Please use another email.");
          return;
        } else if (confirmEmail != email) {
          alert("Email and Confirm Email not match!");
          return;
        } else if (confirmPassword != password) {
          alert("Password and Confirm Password not match!");
          return;
        } else if (password.length < 6) {
          alert("Password must include at least 6 chracters.");
          return;
        } else if (phone.length != 8) {
          alert("Phone Number invalid!");
          return;
        }
        axios
          .post("http://10.0.2.2:3000/newClinic", {
            email: email,
            password: password,
            name: name,
            phone: phone,
            address: address,
          })
          .then((response) => {
            console.log(response.data);
            alert("Account Created!");
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
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
          <Text>Confirm Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={confirmEmail}
            onChangeText={(text) => {
              setConfirmEmail(text);
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
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <Text>Clinic Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={8}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
          <Text>Address</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
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
    //margin: 10,
    width: 250,
    height: 35,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "black",
  },
});
