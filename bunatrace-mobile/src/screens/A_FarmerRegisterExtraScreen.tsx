// src/screens/A_FarmerRegisterExtraScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function A_FarmerRegisterExtraScreen({ navigation, route }: any) {
  const { baseData } = route.params; // from Screen 1

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!age || !gender || !address) {
      Alert.alert("Missing Fields", "Please complete all fields.");
      return;
    }

    const fullData = { ...baseData, age, gender, address };
    console.log("Farmer Full Data:", fullData);

    Alert.alert("Success", "Farmer registered successfully!");
    // navigation.navigate("FarmerList");
    navigation.navigate("A_FarmerSavedSuccessScreen");
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Details</Text>

      <TextInput
        placeholder="Age"
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Gender"
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Finish Registration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6B4F27",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
