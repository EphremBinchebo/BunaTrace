// src/screens/A_StatsCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function A_StatsCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E9F2E1",
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },
  value: { fontSize: 26, fontWeight: "bold", color: "#3A5F0B" },
  label: { fontSize: 16, marginTop: 4, color: "#4F4F4F" },
});
