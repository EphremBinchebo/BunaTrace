// // app/screens/C_FarmerListScreen.tsx
// import React, { useEffect, useState } from "react";
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ActivityIndicator 
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function FarmerListScreen({ navigation }: any) {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadFarmers = async () => {
//     setLoading(true);
//     const token = await AsyncStorage.getItem("token");

//     try {
//       const response = await fetch("http://10.0.2.2:8080/api/farmers", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       setFarmers(data);
//     } catch (err) {
//       console.log("Error loading farmers:", err);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadFarmers();
//   }, []);

//   const openFarmer = (farmer: any) => {
//     navigation.navigate("FarmerDetail", { farmer });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmers</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#6B4F27" />
//       ) : (
//         <FlatList
//           data={farmers}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity 
//               style={styles.card}
//               onPress={() => openFarmer(item)}
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.small}>{item.region} / {item.zone}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() => navigation.navigate("FarmerForm")}
//       >
//         <Text style={styles.addText}>+ Add Farmer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 20, 
//     backgroundColor: "#fff" 
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   card: {
//     backgroundColor: "#F2F2F2",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 12,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#222",
//   },
//   small: {
//     fontSize: 14,
//     color: "#666",
//   },
//   addBtn: {
//     backgroundColor: "#6B4F27",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   addText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
// });
