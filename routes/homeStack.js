import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Registration from "../screens/registration";
import Clinic from "../screens/clinic";
import CreateRecord from "../screens/createRecord";
import React from "react";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitle: (props) => <></> }}
        />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen
          name="Clinic"
          component={Clinic}
          options={{
            title: "Consultation Records",
          }}
        />
        <Stack.Screen
          name="CreateRecord"
          component={CreateRecord}
          options={{
            title: "Create New Record",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
