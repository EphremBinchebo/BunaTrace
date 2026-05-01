// src/screens/A_DeliveryEntryScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function A_DeliveryEntryScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {
    farmerId,
    farmerName,
    farmId,
    farmName,
    stationId,
    stationName,
  } = route.params || {};

  const [cherryKg, setCherryKg] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [notes, setNotes] = useState("");

  const handleNext = () => {
    if (!cherryKg || !receiptNumber) {
      Alert.alert("Missing data", "Cherry KG and Receipt Number required.");
      return;
    }

    navigation.navigate("A_DeliveryUploadPhotoScreen", {
      farmerId,
      farmerName,
      farmId,
      farmName,
      stationId,
      stationName,
      cherryKg: parseFloat(cherryKg),
      receiptNumber,
      notes,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delivery Details</Text>
      {farmerName && stationName && (
        <Text style={styles.subtitle}>
          {farmerName} → {stationName}
        </Text>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>Cherry Weight (KG)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cherryKg}
          onChangeText={setCherryKg}
          placeholder="e.g. 120"
        />

        <Text style={styles.label}>Receipt Number</Text>
        <TextInput
          style={styles.input}
          value={receiptNumber}
          onChangeText={setReceiptNumber}
          placeholder="e.g. DEL-ABE-001"
        />

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Moisture, cherry quality, defects..."
          multiline
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryText}>Next: Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
    marginBottom: 20,
  },
  form: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryText: { color: "#1B5E20", fontWeight: "600" },
  primaryButton: {
    flex: 1,
    backgroundColor: "#1B5E20",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
});

// // src/screens/A_DeliveryEntryScreen.tsx
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function A_DeliveryEntryScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const {
//     farmerId,
//     farmerName,
//     farmId,
//     farmName,
//     stationId,
//     stationName,
//   } = route.params || {};

//   const [cherryKg, setCherryKg] = useState("");
//   const [receiptNumber, setReceiptNumber] = useState("");
//   const [notes, setNotes] = useState("");

//   const handleNext = () => {
//     if (!cherryKg || !receiptNumber) {
//       Alert.alert("Missing data", "Cherry KG and Receipt Number required.");
//       return;
//     }

//     navigation.navigate("A_DeliveryUploadPhotoScreen", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId,
//       stationName,
//       cherryKg: parseFloat(cherryKg),
//       receiptNumber,
//       notes,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Delivery Details</Text>
//       {farmerName && stationName && (
//         <Text style={styles.subtitle}>
//           {farmerName} → {stationName}
//         </Text>
//       )}

//       <View style={styles.form}>
//         <Text style={styles.label}>Cherry Weight (KG)</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           value={cherryKg}
//           onChangeText={setCherryKg}
//           placeholder="e.g. 120"
//         />

//         <Text style={styles.label}>Receipt Number</Text>
//         <TextInput
//           style={styles.input}
//           value={receiptNumber}
//           onChangeText={setReceiptNumber}
//           placeholder="e.g. DEL-ABE-001"
//         />

//         <Text style={styles.label}>Notes (optional)</Text>
//         <TextInput
//           style={[styles.input, { height: 80 }]}
//           value={notes}
//           onChangeText={setNotes}
//           placeholder="Moisture, cherry quality, defects..."
//           multiline
//         />
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.secondaryText}>Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
//           <Text style={styles.primaryText}>Next: Upload Photo</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
//   title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
//   subtitle: {
//     fontSize: 14,
//     color: "#444",
//     marginTop: 4,
//     marginBottom: 20,
//   },
//   form: { flex: 1 },
//   label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },
//   input: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     marginBottom: 14,
//     fontSize: 14,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   secondaryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   secondaryText: { color: "#1B5E20", fontWeight: "600" },
//   primaryButton: {
//     flex: 1,
//     backgroundColor: "#1B5E20",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   primaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
// });
