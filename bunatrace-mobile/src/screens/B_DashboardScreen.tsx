// // // src/screens/B_DashboardScreen.tsx
// // import React from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   SafeAreaView,
// // } from "react-native";

// // export default function DashboardScreen({ navigation }) {
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.title}>BunaTrace Dashboard</Text>

// //       <Text style={styles.subtitle}>You are now logged in!</Text>

// //       <View style={styles.cardContainer}>
// //         <View style={styles.card}>
// //           <Text style={styles.cardNumber}>23</Text>
// //           <Text style={styles.cardLabel}>Farmers</Text>
// //         </View>

// //         <View style={styles.card}>
// //           <Text style={styles.cardNumber}>12</Text>
// //           <Text style={styles.cardLabel}>Farms</Text>
// //         </View>

// //         <View style={styles.card}>
// //           <Text style={styles.cardNumber}>48</Text>
// //           <Text style={styles.cardLabel}>Deliveries</Text>
// //         </View>

// //         <View style={styles.card}>
// //           <Text style={styles.cardNumber}>6</Text>
// //           <Text style={styles.cardLabel}>Batches</Text>
// //         </View>
// //       </View>

// //       {/* --- Navigation Buttons for Testing --- */}
// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={() => navigation.navigate("FarmerList")}
// //       >
// //         <Text style={styles.buttonText}>Go to Farmer List</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         style={[styles.button, styles.secondaryButton]}
// //         onPress={() => navigation.navigate("QrScanner")}
// //       >
// //         <Text style={styles.secondaryButtonText}>Open QR Scanner</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         style={[styles.button, styles.logoutButton]}
// //         onPress={() => navigation.replace("Login")}
// //       >
// //         <Text style={styles.logoutText}>Logout</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5F5F5",
// //     padding: 20,
// //   },

// //   title: {
// //     fontSize: 26,
// //     fontWeight: "bold",
// //     color: "#3E2723",
// //     marginTop: 10,
// //     marginBottom: 5,
// //   },

// //   subtitle: {
// //     fontSize: 16,
// //     color: "#777",
// //     marginBottom: 20,
// //   },

// //   cardContainer: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "space-between",
// //   },

// //   card: {
// //     width: "47%",
// //     backgroundColor: "#FFF",
// //     paddingVertical: 25,
// //     marginVertical: 8,
// //     borderRadius: 14,
// //     alignItems: "center",
// //     elevation: 2,
// //   },

// //   cardNumber: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: "#2E7D32",
// //   },

// //   cardLabel: {
// //     fontSize: 14,
// //     color: "#555",
// //   },

// //   button: {
// //     marginTop: 20,
// //     backgroundColor: "#2E7D32",
// //     paddingVertical: 14,
// //     borderRadius: 14,
// //     alignItems: "center",
// //   },

// //   buttonText: {
// //     color: "#FFF",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },

// //   secondaryButton: {
// //     backgroundColor: "#1B5E20",
// //   },

// //   secondaryButtonText: {
// //     color: "#FFF",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },

// //   logoutButton: {
// //     backgroundColor: "#8B0000",
// //   },

// //   logoutText: {
// //     color: "#FFF",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// // });
// // src/screens/B_DashboardScreen.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function B_DashboardScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>BunaTrace Dashboard</Text>
//         <Text style={styles.subtitle}>Welcome back! You are logged in.</Text>

//         {/* --- Stats Cards --- */}
//         <View style={styles.cardContainer}>
//           <View style={styles.card}>
//             <Text style={styles.cardNumber}>23</Text>
//             <Text style={styles.cardLabel}>Farmers</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.cardNumber}>12</Text>
//             <Text style={styles.cardLabel}>Farms</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.cardNumber}>48</Text>
//             <Text style={styles.cardLabel}>Deliveries</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.cardNumber}>6</Text>
//             <Text style={styles.cardLabel}>Batches</Text>
//           </View>
//         </View>

//         {/* --- Navigation Buttons --- */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("A_FarmerListScreen")}
//         >
//           <Text style={styles.buttonText}>Go to Farmers</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.secondaryButton]}
//           onPress={() => navigation.navigate("QrScanner")}
//         >
//           <Text style={styles.secondaryButtonText}>Open QR Scanner</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.logoutButton]}
//           onPress={() => navigation.replace("Login")}
//         >
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#F4F4F4",
//   },

//   container: {
//     padding: spacing.lg,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#2E3A29",
//     marginBottom: 6,
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//   },

//   cardContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   card: {
//     width: "47%",
//     backgroundColor: "#FFF",
//     paddingVertical: 25,
//     marginVertical: 8,
//     borderRadius: 16,
//     alignItems: "center",
//     borderWidth: 1.2,
//     borderColor: "#ddd",
//   },

//   cardNumber: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#2E7D32",
//   },

//   cardLabel: {
//     fontSize: 14,
//     color: "#555",
//   },

//   button: {
//     marginTop: 20,
//     backgroundColor: colors.primary,
//     paddingVertical: 15,
//     borderRadius: 14,
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   secondaryButton: {
//     backgroundColor: "#1B5E20",
//   },

//   secondaryButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   logoutButton: {
//     backgroundColor: "#8B0000",
//     marginBottom: 40,
//   },

//   logoutText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });
