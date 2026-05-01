// src/screens/A_FarmPolygonMappingScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function A_FarmPolygonMappingScreen({ navigation, route }: any) {
  const { farm } = route.params;

  const [points, setPoints] = useState<{ lat: number; lon: number }[]>([]);

  const addPoint = () => {
    if (points.length >= 4) {
      Alert.alert("Limit reached", "Polygon complete (4 points).");
      return;
    }

    const newPoint = {
      lat: 8.98 + Math.random() * 0.01,
      lon: 38.77 + Math.random() * 0.01,
    };
    setPoints([...points, newPoint]);
  };

  const completePolygon = () => {
    if (points.length < 3) {
      Alert.alert("Not enough points", "Add at least 3 points.");
      return;
    }

    navigation.navigate("A_FarmSavedSuccessScreen", { farm, polygon: points });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Draw Farm Boundary</Text>

      <Text style={styles.subtitle}>Tap button to add GPS points</Text>

      <TouchableOpacity style={styles.button} onPress={addPoint}>
        <Text style={styles.buttonText}>Add Point</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        {points.map((p, i) => (
          <Text key={i} style={styles.point}>
            • {p.lat.toFixed(5)}, {p.lon.toFixed(5)}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={completePolygon}
      >
        <Text style={styles.buttonText}>Complete Polygon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: "#6B4F27",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  card: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  point: { fontSize: 15, marginBottom: 6 },
  secondary: { alignItems: "center", marginTop: 15 },
  secondaryText: { color: "#6B4F27" },
});
