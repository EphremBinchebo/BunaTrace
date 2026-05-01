// // src/screens/A_FarmListScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// // export default function A_FarmListScreen({ navigation, route }) {
// //   const { farmerId, farmer } = route.params;

// //   const farmerName = farmer?.name || "Farmer";
// //   const [farms, setFarms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (error) {
// //       console.log("❌ Failed to load farms:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>{farmerName}'s Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.card}
// //               onPress={() =>
// //                 navigation.navigate("FarmDetailScreen", {
// //                   farmId: item.id,
// //                   farmerId,
// //                 })
// //               }
// //             >
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
// //               <Text style={styles.sub}>
// //                 {item.woreda} • {item.kebele}
// //               </Text>
// //             </TouchableOpacity>
// //           )}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId, farmer })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
// export default function A_FarmListScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId ?? null;
//   const farmer = route?.params?.farmer ?? null;

//   if (!farmerId) {
//     return (
//       <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
//         <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
//           ❗ Error: Missing farmerId.\nThis screen must be opened from a farmer profile.
//         </Text>

//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ marginTop: 20, padding: 15, backgroundColor: "blue", borderRadius: 8 }}
//         >
//           <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
//             Go Back
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
//   title: { fontSize: 22, fontWeight: "700", marginBottom: spacing.md },
//   card: {
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 12,
//   },
//   name: { fontSize: 18, fontWeight: "700" },
//   sub: { color: colors.gray, marginTop: 4 },
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 16,
//     borderRadius: 10,
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//   },
//   addBtnText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmListScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId;

//   const farmer = route?.params?.farmer || {};
//   const farmerName = farmer.name || "Farmer";

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       console.log("❗ farmerId missing in A_FarmListScreen");
//       return;
//     }
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const data = await farmService.getFarmsByFarmer(farmerId);
//       setFarms(data);
//     } catch (err) {
//       console.log("❌ ERROR loading farms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{farmerName}’s Farms</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("A_FarmDetailScreen", {
//                   farmId: item.id,
//                   farmerId,
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
//               <Text style={styles.sub}>
//                 {item.woreda} / {item.kebele}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", { farmerId, farmer })
//         }
//       >
//         <Text style={styles.addBtnText}>+ Add Farm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.md,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   sub: {
//     marginTop: 4,
//     color: colors.gray,
//   },
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 17,
//     borderRadius: 10,
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   addBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 18,
//   },
// });


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmListScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId;

//   const farmer = route?.params?.farmer || {};
//   const farmerName = farmer.name || "Farmer";

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       console.log("❗ farmerId missing in A_FarmListScreen");
//       return;
//     }
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const data = await farmService.getFarmsByFarmer(farmerId);
//       setFarms(data);
//     } catch (err) {
//       console.log("❌ ERROR loading farms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{farmerName}’s Farms</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("A_FarmDetailScreen", {
//                   farmId: item.id,
//                   farmerId,
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
//               <Text style={styles.sub}>
//                 {item.woreda} / {item.kebele}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", { farmerId, farmer })
//         }
//       >
//         <Text style={styles.addBtnText}>+ Add Farm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.md,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   sub: {
//     marginTop: 4,
//     color: colors.gray,
//   },
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 17,
//     borderRadius: 10,
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   addBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 18,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmListScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId;

//   const farmer = route?.params?.farmer || {};
//   const farmerName = farmer.name || "Farmer";

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       console.log("❗ farmerId missing in A_FarmListScreen");
//       return;
//     }
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const data = await farmService.getFarmsByFarmer(farmerId);
//       setFarms(data);
//     } catch (err) {
//       console.log("❌ ERROR loading farms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{farmerName}’s Farms</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("A_FarmDetailScreen", {
//                   farmId: item.id,
//                   farmerId,
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
//               <Text style={styles.sub}>
//                 {item.woreda} / {item.kebele}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", { farmerId, farmer })
//         }
//       >
//         <Text style={styles.addBtnText}>+ Add Farm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.md,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   sub: {
//     marginTop: 4,
//     color: colors.gray,
//   },
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 17,
//     borderRadius: 10,
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   addBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 18,
//   },
// });

// // A_FarmListScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmListScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId;
//   const farmer = route?.params?.farmer || {};
//   const farmerName = farmer.name || "Farmer";

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       console.warn("❗ farmerId missing in A_FarmListScreen");
//       return;
//     }
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const data = await farmService.getFarmsByFarmer(farmerId);
//       setFarms(data);
//     } catch (e) {
//       console.log("❌ ERROR loading farms:", e);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{farmerName}’s Farms</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("A_FarmDetailScreen", {
//                   farmId: item.id,
//                   farmerId,
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
//               <Text style={styles.sub}>
//                 {item.woreda} / {item.kebele}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
//       >
//         <Text style={styles.addBtnText}>+ Add Farm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: spacing.md,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 14,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   sub: {
//     marginTop: 4,
//     color: colors.gray,
//   },
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 16,
//     borderRadius: 10,
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   addBtnText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });


// // src/screens/A_FarmListScreen.tsx
// // src/screens/A_FarmListScreen.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
  
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmListScreen({ navigation, route }) {

//   const farmerId = route?.params?.farmerId;   // ✔ Works always
//   const farmer = route?.params?.farmer || {}; // optional
//   const farmerName = farmer.name || "Farmer";

//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       console.warn("❗ farmerId was not passed to A_FarmListScreen");
//       return;
//     }
//     loadFarms();
//   }, []);

//   const loadFarms = async () => {
//     try {
//       const data = await farmService.getFarmsByFarmer(farmerId);
//       setFarms(data);
//     } catch (e) {
//       console.log("❌ ERROR loading farms:", e);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{farmerName}’s Farms</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("A_FarmDetailScreen", {
//                   farmId: item.id,
//                   farmerId: farmerId
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
//               <Text style={styles.sub}>{item.woreda} / {item.kebele}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
//       >
//         <Text style={styles.addBtnText}>+ Add Farm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: spacing.md,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//     color: "#000",
//   },

//   // ✔ FIXED: This was missing
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   backText: {
//     marginTop: 20,
//     fontSize: 18,
//     color: "green",
//   },

//   // FARM CARDS
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   sub: {
//     marginTop: 4,
//     color: colors.gray,
//   },

//   // ADD FARM BUTTON
//   addBtn: {
//     backgroundColor: colors.primary,
//     padding: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//   },
//   addBtnText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import farmService from "../services/farms/farm.service";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";
// // export default function A_FarmListScreen({ navigation, route }) {
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };


// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   // ✅ ALWAYS read farmerId safely
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       setLoading(false);
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (error) {
// //       console.log("❌ Error loading farms:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // export default function A_FarmListScreen({ route, navigation }) {
// //   const farmerId = route?.params?.farmerId;   // FIXED

// //   const [farms, setFarms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId missing");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };

// //   // ❗ FIXED ERROR: “styles does not exist”
// //   if (!farmerId) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.errorText}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={styles.backText}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const renderItem = ({ item }: any) => (
// //     <TouchableOpacity
// //       style={styles.card}
// //       onPress={() =>
// //         navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //       }
// //     >
// //       <Text style={styles.name}>{item.name}</Text>
// //       <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
// //       <Text style={styles.sub}>
// //         {item.woreda} / {item.kebele}
// //       </Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderItem}
// //           contentContainerStyle={{ paddingBottom: 100 }}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     padding: spacing.md,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: "700",
// //     marginBottom: spacing.md,
// //     color: "#000",
// //   },

// //   // ✔ FIXED: This was missing
// //   center: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //   },
// //   errorText: {
// //     color: "red",
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   backText: {
// //     marginTop: 20,
// //     fontSize: 18,
// //     color: "green",
// //   },

// //   // FARM CARDS
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   sub: {
// //     marginTop: 4,
// //     color: colors.gray,
// //   },

// //   // ADD FARM BUTTON
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     position: "absolute",
// //     bottom: 20,
// //     left: 20,
// //     right: 20,
// //   },
// //   addBtnText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "700",
// //   },
// // });

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   ActivityIndicator,
// // } from "react-native";
// // // import farmService from "../services/farms/farm.service";
// // // import colors from "../theme/colors";
// // // import spacing from "../theme/spacing";

// // // export default function A_FarmListScreen({ navigation, route }) {
// // //   const farmerId = route?.params?.farmerId;

// // //   const [farms, setFarms] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!farmerId) {
// // //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// // //       return;
// // //     }
// // //     loadFarms();
// // //   }, []);

// // //   const loadFarms = async () => {
// // //     try {
// // //       const data = await farmService.getFarmsByFarmer(farmerId);
// // //       setFarms(data);
// // //     } catch (e) {
// // //       console.log("❌ ERROR loading farms:", e);
// // //     }
// // //     setLoading(false);
// // //   };
// // export default function A_FarmListScreen({ navigation, route }) {
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };

// //   if (!farmerId) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={{ color: "red", fontSize: 18 }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, color: "green", fontSize: 18 }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.card}
// //               onPress={() =>
// //                 navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //               }
// //             >
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text>{item.woreda} / {item.kebele}</Text>
// //             </TouchableOpacity>
// //           )}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }


// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   ActivityIndicator,
// // } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import colors from "../theme/colors";
// // import spacing from "../theme/spacing";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   // ✅ ALWAYS read farmerId safely
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       setLoading(false);
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (error) {
// //       console.log("❌ Error loading farms:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ❗ FIXED ERROR: “styles does not exist”
// //   if (!farmerId) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.errorText}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={styles.backText}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const renderItem = ({ item }: any) => (
// //     <TouchableOpacity
// //       style={styles.card}
// //       onPress={() =>
// //         navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //       }
// //     >
// //       <Text style={styles.name}>{item.name}</Text>
// //       <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
// //       <Text style={styles.sub}>
// //         {item.woreda} / {item.kebele}
// //       </Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderItem}
// //           contentContainerStyle={{ paddingBottom: 100 }}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     padding: spacing.md,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: "700",
// //     marginBottom: spacing.md,
// //     color: "#000",
// //   },

// //   // ✔ FIXED: This was missing
// //   center: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //   },
// //   errorText: {
// //     color: "red",
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   backText: {
// //     marginTop: 20,
// //     fontSize: 18,
// //     color: "green",
// //   },

// //   // FARM CARDS
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   sub: {
// //     marginTop: 4,
// //     color: colors.gray,
// //   },

// //   // ADD FARM BUTTON
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     position: "absolute",
// //     bottom: 20,
// //     left: 20,
// //     right: 20,
// //   },
// //   addBtnText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "700",
// //   },
// // });


// // // src/screens/A_FarmListScreen.tsx
// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   ActivityIndicator,
// // } from "react-native";
// // import colors from "../theme/colors";
// // import spacing from "../theme/spacing";
// // import farmService from "../services/farms/farm.service";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };

// //   if (!farmerId) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={{ color: "red", fontSize: 18 }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, color: "green", fontSize: 18 }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.card}
// //               onPress={() =>
// //                 navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //               }
// //             >
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text>{item.woreda} / {item.kebele}</Text>
// //             </TouchableOpacity>
// //           )}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }


// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmer = route?.params?.farmer;
// //   const farmerId = farmer?.id;

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     }
// //     setLoading(false);
// //   };

// //   if (!farmerId) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={{ color: "red", fontSize: 18 }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, color: "green", fontSize: 18 }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const renderItem = ({ item }: any) => (
// //     <TouchableOpacity
// //       style={styles.card}
// //       onPress={() =>
// //         navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //       }
// //     >
// //       <Text style={styles.name}>{item.name}</Text>
// //       <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
// //       <Text style={styles.sub}>
// //         {item.woreda} / {item.kebele}
// //       </Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>{farmer.name}’s Farms</Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderItem}
// //           contentContainerStyle={{ paddingBottom: 100 }}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     padding: spacing.md,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     marginBottom: spacing.md,
// //   },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   sub: {
// //     marginTop: 4,
// //     color: colors.gray,
// //   },
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     position: "absolute",
// //     bottom: 20,
// //     left: 20,
// //     right: 20,
// //   },
// //   addBtnText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   center: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //   },
// // });

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId ?? null;
// //   const farmerName = route?.params?.farmerName ?? "";

// //   const [farms, setFarms] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       setLoading(false);
// //       return;
// //     }
// //     loadFarms();
// //   }, [farmerId]);

// //   const loadFarms = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // If somehow we still don't have a farmerId, show a simple screen
// //   if (!farmerId) {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.error}>Farmer ID missing! Cannot load farms.</Text>
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.addBtn}
// //         >
// //           <Text style={styles.addBtnText}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>
// //         {farmerName ? `${farmerName}'s Farms` : "Farmer’s Farms"}
// //       </Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       ) : (
// //         <FlatList
// //           data={farms}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.card}
// //               onPress={() =>
// //                 navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //               }
// //             >
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //               <Text style={styles.meta}>
// //                 {item.woreda} / {item.kebele}
// //               </Text>
// //             </TouchableOpacity>
// //           )}
// //           contentContainerStyle={{ paddingBottom: 24 }}
// //         />
// //       )}

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId })}
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: spacing.md },
// //   error: { color: "red", fontSize: 16, marginBottom: spacing.md },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     elevation: 3,
// //   },
// //   name: { fontSize: 18, fontWeight: "600" },
// //   area: { fontSize: 14, color: colors.textDark },
// //   meta: { fontSize: 13, color: colors.gray },
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// //   addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// // });


// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from "react-native";

// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   if (!farmerId) {
// //     console.warn("❗ farmerId was not passed to A_FarmListScreen");

// //     return (
// //       <View style={styles.errorContainer}>
// //         <Text style={styles.errorText}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={styles.goBack}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>
// //               {item.woreda} / {item.kebele}
// //             </Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       {/* ADD FARM BUTTON */}
// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: spacing.md,
// //     backgroundColor: "#fff",
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     marginBottom: spacing.md,
// //     color: colors.textDark,
// //   },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     elevation: 3,
// //     borderWidth: 1,
// //     borderColor: "#eee",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   area: {
// //     fontSize: 14,
// //     color: colors.textDark,
// //   },
// //   meta: {
// //     fontSize: 13,
// //     color: colors.gray,
// //   },
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// //   addBtnText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: spacing.md,
// //     backgroundColor: "#f8f8f8",
// //   },
// //   errorText: {
// //     fontSize: 18,
// //     color: "red",
// //     marginBottom: 20,
// //     textAlign: "center",
// //   },
// //   goBack: {
// //     fontSize: 18,
// //     color: "green",
// //     fontWeight: "600",
// //   },
// // });


// // import React, { useEffect, useState } from "react";
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";


// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   if (!farmerId) {
// //     console.warn("❗ farmerId was not passed to A_FarmListScreen");

// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <Text style={{ color: "red", fontSize: 18 }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, color: "green", fontSize: 20 }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, [farmerId]);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>{item.woreda} / {item.kebele}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }


// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   if (!farmerId) {
// //     console.warn("❗ farmerId was not passed to A_FarmListScreen");

// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <Text style={{ color: "red", fontSize: 18 }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, color: "green", fontSize: 20 }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, [farmerId]);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>{item.woreda} / {item.kebele}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }


// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   if (!farmerId) {
// //     console.warn("❗ farmerId was not passed to A_FarmListScreen");

// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <Text style={{ fontSize: 16, color: "red" }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, fontSize: 18, color: "green" }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>{item.woreda} / {item.kebele}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId;

// //   if (!farmerId) {
// //     console.warn("❗ farmerId was not passed to A_FarmListScreen");

// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <Text style={{ fontSize: 16, color: "red" }}>
// //           Farmer ID missing! Cannot load farms.
// //         </Text>

// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ marginTop: 20, fontSize: 18, color: "green" }}>
// //             Go Back
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>{item.woreda} / {item.kebele}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const farmerId = route?.params?.farmerId ?? null;

// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       return;
// //     }

// //     loadFarms();
// //   }, [farmerId]);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   if (!farmerId) {
// //     return (
// //       <View style={styles.errorContainer}>
// //         <Text style={styles.errorText}>Farmer ID missing! Cannot load farms.</Text>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={styles.backBtn}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>
// //               {item.woreda} / {item.kebele}
// //             </Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: spacing.md },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     elevation: 3,
// //   },
// //   name: { fontSize: 18, fontWeight: "600" },
// //   area: { fontSize: 14, color: colors.textDark },
// //   meta: { fontSize: 13, color: colors.gray },
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// //   addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: spacing.lg,
// //   },
// //   errorText: { fontSize: 18, color: "red", marginBottom: spacing.md },
// //   backBtn: { fontSize: 16, color: colors.primary, marginTop: 10 },
// // });


// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   // Safely extract farmerId
// //   const farmerId = route?.params?.farmerId;

// //   const [farms, setFarms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // If screen was opened incorrectly → go back
// //   useEffect(() => {
// //     if (!farmerId) {
// //       console.warn("❗ farmerId was not passed to A_FarmListScreen");
// //       navigation.goBack();
// //       return;
// //     }

// //     loadFarms();
// //   }, [farmerId]);

// //   const loadFarms = async () => {
// //     try {
// //       console.log("🔍 Loading farms for farmerId:", farmerId);

// //       const data = await farmService.getFarmsByFarmer(farmerId);

// //       console.log("✅ Loaded farms:", data);

// //       setFarms(data || []);
// //     } catch (e) {
// //       console.log("❌ ERROR loading farms:", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.loader}>
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>
// //               {item.woreda} / {item.kebele}
// //             </Text>
// //           </TouchableOpacity>
// //         )}
// //         ListEmptyComponent={
// //           <Text style={styles.empty}>No farms found for this farmer.</Text>
// //         }
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
// //   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: spacing.md },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     elevation: 3,
// //   },
// //   name: { fontSize: 18, fontWeight: "600" },
// //   area: { fontSize: 14, color: colors.textDark },
// //   meta: { fontSize: 13, color: colors.gray },
// //   empty: {
// //     textAlign: "center",
// //     marginTop: 40,
// //     color: colors.gray,
// //     fontSize: 16,
// //   },
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 15,
// //   },
// //   addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// // });


// // import React, { useEffect, useState } from "react";
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// // import farmService from "../services/farms/farm.service";
// // import spacing from "../theme/spacing";
// // import colors from "../theme/colors";

// // export default function A_FarmListScreen({ navigation, route }: any) {
// //   const { farmerId } = route.params;
// //   const [farms, setFarms] = useState([]);

// //   useEffect(() => {
// //     loadFarms();
// //   }, []);

// //   const loadFarms = async () => {
// //     try {
// //       const data = await farmService.getFarmsByFarmer(farmerId);
// //       setFarms(data);
// //     } catch (e) {
// //       console.log("ERROR loading farms:", e);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farmer’s Farms</Text>

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() =>
// //               navigation.navigate("A_FarmDetailScreen", { farmId: item.id })
// //             }
// //           >
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.area}>Area: {item.areaHa} Ha</Text>
// //             <Text style={styles.meta}>{item.woreda} / {item.kebele}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />

// //       <TouchableOpacity
// //         style={styles.addBtn}
// //         onPress={() =>
// //           navigation.navigate("A_FarmAddScreen", { farmerId })
// //         }
// //       >
// //         <Text style={styles.addBtnText}>+ Add Farm</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: spacing.md },
// //   card: {
// //     padding: 16,
// //     borderRadius: 10,
// //     backgroundColor: "#fff",
// //     marginBottom: 14,
// //     elevation: 3,
// //   },
// //   name: { fontSize: 18, fontWeight: "600" },
// //   area: { fontSize: 14, color: colors.textDark },
// //   meta: { fontSize: 13, color: colors.gray},
// //   addBtn: {
// //     backgroundColor: colors.primary,
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// //   addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// // });

// // // src/screens/A_FarmListScreen.tsx
// // import React, { useEffect, useState } from "react";
// // import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import farmService from "../services/farms/farm.service";
// // import FarmCard from "../components/FarmerCard";
// // import colors from "../theme/colors";

// // export default function FarmListScreen() {
// //   const navigation = useNavigation();
// //   const [farms, setFarms] = useState<any[]>([]);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     const data = await farmService.getAll();
// //     setFarms(data);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Farms</Text>
// //       <TouchableOpacity
// //         style={styles.addButton}
// //         onPress={() => navigation.navigate("FarmAdd" as never)}
// //       >
// //         <Text style={styles.addText}>+ Add Farm</Text>
// //       </TouchableOpacity>
      

// //       <FlatList
// //         data={farms}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => <FarmCard farm={item} />}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { padding: 20, flex: 1 },
// //   title: { fontSize: 26, fontWeight: "bold", marginBottom: 12 },
// //   addButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 10 },
// //   addText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
// // });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import farmService from "../services/farms/farm.service";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function A_FarmListScreen({ navigation, route }) {
  // SAFE PARAM EXTRACTION (stops crashes)
  const farmerId = route?.params?.farmerId ?? null;
  const farmer = route?.params?.farmer ?? {};
  const farmerName = farmer?.name ?? "Farmer";

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!farmerId) {
      console.log("❗ ERROR: farmerId missing in navigation params");
      setLoading(false);
      return;
    }
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const data = await farmService.getFarmsByFarmer(farmerId);
      setFarms(data);
    } catch (err) {
      console.log("❌ ERROR loading farms:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!farmerId) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          ⚠ Missing farmer ID.  
          Please navigate from Farmer Profile Screen.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{farmerName}’s Farms</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={farms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("A_FarmDetailScreen", {
                  farmId: item.id,
                  farmerId,
                })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>Area: {item.areaHa} Ha</Text>
              <Text style={styles.sub}>{item.woreda} / {item.kebele}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          navigation.navigate("A_FarmAddScreen", {
            farmerId,
            farmer,
          })
        }
      >
        <Text style={styles.addBtnText}>+ Add Farm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: spacing.md },

  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 18, fontWeight: "700" },
  sub: { marginTop: 4, color: colors.gray },

  addBtn: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 18 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 16, color: "red", textAlign: "center", padding: 20 },
});

