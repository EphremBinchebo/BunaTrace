import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

export default function A_StationCreateScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Station name is required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/actors/stations", {
        name,
        region,
        zone,
        woreda,
        kebele,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
      });

      Alert.alert("Success", "Washing station registered successfully");
      navigation.goBack();
    } catch (e: any) {
      console.error("Station create error:", e);
      Alert.alert("Error", "Failed to register station");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
     style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* HEADER */}
      <Text style={styles.title}>Register Washing Station</Text>
      <Text style={styles.subtitle}>
        Add a new coffee washing station
      </Text>

      {/* FORM */}
      <TextInput
        style={styles.input}
        placeholder="Station Name *"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Region"
        value={region}
        onChangeText={setRegion}
      />

      <TextInput
        style={styles.input}
        placeholder="Zone"
        value={zone}
        onChangeText={setZone}
      />

      <TextInput
        style={styles.input}
        placeholder="Woreda"
        value={woreda}
        onChangeText={setWoreda}
      />

      <TextInput
        style={styles.input}
        placeholder="Kebele"
        value={kebele}
        onChangeText={setKebele}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude (optional)"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude (optional)"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
      />

      {/* ACTION BUTTONS */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.primaryText}>Save Station</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: "#1B5E20",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryBtn: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryText: {
    color: "#555",
    fontSize: 15,
    fontWeight: "600",
  },
});
