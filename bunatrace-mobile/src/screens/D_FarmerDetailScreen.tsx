// // app/screens/D_FarmerDetailScreen.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from "react-native";

// type FarmerDetailProps = {
//   navigation: any;
//   route: any;
// };

// export default function FarmerDetailScreen({ navigation, route }: FarmerDetailProps) {
//   const farmer = route.params?.farmer;

//   if (!farmer) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.error}>Farmer data not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <Image
//           source={require("../../assets/farmer-placeholder.png")}
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>{farmer.name}</Text>
//         <Text style={styles.subtitle}>Farmer Profile</Text>
//       </View>

//       {/* Farmer Information */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Farmer Details</Text>

//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{farmer.name}</Text>

//         <Text style={styles.label}>Gender</Text>
//         <Text style={styles.value}>{farmer.gender || "N/A"}</Text>

//         <Text style={styles.label}>Age</Text>
//         <Text style={styles.value}>{farmer.age || "N/A"}</Text>

//         <Text style={styles.label}>Phone</Text>
//         <Text style={styles.value}>{farmer.phone || "N/A"}</Text>

//         <Text style={styles.label}>Region</Text>
//         <Text style={styles.value}>{farmer.region}</Text>

//         <Text style={styles.label}>Woreda</Text>
//         <Text style={styles.value}>{farmer.woreda}</Text>

//         <Text style={styles.label}>Kebele</Text>
//         <Text style={styles.value}>{farmer.kebele}</Text>
//       </View>

//       {/* Buttons */}
//       <View style={styles.btnContainer}>

//         <TouchableOpacity
//           style={styles.primaryBtn}
//           onPress={() => navigation.navigate("FarmerForm", { farmer })}
//         >
//           <Text style={styles.primaryText}>Edit Farmer</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryBtn}
//           onPress={() =>
//             navigation.navigate("FarmList", {
//               farmerId: farmer.id,
//               farmerName: farmer.name,
//             })
//           }
//         >
//           <Text style={styles.secondaryText}>View Farms</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryBtn}
//           onPress={() =>
//             navigation.navigate("DeliveryForm", {
//               farmerId: farmer.id,
//               farmerName: farmer.name,
//             })
//           }
//         >
//           <Text style={styles.secondaryText}>Record Delivery</Text>
//         </TouchableOpacity>

//       </View>

//       {/* Back */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
//         <Text style={styles.backText}>← Back</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fafafa",
//     padding: 20,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   error: {
//     fontSize: 18,
//     color: "red",
//   },

//   header: {
//     alignItems: "center",
//     marginBottom: 25,
//   },

//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 2,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 2,
//     marginBottom: 20,
//   },

//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   label: {
//     color: "#555",
//     marginTop: 10,
//     fontSize: 13,
//   },

//   value: {
//     fontSize: 16,
//     color: "#222",
//   },

//   btnContainer: {
//     marginTop: 10,
//   },

//   primaryBtn: {
//     backgroundColor: "#4A7A4C",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   primaryText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },

//   secondaryBtn: {
//     backgroundColor: "#e6f4ea",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   secondaryText: {
//     color: "#4A7A4C",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   back: {
//     alignItems: "center",
//     marginTop: 20,
//   },

//   backText: {
//     fontSize: 16,
//     color: "#4A7A4C",
//   },
// });
