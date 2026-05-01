import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { fetchStations, Station } from "../services/station/station.service";
import { fetchDeliveriesByStation, Delivery } from "../services/deliveries/deliveries.service";
import { createBatch } from "../services/batches/batches.service";
import { useNavigation } from "@react-navigation/native";

export default function A_BatchCreateScreen() {
  const navigation = useNavigation<any>();

  const [stations, setStations] = useState<Station[]>([]);
  const [stationId, setStationId] = useState<string>("");

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const [batchCode, setBatchCode] = useState("");
  const [processType, setProcessType] = useState("WASHED");
  const [loadingStations, setLoadingStations] = useState(true);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingStations(true);
        const s = await fetchStations();
        setStations(s);
      } catch (e) {
        console.error(e);
        Alert.alert("Error", "Failed to load stations");
      } finally {
        setLoadingStations(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!stationId) return;
    (async () => {
      try {
        setLoadingDeliveries(true);
        setSelected({});
        const d = await fetchDeliveriesByStation(stationId);
        setDeliveries(d);
      } catch (e) {
        console.error(e);
        Alert.alert("Error", "Failed to load deliveries for station");
      } finally {
        setLoadingDeliveries(false);
      }
    })();
  }, [stationId]);

  const selectedIds = useMemo(
    () => Object.keys(selected).filter((id) => selected[id]),
    [selected]
  );

  const toggle = (id: string) =>
    setSelected((p) => ({ ...p, [id]: !p[id] }));

  const handleCreate = async () => {
    if (!stationId) return Alert.alert("Missing", "Select a station");
    if (!batchCode.trim()) return Alert.alert("Missing", "Enter batchCode");
    if (selectedIds.length === 0) return Alert.alert("Missing", "Select at least 1 delivery");

    try {
      setSaving(true);

      const payload = {
        stationId,
        batchCode: batchCode.trim(),
        processType,
        deliveryIds: selectedIds,
        // optional fields can be added later:
        fermentationStart: null,
        fermentationEnd: null,
        dryingStart: null,
        dryingEnd: null,
        totalCherryKg: null,
        parchmentKg: null,
      };

      const created = await createBatch(payload);
      Alert.alert("Success", `Batch created: ${created.batchCode}`);
      navigation.navigate("A_BatchDetailScreen", { batchId: created.id });

    }catch (e: any) {
  if (e.response?.status === 409) {
    Alert.alert(
      "Delivery already used",
      "One or more deliveries are already assigned to another batch."
    );
  } else {
    Alert.alert("Error", "Failed to create batch");
  }
}

    // } catch (e: any) {
    //   const msg =
    //     e?.response?.data?.message ||
    //     e?.response?.data ||
    //     "Failed to create batch";
    //   Alert.alert("Create Batch Error", String(msg));
    // } finally {
    //   setSaving(false);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Batch</Text>

      {loadingStations ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.label}>Station</Text>
          <FlatList
            data={stations}
            horizontal
            keyExtractor={(s) => s.id}
            renderItem={({ item }) => {
              const active = item.id === stationId;
              return (
                <TouchableOpacity
                  style={[styles.pill, active && styles.pillActive]}
                  onPress={() => setStationId(item.id)}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <Text style={styles.label}>Batch Code</Text>
          <TextInput
            style={styles.input}
            value={batchCode}
            onChangeText={setBatchCode}
            placeholder="e.g. WS-GUJI-2025-010"
          />

          <Text style={styles.label}>Process Type</Text>
          <TextInput
            style={styles.input}
            value={processType}
            onChangeText={setProcessType}
            placeholder="WASHED / NATURAL"
          />

          <Text style={styles.label}>Select Deliveries</Text>
          {loadingDeliveries ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={deliveries}
              keyExtractor={(d) => d.id}
              renderItem={({ item }) => {
                const active = !!selected[item.id];
                return (
                  <TouchableOpacity
                    style={[styles.card, active && styles.cardActive]}
                    onPress={() => toggle(item.id)}
                  >
                    <Text style={styles.cardTitle}>
                      {item.receiptNumber} — {item.cherryKg}kg
                    </Text>
                    <Text style={styles.cardSub}>
                      {item.farmerName ? `Farmer: ${item.farmerName} • ` : ""}
                      {item.farmName ? `Farm: ${item.farmName}` : ""}
                    </Text>
                    <Text style={styles.cardMeta}>{item.deliveryTime}</Text>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={{ paddingTop: 10 }}>
                  <Text>No deliveries found for this station.</Text>
                </View>
              }
            />
          )}

          <TouchableOpacity
            style={[styles.primaryBtn, saving && { opacity: 0.7 }]}
            onPress={handleCreate}
            disabled={saving}
          >
            <Text style={styles.primaryText}>
              {saving ? "Creating..." : `Create Batch (${selectedIds.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  label: { marginTop: 12, fontSize: 14, fontWeight: "700" },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 6,
  },
  pill: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999, backgroundColor: "#F5F5F5", marginRight: 8, marginTop: 8 },
  pillActive: { backgroundColor: "#1B5E20" },
  pillText: { fontWeight: "600", color: "#333" },
  pillTextActive: { color: "#fff" },

  card: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 12, marginTop: 10 },
  cardActive: { borderWidth: 2, borderColor: "#1B5E20" },
  cardTitle: { fontWeight: "700" },
  cardSub: { marginTop: 4, color: "#555" },
  cardMeta: { marginTop: 4, color: "#888", fontSize: 12 },

  primaryBtn: { marginTop: 14, backgroundColor: "#1B5E20", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "800" },
  backBtn: { marginTop: 12, alignItems: "center" },
  backText: { color: "#1B5E20", fontWeight: "700" },
});



// src/screens/A_BatchCreateScreen.tsx
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { createBatch } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_BatchCreateScreen() {
//   const navigation = useNavigation<any>();

//   const [stationId, setStationId] = useState("");
//   const [processType, setProcessType] = useState("");
//   const [cherryKg, setCherryKg] = useState("");

//   const save = async () => {
//     if (!stationId || !processType || !cherryKg) {
//       Alert.alert("Missing data", "All fields are required.");
//       return;
//     }

//     try {
//       await createBatch({
//         stationId,
//         processType,
//         totalCherryKg: Number(cherryKg),
//       });

//       Alert.alert("Success", "Batch created successfully.");
//       navigation.goBack();
//     } catch (e) {
//       console.error("Failed to create batch:", e);
//       Alert.alert("Error", "Failed to create batch.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Create Processing Batch</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Station ID"
//         value={stationId}
//         onChangeText={setStationId}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Process Type (WASHED / NATURAL)"
//         value={processType}
//         onChangeText={setProcessType}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Total Cherry KG"
//         keyboardType="numeric"
//         value={cherryKg}
//         onChangeText={setCherryKg}
//       />

//       <TouchableOpacity style={styles.btn} onPress={save}>
//         <Text style={styles.btnText}>Create Batch</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
//   input: {
//     backgroundColor: "#F3F3F3",
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   btn: {
//     backgroundColor: "#1B5E20",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   btnText: { color: "#FFF", fontWeight: "700" },
// });
