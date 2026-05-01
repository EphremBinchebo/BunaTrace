// // src/screens/A_BatchListScreen.tsx
// src/screens/A_BatchListScreen.tsx
// src/screens/A_BatchListScreen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { fetchBatches } from "../services/batches/batches.service";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function A_BatchListScreen() {
  const navigation = useNavigation<any>();

  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reload list every time screen is focused
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchBatches();
      setBatches(data);
    } catch (e) {
      console.error("Failed to load batches:", e);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (batch: any) => {
    navigation.navigate("A_BatchDetailScreen", {
      batchId: batch.id,
    });
  };

  const createNewBatch = () => {
    navigation.navigate("A_BatchCreateScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Processing Batches</Text>

        <TouchableOpacity style={styles.createBtn} onPress={createNewBatch}>
          <Text style={styles.createText}>＋ New Batch</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#1B5E20" />
      ) : batches.length === 0 ? (
        <Text style={styles.emptyText}>No batches created yet.</Text>
      ) : (
        <FlatList
          data={batches}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openDetails(item)}
            >
              <Text style={styles.cardTitle}>{item.batchCode}</Text>

              <Text style={styles.cardSub}>
                Station: {item.stationName || "—"}
              </Text>

              <Text style={styles.cardSub}>
                Process: {item.processType}
              </Text>

              <Text style={styles.status}>{item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: { fontSize: 24, fontWeight: "700" },

  createBtn: {
    backgroundColor: "#1B5E20",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  createText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#F1F1F1",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  cardTitle: { fontSize: 18, fontWeight: "700" },

  cardSub: { fontSize: 14, color: "#666", marginTop: 4 },

  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 16,
  },
});

// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   View,
// } from "react-native";
// import { fetchBatches } from "../services/batches/batches.service";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";

// export default function A_BatchListScreen() {
//   const navigation = useNavigation<any>();

//   const [batches, setBatches] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Reload list every time screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       load();
//     }, [])
//   );

//   const load = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchBatches();
//       setBatches(data);
//     } catch (e) {
//       console.error("Failed to load batches:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDetails = (batch: any) => {
//     navigation.navigate("A_BatchDetailScreen", {
//       batchId: batch.id,
//     });
//   };

//   const createNewBatch = () => {
//     navigation.navigate("A_BatchCreateScreen");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Processing Batches</Text>

//         <TouchableOpacity style={styles.createBtn} onPress={createNewBatch}>
//           <Text style={styles.createText}>＋ New Batch</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#1B5E20" />
//       ) : batches.length === 0 ? (
//         <Text style={styles.emptyText}>No batches created yet.</Text>
//       ) : (
//         <FlatList
//           data={batches}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ paddingVertical: 10 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() => openDetails(item)}
//             >
//               <Text style={styles.cardTitle}>{item.batchCode}</Text>

//               <Text style={styles.cardSub}>
//                 Station: {item.stationName || "—"}
//               </Text>

//               <Text style={styles.cardSub}>
//                 Process: {item.processType}
//               </Text>

//               <Text style={styles.status}>{item.status}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFF" },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   title: { fontSize: 24, fontWeight: "700" },

//   createBtn: {
//     backgroundColor: "#1B5E20",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 10,
//   },

//   createText: {
//     color: "#FFF",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   card: {
//     backgroundColor: "#F1F1F1",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 10,
//   },

//   cardTitle: { fontSize: 18, fontWeight: "700" },

//   cardSub: { fontSize: 14, color: "#666", marginTop: 4 },

//   status: {
//     marginTop: 6,
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#2E7D32",
//   },

//   emptyText: {
//     textAlign: "center",
//     color: "#777",
//     marginTop: 40,
//     fontSize: 16,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { fetchBatches } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_BatchListScreen() {
//   const navigation = useNavigation<any>();

//   const [batches, setBatches] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchBatches();
//       setBatches(data);
//     } catch (e) {
//       console.error("Failed to load batches:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDetails = (batch: any) => {
//     navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Processing Batches</Text>

//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <FlatList
//           data={batches}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ paddingVertical: 10 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() => openDetails(item)}
//             >
//               <Text style={styles.cardTitle}>{item.batchCode}</Text>
//               <Text style={styles.cardSub}>Station: {item.stationName}</Text>
//               <Text style={styles.cardSub}>Status: {item.status}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
//   title: { fontSize: 24, fontWeight: "700", marginBottom: 15 },
//   card: {
//     backgroundColor: "#F1F1F1",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   cardTitle: { fontSize: 18, fontWeight: "700" },
//   cardSub: { fontSize: 14, color: "#666" },
// });
