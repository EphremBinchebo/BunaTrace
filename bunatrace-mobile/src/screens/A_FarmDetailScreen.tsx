import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import farmService from "../services/farms/farm.service";
import spacing from "../theme/spacing";
import colors from "../theme/colors";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function A_FarmDetailScreen({ route }) {
  const { farmId } = route.params;
  const [farm, setFarm] = useState<any>(null);


    const navigation = useNavigation<any>();

  useEffect(() => {
    loadFarm();
  }, []);

  const loadFarm = async () => {
    try {
      const data = await farmService.getById(farmId); // ✅ FIXED
      setFarm(data);
    } catch (e) {
      console.log("❌ ERROR loading farm detail:", e);
    }
  };

  if (!farm) {
    return <Text style={{ padding: 20 }}>Loading farm details...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{farm.name}</Text>

      <Text style={styles.item}>Area: {farm.areaHa} Ha</Text>
      <Text style={styles.item}>Location: {farm.woreda}, {farm.kebele}</Text>
      <Text style={styles.item}>Elevation: {farm.elevationMasl ?? "N/A"} masl</Text>
      <Text style={styles.item}>Variety: {farm.variety ?? "N/A"}</Text>

      <Text style={styles.item}>Polygon GeoJSON:</Text>
      <Text style={styles.geo}>{farm.geomGeoJson ?? "No mapping data"}</Text>  
        <View style={style.row}>
              <TouchableOpacity
                style={style.backBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={style.backText}>← Back</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                style={style.dashboardBtn}
                onPress={() => navigation.navigate("A_DashboardScreen")}
              >
                <Text style={style.dashboardText}>🏡 Dashboard</Text>
              </TouchableOpacity>
            </View>
    </ScrollView>
    
  );
  
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  item: { fontSize: 16, color: colors.textDark, marginBottom: 8 },
  geo: {
    fontSize: 12,
    color: "#444",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
  },
});

const style= StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#265C2F",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  backBtn: {
    backgroundColor: "#888",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backText: {
    color: "#FFF",
    fontSize: 16,
  },
  dashboardBtn: {
    backgroundColor: "#2F6E32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dashboardText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import farmService from "../services/farms/farm.service";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmDetailScreen({ route }: any) {
//   const { farmId } = route.params;
//   const [farm, setFarm] = useState<any>(null);

//   useEffect(() => {
//     loadFarm();
//   }, []);

//   const loadFarm = async () => {
//     try {
//       const data = await farmService.getFarmDetails(farmId);
//       setFarm(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   if (!farm) return <Text>Loading...</Text>;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{farm.name}</Text>

//       <Text style={styles.item}>Area: {farm.areaHa} Ha</Text>
//       <Text style={styles.item}>Location: {farm.woreda}, {farm.kebele}</Text>
//       <Text style={styles.item}>Elevation: {farm.elevationMasl} masl</Text>
//       <Text style={styles.item}>Variety: {farm.variety}</Text>
//       <Text style={styles.item}>Polygon: {farm.geomGeoJson}</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: spacing.md, backgroundColor: "#fff", flex: 1 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
//   item: { fontSize: 16, color: colors.textDark, marginBottom: 8 },
// });


// // src/screens/A_FarmDetailScreen.tsx
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// type Props = {
//   navigation: any;
//   route: any;
// };

// export default function A_FarmDetailScreen({ navigation, route }: Props) {
//   const { farm } = route.params;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Farm Details</Text>

//       <View style={styles.card}>
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.value}>{farm.name}</Text>

//         <Text style={styles.label}>Area (Ha):</Text>
//         <Text style={styles.value}>{farm.areaHa}</Text>

//         <Text style={styles.label}>Elevation:</Text>
//         <Text style={styles.value}>{farm.elevationMasl} MASL</Text>

//         <Text style={styles.label}>Variety:</Text>
//         <Text style={styles.value}>{farm.variety}</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate("A_FarmGPSCaptureScreen", { farm })}
//       >
//         <Text style={styles.buttonText}>Capture GPS</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: "#4CAF50" }]}
//         onPress={() => navigation.navigate("A_FarmPolygonMappingScreen", { farm })}
//       >
//         <Text style={styles.buttonText}>Open Mapping</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}>
//         <Text style={styles.secondaryText}>Back</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   card: {
//     backgroundColor: "#F2F2F2",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   label: { fontWeight: "bold", fontSize: 16 },
//   value: { fontSize: 16, marginBottom: 10 },
//   button: {
//     backgroundColor: "#6B4F27",
//     padding: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   secondary: { alignItems: "center", marginTop: 15 },
//   secondaryText: { color: "#6B4F27" },
// });
