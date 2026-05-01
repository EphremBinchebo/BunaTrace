// src/screens/A_DeliveryChooseFarmScreen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../services/api";

export default function A_DeliveryChooseFarmScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { farmerId, farmerName } = route.params || {};

  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!farmerId) {
      console.log("❌ No farmerId found in route params");
      return;
    }

    console.log("📦 Received farmerId:", farmerId);
    loadFarms();
  }, [farmerId]);

  const loadFarms = async () => {
    try {
      setLoading(true);

      console.log("🔵 Loading farms for farmer:", farmerId);

      // IMPORTANT: baseURL ALREADY has /api, so do NOT repeat /api here
      const res = await api.get(`/farms/farmer/${farmerId}`);

      console.log("🟢 Farms loaded successfully:", res.data);

      setFarms(res.data);
    } catch (e) {
      console.error("❌ Failed to load farms:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (farm: any) => {

  navigation.navigate("A_DeliveryChooseStationScreen", {
    farmerId,
    farmerName,
    farmId: farm.id,
    farmName: farm.name,
  });
};




  // const handleSelect = (farm: any) => {
  //   navigation.navigate("A_DeliveryEntryScreen", {
  //     farmId: farm.id,
  //     farmName: farm.name,
  //     farmerId,
  //     farmerName,
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Farms of {farmerName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1B5E20" />
      ) : (
        <FlatList
          data={farms}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSub}>
                {item.region}, {item.zone}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  cardSub: { fontSize: 14, color: "#666", marginTop: 4 },
  backButton: { marginTop: 14 },
  backText: { color: "#1B5E20", fontWeight: "600" },
});

// // src/screens/A_DeliveryChooseFarmScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import api from "../services/api";

// export default function A_DeliveryChooseFarmScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName } = route.params;

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   loadFarms();
//   // }, []);

//   useEffect(() => {
//   if (farmerId) loadFarms();
// }, [farmerId]);


// const loadFarms = async () => {
//   try {
//     setLoading(true);

//     console.log("🔵 Loading farms for farmer:", farmerId);

//     const res = await api.get(`/api/farms/farmer/${farmerId}`);

//     console.log("🟢 Farms loaded:", res.data);

//     setFarms(res.data);
//   } catch (e) {
//     console.error("Failed to load farms:", e);
//   } finally {
//     setLoading(false);
//   }
// };


// export default function A_DeliveryChooseFarmScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName } = route.params;

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const res = await api.get(`/farms/by-farmer/${farmerId}`);
//       setFarms(res.data);
//     } catch (e) {
//       console.error("Failed to load farms:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (farm: any) => {
//     navigation.navigate("DeliveryChooseStation", {
//       farmerId,
//       farmerName,
//       farmId: farm.id,
//       farmName: farm.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Farm</Text>
//       <Text style={styles.subtitle}>Farmer: {farmerName}</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#1B5E20" />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
//               <Text style={styles.cardTitle}>{item.name}</Text>
//               <Text style={styles.cardSub}>Kebele: {item.kebele}</Text>
//               <Text style={styles.cardMeta}>Elevation: {item.elevationM} masl</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
//   subtitle: { color: "#444", marginBottom: 10 },
//   card: { backgroundColor: "#F5F5F5", padding: 14, borderRadius: 12, marginBottom: 10 },
//   cardTitle: { fontSize: 16, fontWeight: "600" },
//   cardSub: { fontSize: 14, color: "#666" },
//   cardMeta: { fontSize: 12, color: "#999" },
//   backButton: { marginTop: 12 },
//   backText: { color: "#1B5E20", fontWeight: "600" },
// });

// // src/screens/A_DeliveryChooseFarmScreen.tsx
// import React from "react";
// import { MOCK_FARMS } from "../mock/mock.const";

// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// type Farm = {
//   id: string;
//   name: string;
//   kebele: string;
//   elevation: number;
// };

// // const MOCK_FARMS: Farm[] = [
// //   { id: "FA001", name: "Abe Farm", kebele: "Kebele 03", elevation: 1950 },
// //   { id: "FA002", name: "Sara Farm", kebele: "Kebele 02", elevation: 1850 },
// // ];

// export default function A_DeliveryChooseFarmScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { farmerId, farmerName } = route.params || {};

//   const handleSelect = (farm: Farm) => {
//     navigation.navigate("DeliveryChooseStation", {
//       farmerId,
//       farmerName,
//       farmId: farm.id,
//       farmName: farm.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Farm</Text>
//       {farmerName && (
//         <Text style={styles.subtitle}>Farmer: {farmerName}</Text>
//       )}

//       <FlatList
//         data={MOCK_FARMS}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingVertical: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>{item.kebele}</Text>
//             <Text style={styles.cardMeta}>
//               Elevation: {item.elevation} masl
//             </Text>
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
