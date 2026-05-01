import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import spacing from "../theme/spacing";
import colors from "../theme/colors";

export default function A_FarmerProfileScreen({ route, navigation }) {
  const { farmer } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{farmer.name}</Text>

      <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
      <Text style={styles.field}>Region: {farmer.region}</Text>
      <Text style={styles.field}>Zone: {farmer.zone}</Text>
      <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
      <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

      {/* View Farms */}
      {/* <PrimaryButton
        label="View Farms"
        onPress={() =>
          navigation.navigate("A_FarmListScreen", {
            farmerId: farmer.id,
            farmer,
          })
        }
      /> */}

      {/* Add New Farm
      <PrimaryButton
        label="Add New Farm"
        style={{ backgroundColor: colors.secondary }}
        onPress={() =>
          navigation.navigate("A_FarmAddScreen", {
            farmer,
            farmerId: farmer.id,
          })
        }
      /> */}

      {/* Record Delivery (NEW, required for your supply chain flow) */}
      {/* <PrimaryButton
        label="Record Delivery"
        style={{ backgroundColor: colors.success || "green" }}
        onPress={() =>
          navigation.navigate("A_DeliveryAddScreen", {
            farmer,
            farmerId: farmer.id,
          })
        }
      /> */}

      <PrimaryButton
  onPress={() =>
    navigation.navigate("A_FarmListScreen", {
      farmerId: farmer.id,
      farmer,
    })
  }
>
  View Farms
</PrimaryButton>

<PrimaryButton
  style={{ backgroundColor: colors.secondary }}
  onPress={() =>
    navigation.navigate("A_FarmAddScreen", {
      farmer,
      farmerId: farmer.id,
    })
  }
>
  Add New Farm
</PrimaryButton>

<PrimaryButton
  style={{ backgroundColor: "green" }}
  onPress={() => navigation.goBack()}
>
  Back
</PrimaryButton>

        {/* label="Back"
        style={{ backgroundColor: colors.muted || "#ccc" }}
        onPress={() => navigation.goBack()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  field: {
    fontSize: 16,
    marginBottom: spacing.sm,
  },
});


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//             farmerId: farmer.id,
//              farmer,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         style={{ backgroundColor: colors.secondary }}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Back"
//         style={{ backgroundColor: "green" }}
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     marginBottom: spacing.sm,
//   },
// });


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         style={{ backgroundColor: colors.secondary }}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Back"
//         style={{ backgroundColor: "green" }}
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     marginBottom: spacing.sm,
//   },
// });



// // // src/screens/A_FarmerProfileScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function A_FarmerProfileScreen({ route, navigation }: any) {
//   const farmerParam = route.params?.farmer;
//   const farmerId = farmerParam?.id;

//   const [farmer, setFarmer] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!farmerId) {
//       Alert.alert("Error", "No farmer ID provided.");
//       navigation.goBack();
//       return;
//     }
//     loadFarmer();
//   }, []);

//   const loadFarmer = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) throw new Error("Missing token");

//       const res = await fetch(`http://10.0.2.2:8080/api/actors/${farmerId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         console.log("Farmer Details ERROR", await res.text());
//         throw new Error("Failed to fetch farmer");
//       }

//       const json = await res.json();
//       setFarmer(json);
//     } catch (e) {
//       console.log("Farmer fetch error:", e);
//       Alert.alert("Error", "Could not load farmer details");
//     }

//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   if (!farmer) {
//     return (
//       <View style={styles.loading}>
//         <Text>Error loading farmer.</Text>
//         <PrimaryButton label="Back" onPress={() => navigation.goBack()} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", { farmerId: farmer.id })
//         }
//         style={{ marginTop: 20 }}
//       />

//       <PrimaryButton
//         label="Back to Farmers"
//         onPress={() => navigation.goBack()}
//         style={{ backgroundColor: colors.secondary }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     color: colors.textDark,
//     marginBottom: spacing.sm,
//   },
// });



// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "../services/api";

// export default function A_FarmerProfileScreen({ route, navigation }: any) {
//   const { farmer } = route.params; // coming from Farmer List screen
//   const [farmerData, setFarmerData] = useState<any>(farmer); 
//   const [loading, setLoading] = useState(false);

//   // Optional: fetch fresh farmer details if needed
//   useEffect(() => {
//     fetchFarmer();
//   }, []);

//   const fetchFarmer = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       if (!token) return;

//       const res = await fetch(`${API_URL}/actors/${farmer.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Failed to fetch farmer");

//       const data = await res.json();
//       setFarmerData(data);
//     } catch (e) {
//       console.log("Farmer fetch error:", e);
//       Alert.alert("Error", "Could not load farmer details.");
//     }
//     setLoading(false);
//   };

//   if (loading || !farmerData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmerData.name}</Text>

//       <Text style={styles.field}>Phone: {farmerData.phone ?? "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmerData.region ?? "N/A"}</Text>
//       <Text style={styles.field}>Zone: {farmerData.zone ?? "N/A"}</Text>
//       <Text style={styles.field}>Woreda: {farmerData.woreda ?? "N/A"}</Text>
//       <Text style={styles.field}>Kebele: {farmerData.kebele ?? "N/A"}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", { farmerId: farmerData.id })
//         }
//         style={{ marginTop: spacing.md }}
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", { farmerId: farmerData.id })
//         }
//         style={{ marginTop: spacing.sm, backgroundColor: colors.secondary }}
//       />

//       <PrimaryButton
//         label="Back"
//         onPress={() => navigation.goBack()}
//         style={{ marginTop: spacing.md }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//     color: colors.textDark,
//   },
//   field: {
//     fontSize: 16,
//     color: colors.textDark,
//     marginBottom: spacing.sm,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }: any) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="Back to List"
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     color: colors.textDark,
//     marginBottom: spacing.sm,
//   },
// });


// // src/screens/A_FarmerProfileScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import farmerService from "../services/farmers/farmers.service";

// export default function FarmerProfileScreen() {
//   const route = useRoute();
//   const { farmerId }: any = route.params;

//   const [farmer, setFarmer] = useState<any>(null);

//   useEffect(() => {
//     loadFarmer();
//   }, []);

//   const loadFarmer = async () => {
//       const data = await farmerService.getFarmerById(farmerId);
//       setFarmer(data);
//   };

//   if (!farmer) return <ActivityIndicator style={{ marginTop: 50 }} />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>
//       <Text style={styles.label}>Phone: {farmer.phone}</Text>
//       <Text style={styles.label}>Gender: {farmer.gender}</Text>
//       <Text style={styles.label}>Address: {farmer.address || "N/A"}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1 },
//   name: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
//   label: { fontSize: 16, marginTop: 6 },
// // });
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }: any) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       {/* <PrimaryButton
//         label="View Farms"
//         // onPress={() => navigation.navigate("A_FarmListScreen", { farmerId: farmer.id })}
//         onPress={() =>
//          navigation.navigate("A_FarmListScreen", {
//           farmer,
//          farmerId: farmer.id
//         })
//     }

//       /> */}

//       <PrimaryButton
//            label="View Farms"
//            onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//          // farmer: farmer,     // sending full farmer object
//           farmerId: farmer.id // optional
//           })
//        }
//      />

//       <PrimaryButton
//         label="Add New Farm"
//         // onPress={() => navigation.navigate("A_FarmAddScreen", { farmerId: farmer.id })}
//         onPress={() =>
//         navigation.navigate("A_FarmAddScreen", {
//         farmer,
//         farmerId: farmer.id
//         })
//        }
  
//         style={{ backgroundColor: colors.secondary }}
//       />

//       <PrimaryButton
//         label="Back"
//         onPress={() => navigation.goBack()}
//         style={{ backgroundColor: "green" }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//     color: "#000",
//   },
//   field: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: spacing.sm,
//   },
// });
// // A_FarmerProfileScreen.tsx
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       {/* ✔ FIXED: Farmer + ID */}
//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//         style={{ backgroundColor: colors.secondary }}
//       />

//       <PrimaryButton
//         label="Back"
//         onPress={() => navigation.goBack()}
//         style={{ backgroundColor: "green" }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//     color: "#000",
//   },
//   field: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: spacing.sm,
//   },
// });
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         style={{ backgroundColor: colors.secondary }}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Back"
//         style={{ backgroundColor: "green" }}
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     marginBottom: spacing.sm,
//   },
// });
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerProfileScreen({ route, navigation }) {
//   const { farmer } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{farmer.name}</Text>

//       <Text style={styles.field}>Phone: {farmer.phone || "N/A"}</Text>
//       <Text style={styles.field}>Region: {farmer.region}</Text>
//       <Text style={styles.field}>Zone: {farmer.zone}</Text>
//       <Text style={styles.field}>Woreda: {farmer.woreda}</Text>
//       <Text style={styles.field}>Kebele: {farmer.kebele}</Text>

//       <PrimaryButton
//         label="View Farms"
//         onPress={() =>
//           navigation.navigate("A_FarmListScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Add New Farm"
//         style={{ backgroundColor: colors.secondary }}
//         onPress={() =>
//           navigation.navigate("A_FarmAddScreen", {
//             farmer,
//             farmerId: farmer.id,
//           })
//         }
//       />

//       <PrimaryButton
//         label="Back"
//         style={{ backgroundColor: "green" }}
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   field: {
//     fontSize: 16,
//     marginBottom: spacing.sm,
//   },
// });
