// // app/screens/E_FarmerFormScreen.tsx
// import React, { useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function FarmerFormScreen({ navigation }: any) {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [region, setRegion] = useState("");
//   const [zone, setZone] = useState("");
//   const [woreda, setWoreda] = useState("");

//   const handleSubmit = async () => {
//     if (!name || !phone) {
//       Alert.alert("Missing fields", "Name and phone are required.");
//       return;
//     }

//     // TODO: Replace with backend POST /farmers
//     Alert.alert("Success", "Farmer registered successfully!");
//     navigation.goBack();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Register Farmer</Text>

//       <Text style={styles.label}>Full Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="e.g., Abebe Kebede"
//         value={name}
//         onChangeText={setName}
//       />

//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="+251..."
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <Text style={styles.section}>Address Information</Text>

//       <Text style={styles.label}>Region</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Oromia"
//         value={region}
//         onChangeText={setRegion}
//       />

//       <Text style={styles.label}>Zone</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Guji"
//         value={zone}
//         onChangeText={setZone}
//       />

//       <Text style={styles.label}>Woreda</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Hambela"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Save Farmer</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.cancelButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.cancelText}>Cancel</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#4A2F0B",
//     marginBottom: 20,
//   },

//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 6,
//     marginTop: 10,
//   },

//   input: {
//     backgroundColor: "#F2F2F2",
//     padding: 14,
//     borderRadius: 12,
//     fontSize: 16,
//     marginBottom: 5,
//   },

//   section: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#4A2F0B",
//     marginTop: 20,
//   },

//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   cancelButton: { marginTop: 15, alignItems: "center" },

//   cancelText: {
//     color: "#6B4F27",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
