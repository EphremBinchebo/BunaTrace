// src/screens/A_FarmGPSCaptureScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

type Props = { navigation: any; route: any };

export default function A_FarmGPSCaptureScreen({ navigation, route }: Props) {
  const { farm } = route.params;
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const handleGPS = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permission required", "Enable location access.");
    }

    const loc = await Location.getCurrentPositionAsync({});
    const captured = {
      lat: loc.coords.latitude,
      lon: loc.coords.longitude,
    };

    setCoords(captured);
    Alert.alert("GPS Captured", `Lat: ${captured.lat}, Lon: ${captured.lon}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture GPS Location</Text>

      <TouchableOpacity style={styles.button} onPress={handleGPS}>
        <Text style={styles.buttonText}>Capture GPS</Text>
      </TouchableOpacity>

      {coords && (
        <View style={styles.card}>
          <Text style={styles.label}>Latitude: {coords.lat}</Text>
          <Text style={styles.label}>Longitude: {coords.lon}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate("A_FarmPolygonMappingScreen", { farm, coords })}
      >
        <Text style={styles.buttonText}>Continue to Mapping</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  button: {
    backgroundColor: "#6B4F27",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  card: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 5 },
  secondary: { alignItems: "center", marginTop: 15 },
  secondaryText: { color: "#6B4F27" },
});
