// // // src/screens/A_BatchDetailScreen.tsx
// src/screens/A_BatchDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchBatch } from "../services/batches/batches.service";

export default function A_BatchDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const batchId = route?.params?.batchId;

  const [batch, setBatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!batchId) {
      console.warn("BatchDetail opened without batchId");
      navigation.goBack();
      return;
    }

    load();
  }, [batchId]);

  const load = async () => {
    try {
      const data = await fetchBatch(batchId);
      setBatch(data);
    } catch (e) {
      console.error("Failed to load batch:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  if (!batch) return <Text>Batch not found</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{batch.batchCode}</Text>

      <Text style={styles.item}>Station: {batch.stationName}</Text>
      <Text style={styles.item}>Process: {batch.processType}</Text>
      <Text style={styles.item}>Cherry KG: {batch.totalCherryKg}</Text>
      <Text style={styles.item}>Parchment KG: {batch.parchmentKg}</Text>
      <Text style={styles.item}>Status: {batch.status}</Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700" },
  item: { marginTop: 8, fontSize: 16 },
});

// import React, { useEffect, useState } from "react";
// import QRCode from "react-native-qrcode-svg";
// import {
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { fetchBatch } from "../services/batches/batches.service";
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function A_BatchDetailScreen() {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();
//   const { batchId } = route.params;

//   const [batch, setBatch] = useState<any>(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const data = await fetchBatch(batchId);
//     setBatch(data);
//   };

//   if (!batch) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{batch.batchCode}</Text>

//       <View style={styles.card}>
//         <Text style={styles.item}>📍 Station: {batch.stationName}</Text>
//         <Text style={styles.item}>🧪 Process: {batch.processType}</Text>
//         <Text style={styles.item}>🌱 Cherry KG: {batch.totalCherryKg}</Text>
//         <Text style={styles.item}>📦 Parchment KG: {batch.parchmentKg}</Text>
//         <Text style={styles.item}>🧾 Status: {batch.status}</Text>
//       </View>

//      <View style={{ alignItems: "center", marginTop: 20 }}>
//        <QRCode
//         value={batch.qrCode}
//         size={180}
//         color="black"
//         />
//       <Text style={{ marginTop: 10 }}>Scan to view batch</Text>
//     </View>

//       {/* BUTTONS */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backText}>← Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.dashboardBtn}
//           onPress={() => navigation.navigate("A_DashboardScreen")}
//         >
//           <Text style={styles.dashboardText}>🏡 Dashboard</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#265C2F",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  backBtn: {
    backgroundColor: "#888",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backText: {
    color: "#FFF",
    fontSize: 16,
  },
  dashboardBtn: {
    backgroundColor: "#2F6E32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dashboardText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
// // src/screens/A_BatchDetailScreen.tsx
// // src/screens/A_BatchDetailScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { fetchBatch } from "../services/batches/batches.service";
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function A_BatchDetailScreen() {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();
//   const { batchId } = route.params;

//   const [batch, setBatch] = useState<any>(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const data = await fetchBatch(batchId);
//     setBatch(data);
//   };

//   if (!batch) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{batch.batchCode}</Text>

//       <View style={styles.card}>
//         <Text style={styles.item}>📍 Station: {batch.stationName}</Text>
//         <Text style={styles.item}>🧪 Process: {batch.processType}</Text>
//         <Text style={styles.item}>🌱 Cherry KG: {batch.totalCherryKg}</Text>
//         <Text style={styles.item}>📦 Parchment KG: {batch.parchmentKg}</Text>
//         <Text style={styles.item}>🧾 Status: {batch.status}</Text>
//       </View>

//       {/* BUTTONS */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backText}>← Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.dashboardBtn}
//           onPress={() => navigation.navigate("A_DashboardScreen")}
//         >
//           <Text style={styles.dashboardText}>🏡 Dashboard</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// // STYLES
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#FFF",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#265C2F",
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#F5F5F5",
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 30,
//   },
//   backBtn: {
//     backgroundColor: "#888",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   backText: {
//     color: "#FFF",
//     fontSize: 16,
//   },
//   dashboardBtn: {
//     backgroundColor: "#2F6E32",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   dashboardText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// import React, { useEffect, useState } from "react";
// import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fetchBatch } from "../services/batches/batches.service";
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function A_BatchDetailScreen() {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();
//   const { batchId } = route.params;

//   const [batch, setBatch] = useState<any>(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const data = await fetchBatch(batchId);
//       setBatch(data);
//     } catch (e) {
//       console.error("Failed to load batch:", e);
//     }
//   };

//   if (!batch) return <Text style={{ padding: 20 }}>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{batch.batchCode}</Text>

//       <View style={styles.section}>
//         <Text style={styles.item}>📍 Station: {batch.stationName}</Text>
//         <Text style={styles.item}>🧪 Process: {batch.processType}</Text>
//         <Text style={styles.item}>🍒 Cherry KG: {batch.totalCherryKg}</Text>
//         <Text style={styles.item}>📦 Parchment KG: {batch.parchmentKg}</Text>
//         <Text style={styles.item}>🔄 Status: {batch.status}</Text>
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.buttonText}>← Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.dashboardButton}
//           onPress={() => navigation.navigate("A_DashboardScreen")}
//         >
//           <Text style={styles.buttonText}>🏠 Dashboard</Text>
//         </TouchableOpacity>
//       </View>
      
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 20, 
//     backgroundColor: "#FFFFFF" 
//   },

//   title: { 
//     fontSize: 24, 
//     fontWeight: "700", 
//     color: "#1B5E20",
//     marginBottom: 20,
//   },

//   section: {
//     backgroundColor: "#F2F2F2",
//     padding: 15,
//     borderRadius: 12,
//   },

//   item: { 
//     marginTop: 10, 
//     fontSize: 16,
//     color: "#333"
//   },

//   buttonsContainer: {
//     marginTop: 30,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   backButton: {
//     backgroundColor: "#888",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },

//   dashboardButton: {
//     backgroundColor: "#1B5E20",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },

//   buttonText: {
//     color: "#FFF",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, StyleSheet } from "react-native";
// import { fetchBatch } from "../services/batches/batches.service";
// import { useRoute } from "@react-navigation/native";

// export default function A_BatchDetailScreen() {
//   const route = useRoute<any>();
//   const { batchId } = route.params;

//   const [batch, setBatch] = useState<any>(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const data = await fetchBatch(batchId);
//     setBatch(data);
//   };

//   if (!batch) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{batch.batchCode}</Text>

//       <Text style={styles.item}>Station: {batch.stationName}</Text>
//       <Text style={styles.item}>Process: {batch.processType}</Text>
//       <Text style={styles.item}>Cherry KG: {batch.totalCherryKg}</Text>
//       <Text style={styles.item}>Parchment KG: {batch.parchmentKg}</Text>
//       <Text style={styles.item}>Status: {batch.status}</Text>
//     </SafeAreaView>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "700" },
//   item: { marginTop: 8, fontSize: 16 },
// });
