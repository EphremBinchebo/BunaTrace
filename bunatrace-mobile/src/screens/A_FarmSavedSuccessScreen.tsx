// src/screens/A_FarmSavedSuccessScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function A_FarmSavedSuccessScreen({ navigation, route }: any) {
  const { farm } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Farm Saved!</Text>
      <Text style={styles.subtitle}>{farm.name} mapping completed successfully.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("A_FarmerListScreen")}
      >
        <Text style={styles.buttonText}>Back to Farm List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.secondaryText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  icon: { fontSize: 60, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 10, marginBottom: 25, textAlign: "center", paddingHorizontal: 30 },
  button: {
    backgroundColor: "#6B4F27",
    padding: 14,
    borderRadius: 12,
    width: "70%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondary: { marginTop: 20 },
  secondaryText: { color: "#6B4F27", fontSize: 15 },
});
