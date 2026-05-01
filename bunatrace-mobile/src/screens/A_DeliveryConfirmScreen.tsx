import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { submitDelivery } from "../services/deliveries/deliveries.service";

export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
  const {
    farmerId,
    farmerName,
    farmId,
    farmName,
    stationId,
    stationName,
    cherryKg,
    receiptNumber,
    notes,
    photo,
  } = route.params || {};

  console.log("🟦 Route params Confirm:", route.params);

  const handleSubmit = async () => {
    try {
      if (!farmerId || !farmId || !stationId) {
        Alert.alert(
          "Missing data",
          "Farmer, Farm, or Station selection is missing."
        );
        return;
      }

      const payload = {
        farmerId,
        farmId,
        stationId,
        cherryKg: Number(cherryKg),
        receiptNumber,
        notes,
      };

      console.log("📤 Submitting delivery:", payload);

      await submitDelivery(payload);

      Alert.alert("Success", "Delivery recorded successfully.");
      navigation.navigate("A_DashboardScreen");
    } catch (e: any) {
      console.error("Delivery submit error:", e?.response?.data || e);
      Alert.alert("Error", "Failed to save delivery.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Delivery</Text>

      <Text style={styles.label}>Farmer: {farmerName}</Text>
      <Text style={styles.label}>Farm: {farmName}</Text>
      <Text style={styles.label}>Station: {stationName}</Text>
      <Text style={styles.label}>KG: {cherryKg}</Text>
      <Text style={styles.label}>Receipt: {receiptNumber}</Text>
      {notes ? <Text style={styles.label}>Notes: {notes}</Text> : null}

      {photo && <Image source={{ uri: photo }} style={styles.photo} />}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  photo: { width: "100%", height: 220, borderRadius: 12, marginVertical: 16 },
  button: {
    backgroundColor: "#6B4F27",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  back: { marginTop: 20, padding: 12, alignItems: "center" },
  backText: { color: "#777", fontSize: 16 },
});

// // src/screens/A_DeliveryConfirmScreen.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { submitDelivery } from "../services/deliveries/deliveries.service";

// export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
//   const {
//     farmerId,
//     farmerName,
//     farmId,
//     farmName,
//     stationId,
//     stationName,
//     cherryKg,
//     receiptNumber,
//     photo,
//   } = route.params || {};

//   console.log("🟦 Route params:", route.params);

//   const handleSubmit = async () => {
//     try {
//       if (!farmerId || !farmId || !stationId) {
//         Alert.alert(
//           "Missing data",
//           "Farmer, farm or station is missing. Please go back and re-select."
//         );
//         return;
//       }

//       const payload = {
//         farmerId,
//         farmId,
//         stationId,
//         cherryKg: Number(cherryKg),
//         receiptNumber,
//       };

//       console.log("Submitting delivery:", payload);
//       await submitDelivery(payload);

//       Alert.alert("Success", "Delivery recorded successfully.");
//       navigation.navigate("A_DashboardScreen");
//     } catch (e: any) {
//       console.error(
//         "Delivery submit error:",
//         e?.response?.data ? e.response.data : e
//       );
//       Alert.alert("Error", "Failed to save delivery.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Confirm Delivery</Text>

//       <Text style={styles.label}>Farmer: {farmerName}</Text>
//       <Text style={styles.label}>Farm: {farmName}</Text>
//       <Text style={styles.label}>Station: {stationName}</Text>
//       <Text style={styles.label}>KG: {cherryKg}</Text>
//       <Text style={styles.label}>Receipt: {receiptNumber}</Text>

//       {photo && <Image source={{ uri: photo }} style={styles.photo} />}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#444",
//   },
//   photo: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     marginVertical: 16,
//   },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   back: {
//     marginTop: 20,
//     padding: 12,
//     alignItems: "center",
//   },
//   backText: {
//     color: "#777",
//     fontSize: 16,
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { submitDelivery } from "../services/deliveries/deliveries.service";

// export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
//   const {
//     farmerId,
//     farmerName,
//     farmId,
//     farmName,
//     stationId,
//     stationName,
//     cherryKg,
//     receiptNumber,
//     photo,       // used only for preview (Option B will upload separately)
//   } = route.params;
   
//   console.log("🟦 Route params:", route.params);
//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         farmerId,           // UUID
//         farmId,             // UUID
//         stationId,          // UUID
//         cherryKg: Number(cherryKg),
//         receiptNumber,
//       };

//       console.log("Submitting delivery:", payload);

//       await submitDelivery(payload);

//       Alert.alert("Success", "Delivery recorded successfully.");
//       navigation.navigate("A_DashboardScreen");
//     } catch (e) {
//       console.error("Delivery submit error:", e);
//       Alert.alert("Error", "Failed to save delivery.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Confirm Delivery</Text>

//       <Text style={styles.label}>Farmer: {farmerName}</Text>
//       <Text style={styles.label}>Farm: {farmName}</Text>
//       <Text style={styles.label}>Station: {stationName}</Text>
//       <Text style={styles.label}>KG: {cherryKg}</Text>
//       <Text style={styles.label}>Receipt: {receiptNumber}</Text>

//       {photo && <Image source={{ uri: photo }} style={styles.photo} />}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#444",
//   },
//   photo: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     marginVertical: 16,
//   },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   back: {
//     marginTop: 20,
//     padding: 12,
//     alignItems: "center",
//   },
//   backText: {
//     color: "#777",
//     fontSize: 16,
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { submitDelivery } from "../services/deliveries/deliveries.service";


// export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
//   const {
//     farmerId,
//     farmerName,
//     farmId,
//     farmName,
//     stationId,
//     stationName,
//     cherryKg,
//     receiptNumber,
//     photo,
//   } = route.params;

//   function fakeUUID(id: string) {
//   return `00000000-0000-0000-0000-${id.padStart(12, "0")}`;
  
// }
// const handleSubmit = async () => {
//   try {
//     const payload = {
//       farmerId: fakeUUID(farmerId),
//       farmId: fakeUUID(farmId),
//       stationId: fakeUUID(stationId),
//       cherryKg: Number(cherryKg),
//       receiptNumber,
//     };

//     console.log("Submitting delivery:", payload);

//     await submitDelivery(payload);

//     Alert.alert("Success", "Delivery recorded successfully.");
//     navigation.navigate("A_DashboardScreen");
//   } catch (e) {
//     console.error("Delivery submit error:", e);
//     Alert.alert("Error", "Failed to save delivery.");
//   }
// };

// const handleSubmit = async () => {
//   try {
//     const payload = {
//       farmerId: fakeUUID(farmerId),
//       farmId: fakeUUID(farmId),
//       stationId: fakeUUID(stationId),
//       cherryKg: Number(cherryKg),
//       receiptNumber,
//       photo: photo || null,
//     };

//     console.log("Submitting delivery:", payload);

//     await submitDelivery(payload);

//     Alert.alert("Success", "Delivery recorded successfully.");
//     navigation.navigate("A_DashboardScreen");
//   } catch (e) {
//     console.error("Delivery submit error:", e);
//     Alert.alert("Error", "Failed to save delivery.");
//   }
// };

  // const handleSubmit = async () => {
  //   try {
  //     // const payload = {
  //     //   farmerId,
  //     //   farmId,
  //     //   stationId,
  //     //   cherryKg: Number(cherryKg),
  //     //   receiptNumber,
  //     //   photo: photo || null,
  //         const payload = {
  //           farmerId: fakeUUID(farmerId),
  //           farmId: fakeUUID(farmId),
  //           stationId: fakeUUID(stationId),
  //           cherryKg: Number(cherryKg),
  //           receiptNumber,
  //           photo: photo || null,
  //         };

  //     console.log("Submitting delivery:", payload);

  //     await submitDelivery(payload);

  //     Alert.alert("Success", "Delivery recorded successfully.");
  //     navigation.navigate("A_DashboardScreen");
  //   } catch (e) {
  //     console.error("Delivery submit error:", e);
  //     Alert.alert("Error", "Failed to save delivery.");
  //   }
  // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Confirm Delivery</Text>

//       <Text style={styles.label}>Farmer: {farmerName}</Text>
//       <Text style={styles.label}>Farm: {farmName}</Text>
//       <Text style={styles.label}>Station: {stationName}</Text>
//       <Text style={styles.label}>KG: {cherryKg}</Text>
//       <Text style={styles.label}>Receipt: {receiptNumber}</Text>

//       {photo && <Image source={{ uri: photo }} style={styles.photo} />}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
  
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#444",
//   },
//   photo: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     marginVertical: 16,
//   },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   back: {
//     marginTop: 20,
//     padding: 12,
//     alignItems: "center",
//   },
//   backText: {
//     color: "#777",
//     fontSize: 16,
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { submitDelivery } from "../services/deliveries/deliveries.service";

// export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
//   const { farmer, farm, station, kg, receiptNumber, photo } = route.params;

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         farmerId: farmer.id,           // MUST BE UUID
//         farmId: farm.id,               // MUST BE UUID
//         stationId: station.id,         // MUST BE UUID
//         cherryKg: Number(kg),          // FIXED
//         receiptNumber: receiptNumber,  // FIXED
//         photo: photo || null,          // FIXED
//       };

//       console.log("Submitting delivery:", payload);

//       await submitDelivery(payload);

//       Alert.alert("Success", "Delivery recorded successfully.");
//       navigation.navigate("A_DashboardScreen");
//     } catch (e) {
//       console.error("Delivery submit error:", e);
//       Alert.alert("Error", "Failed to save delivery.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Confirm Delivery</Text>

//       <Text style={styles.label}>Farmer: {farmer?.name}</Text>
//       <Text style={styles.label}>Farm: {farm?.name}</Text>
//       <Text style={styles.label}>Station: {station?.name}</Text>
//       <Text style={styles.label}>KG: {kg}</Text>
//       <Text style={styles.label}>Receipt: {receiptNumber}</Text>

//       {photo && <Image source={{ uri: photo }} style={styles.photo} />}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#444",
//   },
//   photo: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     marginVertical: 16,
//   },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   back: {
//     marginTop: 20,
//     padding: 12,
//     alignItems: "center",
//   },
//   backText: {
//     color: "#777",
//     fontSize: 16,
//   },
// });

// // src/screens/A_DeliveryConfirmScreen.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { submitDelivery } from "../services/deliveries/deliveries.service";

// export default function A_DeliveryConfirmScreen({ route, navigation }: any) {
//   const { farmerId, farmId, stationId, kg, receipt, photo } = route.params;

//   const handleSubmit = async () => {
//     try {
//       await submitDelivery({
//         farmerId,
//         farmId,
//         stationId,
//         cherryKg: kg,
//         receipt,
//         photoUri: photo,
//       });

//       Alert.alert("Success", "Delivery recorded successfully.");
//       navigation.navigate("A_DashboardScreen");
//     } catch (e) {
//       console.error(e);
//       Alert.alert("Error", "Failed to save delivery.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Confirm Delivery</Text>

//       <Text style={styles.label}>Farmer ID: {farmerId}</Text>
//       <Text style={styles.label}>Farm ID: {farmId}</Text>
//       <Text style={styles.label}>Station: {stationId}</Text>
//       <Text style={styles.label}>KG: {kg}</Text>
//       <Text style={styles.label}>Receipt: {receipt}</Text>

//       {photo && <Image source={{ uri: photo }} style={styles.photo} />}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   label: { fontSize: 16, marginBottom: 6 },
//   photo: { width: "100%", height: 220, borderRadius: 12, marginVertical: 15 },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
//   back: { marginTop: 20, alignItems: "center" },
//   backText: { color: "#777" },
// });
