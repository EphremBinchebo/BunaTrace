import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchStations, Station } from "../services/station/station.service";

export default function A_DeliveryChooseStationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { farmerId, farmerName, farmId, farmName } = route.params || {};

  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      setLoading(true);
      const data = await fetchStations();
      setStations(data);
    } catch (e) {
      console.error("❌ Failed to load stations:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (station: Station) => {
    navigation.navigate("A_DeliveryEntryScreen", {
      farmerId,
      farmerName,
      farmId,
      farmName,
      stationId: station.id,
      stationName: station.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Washing Station</Text>
      <Text style={styles.subtitle}>
        {farmerName} — {farmName}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSub}>
                {[item.zone, item.region].filter(Boolean).join(", ")}
              </Text>
              <Text style={styles.cardMeta}>Station ID: {item.id}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ paddingTop: 16 }}>
              <Text>No stations found. Ask Admin to register stations.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
  subtitle: { fontSize: 14, color: "#444", marginTop: 4, marginBottom: 16 },
  card: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 14, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  cardSub: { fontSize: 14, color: "#555", marginTop: 4 },
  cardMeta: { fontSize: 12, color: "#888", marginTop: 4 },
  backButton: { marginTop: 10 },
  backText: { color: "#1B5E20", fontWeight: "600" },
});


// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import api from "../services/api";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function A_DeliveryChooseStationScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();

//   const { farmerId, farmerName, farmId, farmName } = route.params || {};

//   const [stations, setStations] = useState([]);

//   useEffect(() => {
//     loadStations();
//   }, []);

//   const loadStations = async () => {
//     const res = await api.get("/stations");
//     setStations(res.data);
//   };

//   const handleSelect = (station: any) => {
//     navigation.navigate("A_DeliveryEntryScreen", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId: station.id,
//       stationName: station.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Select Washing Station</Text>

//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>{item.region}</Text>
//           </TouchableOpacity>
          
//         )}
//       />
//            <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => navigation.goBack()}
//             >
//               <Text style={styles.backText}>Back</Text>
//             </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "700", marginBottom: 14 },
//   card: { padding: 14, backgroundColor: "#EEE", borderRadius: 10, marginBottom: 10 },
//   cardTitle: { fontWeight: "700", fontSize: 16 },
//   cardSub: { fontSize: 13, color: "#666" },
// });


// // src/screens/A_DeliveryChooseStationScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { fetchStations, Station } from "../services/station/station.service";

// export default function A_DeliveryChooseStationScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName, farmId, farmName } = route.params || {};

//   const [stations, setStations] = useState<Station[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStations();
//   }, []);

//   const loadStations = async () => {
//     try {
//       const data = await fetchStations();
//       setStations(data);
//     } catch (err) {
//       console.error("❌ Failed to load stations:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (station: Station) => {
//     console.log("🟩 Station selected:", station);

//     navigation.navigate("A_DeliveryEntryScreen", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId: station.id,        // REAL UUID sent
//       stationName: station.name,    // REAL NAME sent
//     });
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#1B5E20" />
//         <Text>Loading stations…</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Washing Station</Text>

//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>
//               {item.region} / {item.zone}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
//   title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
//   card: {
//     backgroundColor: "#F5F5F5",
//     padding: 14,
//     marginBottom: 10,
//     borderRadius: 12,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "600" },
//   cardSub: { fontSize: 14, color: "#666" },
// });

// // src/screens/A_DeliveryChooseStationScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { fetchStations, Station } from "../services/station/station.service";

// export default function A_DeliveryChooseStationScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName, farmId, farmName } = route.params || {};

//   const [stations, setStations] = useState<Station[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStations();
//   }, []);

//   const loadStations = async () => {
//     try {
//       const data = await fetchStations();
//       setStations(data);
//     } catch (err) {
//       console.error("❌ Failed to load stations", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (station: Station) => {
//     navigation.navigate("A_DeliveryEntryScreen", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId: station.id,   // REAL UUID
//       stationName: station.name,
//     });
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#1B5E20" />
//         <Text>Loading stations...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Washing Station</Text>

//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>
//               {item.region} / {item.zone}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
//   title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
//   card: { backgroundColor: "#F5F5F5", padding: 14, borderRadius: 12, marginBottom: 10 },
//   cardTitle: { fontSize: 16, fontWeight: "600" },
//   cardSub: { fontSize: 14, color: "#555" },
// });

// // src/screens/A_DeliveryChooseStationScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { fetchStations, Station } from "../services/station/station.service";

// export default function A_DeliveryChooseStationScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName, farmId, farmName } = route.params || {};

//   const [stations, setStations] = useState<Station[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadStations = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchStations();
//         setStations(data);
//       } catch (e) {
//         console.error("❌ Failed to load stations:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadStations();
//   }, []);

//   const handleSelect = (station: Station) => {
//     navigation.navigate("DeliveryEntry", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId: station.id,
//       stationName: station.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Washing Station</Text>
//       {farmerName && farmName && (
//         <Text style={styles.subtitle}>
//           {farmerName} — {farmName}
//         </Text>
//       )}

//       {loading && <ActivityIndicator size="small" />}

//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingVertical: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>
//               {item.woreda ?? ""}, {item.region ?? ""}
//             </Text>
//             <Text style={styles.cardMeta}>Station ID: {item.id}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.secondaryText}>Back</Text>
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
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 10,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
//   cardSub: { fontSize: 14, color: "#555", marginTop: 4 },
//   cardMeta: { fontSize: 12, color: "#888", marginTop: 4 },
//   footer: { marginTop: 8 },
//   secondaryButton: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   secondaryText: { color: "#1B5E20", fontWeight: "600" },
// });

// // src/screens/A_DeliveryChooseStationScreen.tsx
// import { MOCK_STATIONS } from "../mock/mock.const";

// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// type Station = {
//   id: string;
//   name: string;
//   location: string;
// };

// // const MOCK_STATIONS: Station[] = [
// //   { id: "WS001", name: "Hambela Washing Station", location: "Guji" },
// //   { id: "WS002", name: "Yirgacheffe WS", location: "Yirgacheffe" },
// // ];

// export default function A_DeliveryChooseStationScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName, farmId, farmName } = route.params || {};

//   const handleSelect = (station: Station) => {
//     // navigation.navigate("DeliveryEntry", {
//     navigation.navigate("A_DeliveryEntryScreen", {
//       farmerId,
//       farmerName,
//       farmId,
//       farmName,
//       stationId: station.id,
//       stationName: station.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Washing Station</Text>
//       {farmerName && farmName && (
//         <Text style={styles.subtitle}>
//           {farmerName} — {farmName}
//         </Text>
//       )}

//       <FlatList
//         data={MOCK_STATIONS}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingVertical: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>{item.location}</Text>
//             <Text style={styles.cardMeta}>Station ID: {item.id}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.secondaryText}>Back</Text>
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
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 10,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
//   cardSub: { fontSize: 14, color: "#555", marginTop: 4 },
//   cardMeta: { fontSize: 12, color: "#888", marginTop: 4 },
//   footer: { marginTop: 8 },
//   secondaryButton: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   secondaryText: { color: "#1B5E20", fontWeight: "600" },
// });
