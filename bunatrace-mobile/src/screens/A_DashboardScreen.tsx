// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function A_DashboardScreen() {
//   const navigation = useNavigation<any>();

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Dashboard</Text>
//       </View>

//       {/* FLOATING CARD */}
//       <ScrollView
//         contentContainerStyle={styles.cardWrapper}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.card}>
//           <Text style={styles.welcome}>Welcome,</Text>
//           <Text style={styles.role}>Field Enumerator</Text>

//           <View style={styles.statsRow}>
//             <View style={styles.statBox}>
//               <Text style={styles.statNumber}>1,250</Text>
//               <Text style={styles.statLabel}>Farmers</Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statNumber}>2,450</Text>
//               <Text style={styles.statLabel}>Farms</Text>
//             </View>
//           </View>

//           <ActionButton label="REGISTER FARMER" />
//           <ActionButton label="MAP FARM" />
//           <ActionButton label="RECORD DELIVERY" />
//           <ActionButton label="CREATE BATCH" />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function ActionButton({ label }: { label: string }) {
//   return (
//     <TouchableOpacity style={styles.btn}>
//       <Text style={styles.btnText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#F2F4F2" },

//   header: {
//   height: 200,
//   backgroundColor: "#2F5D3A",
//   paddingHorizontal: 20,
//   paddingTop: 40, // FIX for notch & camera
//   justifyContent: "flex-end",
//   paddingBottom: 24,
// },

// cardWrapper: {
//   paddingHorizontal: 16,
//   paddingBottom: 30,
//   marginTop: -16, // FIX overlap
// },

// card: {
//   backgroundColor: "#FFF",
//   borderRadius: 24,
//   padding: 20,
//   elevation: 5,
// },

//   // header: {
//   //   height: 150,
//   //   paddingTop: 40,
//   //   backgroundColor: "#2F5D3A",
//   //   paddingHorizontal: 20,
//   //   justifyContent: "flex-end",
//   //   paddingBottom: 20,
//   // },
//   headerTitle: {
//     color: "#FFF",
//     fontSize: 26,
//     fontWeight: "700",
//   },

//   // cardWrapper: {
//   //   marginTop: -16,
//   //   paddingHorizontal: 16,
//   //   paddingBottom: 30,
//   //    // 🔑 overlap
//   // },
//   // card: {
//   //   backgroundColor: "#FFF",
//   //   borderRadius: 24,
//   //   padding: 20,
//   //   elevation: 4,
//   // },

//   welcome: { fontSize: 18, fontWeight: "600" },
//   role: { fontSize: 16, marginBottom: 16 },

//   statsRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 20,
//   },
//   statBox: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#DDD",
//     borderRadius: 12,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   statNumber: { fontSize: 22, fontWeight: "700" },
//   statLabel: { color: "#555" },

//   btn: {
//     backgroundColor: "#2F5D3A",
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginBottom: 12,
//     alignItems: "center",
//   },
//   btnText: {
//     color: "#FFF",
//     fontSize: 15,
//     fontWeight: "700",
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");
// const CARD_GAP = width * 0.04;

// export default function A_DashboardScreen() {
//   const navigation = useNavigation<any>();

//   return (
//     <SafeAreaView style={styles.safe}>
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* HEADER */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Dashboard</Text>
//           <Text style={styles.headerSub}>Welcome, Field Enumerator</Text>
//         </View>

//         {/* STATS */}
//         <View style={styles.statsRow}>
//           <View style={styles.statCard}>
//             <Text style={styles.statNumber}>1,250</Text>
//             <Text style={styles.statLabel}>Farmers</Text>
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statNumber}>2,450</Text>
//             <Text style={styles.statLabel}>Farms</Text>
//           </View>
//         </View>

//         {/* ACTION BUTTONS */}
//         <View style={styles.actions}>
//           <ActionButton
//             label="REGISTER FARMER"
//             onPress={() => navigation.navigate("A_FarmerListScreen")}
//           />
//           <ActionButton
//             label="REGISTER FARM"
//             onPress={() => navigation.navigate("A_FarmerListScreen")}
//           />
//           <ActionButton
//             label="RECORD DELIVERY"
//             onPress={() => navigation.navigate("A_DeliveryChooseFarmerScreen")}
//           />
//           <ActionButton
//             label="CREATE BATCH"
//             onPress={() => navigation.navigate("A_BatchListScreen")}
//           />
//           <ActionButton
//             label="QR SCANNER"
//             onPress={() => navigation.navigate("A_QRScannerScreen")}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /* ---------- REUSABLE BUTTON ---------- */
// function ActionButton({
//   label,
//   onPress,
// }: {
//   label: string;
//   onPress: () => void;
// }) {
//   return (
//     <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
//       <Text style={styles.actionText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#F4F6F4",
//   },
//   container: {
//     paddingBottom: 30,
//   },

//   header: {
//     backgroundColor: "#1F4D2B",
//     paddingTop: 24,
//     paddingBottom: 28,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },
//   headerTitle: {
//     color: "#FFF",
//     fontSize: 28,
//     fontWeight: "700",
//   },
//   headerSub: {
//     color: "#E3EFE6",
//     marginTop: 6,
//     fontSize: 16,
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     borderRadius: 16,
//     paddingVertical: 20,
//     marginHorizontal: CARD_GAP / 2,
//     alignItems: "center",
//     elevation: 3,
//   },
//   statNumber: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#1F4D2B",
//   },
//   statLabel: {
//     marginTop: 6,
//     fontSize: 14,
//     color: "#666",
//   },

//   actions: {
//     marginTop: 24,
//     paddingHorizontal: 20,
//     gap: 14,
//   },
//   actionBtn: {
//     backgroundColor: "#1F4D2B",
//     paddingVertical: 18,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   actionText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//     letterSpacing: 0.5,
//   },
// });


//import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 60) / 2;


// export default function A_DashboardScreen() {
//   const navigation = useNavigation<any>();

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Dashboard</Text>
//           <Text style={styles.headerSub}>
//             Welcome, Field Enumerator
//           </Text>
//         </View>

//         {/* STATS */}
//         <View style={styles.statsRow}>
//           <StatCard value="1,250" label="Farmers" />
//           <StatCard value="2,450" label="Farms" />
//         </View>

//         {/* ACTION BUTTONS */}
//         <View style={styles.actions}>
//           <ActionButton
//             icon="person-add"
//             label="REGISTER FARMER"
//             onPress={() => navigation.navigate("A_FarmerListScreen")}
//           />

//           <ActionButton
//             icon="map"
//             label="REGISTER FARM"
//             onPress={() => navigation.navigate("A_FarmerListScreen")}
//           />

//           <ActionButton
//             icon="leaf"
//             label="RECORD DELIVERY"
//             onPress={() => navigation.navigate("A_DeliveryChooseFarmerScreen")}
//           />

//           <ActionButton
//             icon="layers"
//             label="CREATE BATCH"
//             onPress={() => navigation.navigate("A_BatchListScreen")}
//           />

//           <ActionButton
//             icon="layers"
//             label="QR Scanner"
//             onPress={() => navigation.navigate("A_QRScannerScreen")}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /* ---------- COMPONENTS ---------- */

// function StatCard({ value, label }: any) {
//   return (
//     <View style={styles.statCard}>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }


// function ActionButton({ icon, label, onPress }: any) {
//   return (
//     <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
//       <Ionicons name={icon} size={22} color="#FFF" />
//       <Text style={styles.actionText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }



// const GREEN = "#1F4D2B";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F6F7F6",
//   },

//   /* HEADER */
//   header: {
//     backgroundColor: GREEN,
//     paddingTop: 28,
//     paddingBottom: 22,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },

//   headerTitle: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#FFF",
//   },

//   headerSub: {
//     fontSize: 14,
//     marginTop: 6,
//     color: "#E3E3E3",
//   },

//   /* STATS */
//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },

//   statCard: {
//     width: CARD_WIDTH,
//     backgroundColor: "#FFF",
//     borderRadius: 16,
//     paddingVertical: 18,
//     alignItems: "center",
//     elevation: 3,
//   },

//   statValue: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: GREEN,
//   },

//   statLabel: {
//     marginTop: 6,
//     fontSize: 14,
//     color: "#555",
//   },

//   /* ACTIONS */
//   actions: {
//     paddingHorizontal: 20,
//     marginTop: 26,
//     gap: 14,
//   },

//   actionBtn: {
//     height: 56,
//     backgroundColor: GREEN,
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },

//   actionText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 14,
//     letterSpacing: 0.3,
//   },
// });


// // src/screens/A_DashboardScreen.tsx
// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// export default function A_DashboardScreen() {
//   const navigation = useNavigation<any>();

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Dashboard</Text>
//         <Text style={styles.headerSub}>Welcome, Field Enumerator</Text>
//       </View>

//       {/* Stats */}
//       <View style={styles.statsRow}>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>1,250</Text>
//           <Text style={styles.statLabel}>Farmers</Text>
//         </View>

//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>2,450</Text>
//           <Text style={styles.statLabel}>Farms</Text>
//         </View>
//       </View>

//       {/* Actions */}
//       <View style={styles.actions}>
//         <ActionButton
//           icon="person-add"
//           label="REGISTER FARMER"
//           onPress={() => navigation.navigate("A_FarmerListScreen")}
//         />

//         <ActionButton
//           icon="map"
//           label="REGISTER FARM"
//           onPress={() => navigation.navigate("A_FarmerListScreen")}
//         />

//         <ActionButton
//           icon="leaf"
//           label="RECORD DELIVERY"
//           onPress={() => navigation.navigate("A_DeliveryChooseFarmerScreen")}
//         />

//         <ActionButton
//           icon="layers"
//           label="CREATE BATCH"
//           onPress={() => navigation.navigate("A_BatchListScreen")}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// function ActionButton({ icon, label, onPress }: any) {
//   return (
//     <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
//       <Ionicons name={icon} size={22} color="#FFF" />
//       <Text style={styles.actionText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// const DARK_GREEN = "#1F4D2B";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F8F8",
//   },

//   header: {
//     backgroundColor: DARK_GREEN,
//     padding: 24,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },

//   headerTitle: {
//     color: "#FFF",
//     fontSize: 24,
//     fontWeight: "700",
//   },

//   headerSub: {
//     color: "#E0E0E0",
//     marginTop: 6,
//     fontSize: 14,
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },

//   statCard: {
//     backgroundColor: "#FFF",
//     width: "48%",
//     padding: 20,
//     borderRadius: 14,
//     alignItems: "center",
//     elevation: 2,
//   },

//   statNumber: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: DARK_GREEN,
//   },

//   statLabel: {
//     marginTop: 4,
//     fontSize: 14,
//     color: "#555",
//   },

//   actions: {
//     padding: 20,
//     gap: 12,
//   },

//   actionBtn: {
//     backgroundColor: DARK_GREEN,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 14,
//   },

//   actionText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 12,
//   },
// });


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// export default function A_DashboardScreen() {
//   const navigation: any = useNavigation();
//   const [username, setUsername] = useState("");

//   // Load username from storage (saved after login)
//   useEffect(() => {
//     const loadUser = async () => {
//       const savedUser = await AsyncStorage.getItem("username");
//       if (savedUser) setUsername(savedUser);
//     };
//     loadUser();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("username");
//     navigation.replace("Login");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.title}>BunaTrace Dashboard</Text>
//         <Text style={styles.subtitle}>Welcome, {username || "User"}</Text>
//       </View>

//       {/* CARDS SECTION */}
//       <View style={styles.cardContainer}>
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("A_FarmerListScreen")}
//         >
//           <Text style={styles.cardTitle}>Farmers</Text>
//           <Text style={styles.cardDesc}>View & manage farmers</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("A_FarmerListScreen")}
          
//         >
//           <Text style={styles.cardTitle}>Farms</Text>
//           <Text style={styles.cardDesc}>Map and update farm details</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("A_DeliveryChooseFarmerScreen")}
//         >
//           <Text style={styles.cardTitle}>Deliveries</Text>
//           <Text style={styles.cardDesc}>Record cherry delivery</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("A_BatchListScreen")}
//         >
//           <Text style={styles.cardTitle}>Batches</Text>
//           <Text style={styles.cardDesc}>Create processing batches</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("A_QRScannerScreen")}
//         >
//           <Text style={styles.cardTitle}>QR Scanner</Text>
//           <Text style={styles.cardDesc}>Scan supply chain QR codes</Text>
//         </TouchableOpacity>
//       </View>

//       {/* LOGOUT BUTTON */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // // -------------------
// // // STYLES
// // // -------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F6F6F6",
//     padding: 20,
//   },

//   header: {
//     marginBottom: 25,
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#4A2F22",
//   },

//   subtitle: {
//     color: "#666",
//     marginTop: 5,
//     fontSize: 16,
//   },

//   cardContainer: {
//     marginTop: 10,
//   },

//   card: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 14,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },

//   cardTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#4A2F22",
//   },

//   cardDesc: {
//     marginTop: 6,
//     fontSize: 14,
//     color: "#777",
//   },

//   logoutBtn: {
//     backgroundColor: "#B03A2E",
//     padding: 14,
//     marginTop: 30,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   logoutText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export {};

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function A_DashboardScreen() {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("username");
      if (savedUser) setUsername(savedUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Welcome, {username || "Field Enumerator"}
        </Text>
      </View>

      {/* WHITE CARD PANEL */}
      <View style={styles.panel}>
        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>Farmers</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>2,450</Text>
            <Text style={styles.statLabel}>Farms</Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_FarmerListScreen")}
        >
          <Text style={styles.actionText}>REGISTER FARMER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_FarmerListScreen")}
        >
          <Text style={styles.actionText}>REGISTER FARM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_DeliveryChooseFarmerScreen")}
        >
          <Text style={styles.actionText}>RECORD DELIVERY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_BatchListScreen")}
        >
          <Text style={styles.actionText}>CREATE BATCH</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_StationCreateScreen")}
        >
          <Text style={styles.actionText}>CREATE STATION</Text>
        </TouchableOpacity>
      

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("A_QRScannerScreen")}
        >
          <Text style={styles.actionText}>QR SCANNER</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F2",
  },

  /* HEADER */
  // header: {
  //   backgroundColor: "#2F5D3A",
  //   paddingTop: 50,
  //   paddingBottom: 30,
  //   paddingHorizontal: 20,
  //   borderBottomLeftRadius: 28,
  //   borderBottomRightRadius: 28,
  // },

  header: {
  backgroundColor: "#2F5D3A",
  paddingTop: 60,          // pushes content DOWN
  paddingBottom: 40,
  paddingHorizontal: 20,

  // REVERSE CURVE
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
},

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },

  headerSubtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#E3EFE6",
  },

  /* PANEL */
  panel: {
    backgroundColor: "#FFF",
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  statValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2F5D3A",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  /* ACTION BUTTONS */
  actionBtn: {
    backgroundColor: "#2F5D3A",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 14,
  },

  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  /* LOGOUT */
  logoutBtn: {
    backgroundColor: "#B03A2E",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
