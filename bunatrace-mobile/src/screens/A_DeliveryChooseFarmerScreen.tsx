// src/screens/A_DeliveryChooseFarmerScreen.tsx
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
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function A_DeliveryChooseFarmerScreen() {
  const navigation = useNavigation<any>();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarmers();
  }, []);

  const loadFarmers = async () => {
    try {
      const res = await api.get("/actors?type=FARMER");
      // setFarmers(res.data);
      setFarmers(res.data.filter(actor => actor.type === "FARMER"));

    } catch (e) {
      console.error("Failed to load farmers:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (farmer: any) => {
    navigation.navigate("A_DeliveryChooseFarmScreen", {
      farmerId: farmer.id,
      farmerName: farmer.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Farmer</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1B5E20" />
      ) : (
        <FlatList
          data={farmers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSub}>
                {item.region}, {item.zone}
              </Text>
            </TouchableOpacity>
          )}
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
  title: { fontSize: 24, fontWeight: "700", color: "#1B5E20", marginBottom: 10 },
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

// // src/screens/A_DeliveryChooseFarmerScreen.tsx
// import React from "react";
// import { MOCK_FARMERS } from "../mock/mock.const";

// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// type Farmer = {
//   id: string;
//   name: string;
//   region: string;
// };

// // const MOCK_FARMERS: Farmer[] = [
// //   { id: "F001", name: "Farmer Abe", region: "Guji, Oromia" },
// //   { id: "F002", name: "Farmer Sara", region: "Sidama, SNNPR" },
// // ];

// export default function A_DeliveryChooseFarmerScreen() {
//   const navigation = useNavigation<any>();

//   const handleSelect = (farmer: Farmer) => {
//     navigation.navigate("DeliveryChooseFarm", {
//       farmerId: farmer.id,
//       farmerName: farmer.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose Farmer</Text>
//       <Text style={styles.subtitle}>
//         Select the farmer delivering fresh cherry.
//       </Text>

//       <FlatList
//         data={MOCK_FARMERS}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingVertical: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardSub}>{item.region}</Text>
//             <Text style={styles.cardMeta}>Farmer ID: {item.id}</Text>
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
//     color: "#666",
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
