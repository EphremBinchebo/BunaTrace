
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function A_FarmerListScreen({ navigation }: any) {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFarmers();
  }, []);

  const loadFarmers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Not Authenticated", "Please login again.");
        navigation.replace("Login");
        return;
      }

      const res = await fetch("https://nonconjunctively-untethering-bell.ngrok-free.dev/api/actors?type=FARMER", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load farmers");

      const json = await res.json();
      setFarmers(json);
      setFiltered(json);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not load farmers");
    }

    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setFiltered(farmers);
      return;
    }

    setFiltered(
      farmers.filter((f) =>
        f.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("A_FarmerProfileScreen", {
          farmer: item,
          farmerId: item.id,  // 🔥 FIXED
        })
      }
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.sub}>{item.woreda}, {item.region}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmers</Text>

      <TextInput
        style={styles.search}
        placeholder="Search farmer..."
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#5e3a1e" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("A_FarmerRegisterScreen")}
      >
        <Text style={styles.addText}>+ Add Farmer</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("A_DashboardScreen")}
      >
        <Text style={styles.addText}>+ Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#333" },
  search: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  sub: { color: "#777", marginTop: 3 },
  addBtn: {
    backgroundColor: "#5e3a1e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function A_FarmerListScreen({ navigation }: any) {
//   const [farmers, setFarmers] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     loadFarmers();
//   }, []);

//   const loadFarmers = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Not Authenticated", "Please login again.");
//         navigation.replace("Login");
//         return;
//       }

//       // const res = await fetch("http://10.0.2.2:8080/api/farmers"
//        const res = await fetch("http://10.0.2.2:8080/api/actors?type=FARMER", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to load farmers");

//       const json = await res.json();
//       setFarmers(json);
//       setFiltered(json);
//     } catch (e) {
//       console.log(e);
//       Alert.alert("Error", "Could not load farmers");
//     }

//     setLoading(false);
//   };

//   const handleSearch = (text: string) => {
//     setSearch(text);
//     if (text.trim() === "") {
//       setFiltered(farmers);
//     } else {
//       setFiltered(
//         farmers.filter((f) =>
//           f.name.toLowerCase().includes(text.toLowerCase())
//         )
//       );
//     }
//   };

//   const renderItem = ({ item }: any) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate("A_FarmerProfileScreen", { farmer: item })}
//     >
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.sub}>{item.woreda}, {item.region}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmers</Text>

//       <TextInput
//         style={styles.search}
//         placeholder="Search farmer..."
//         value={search}
//         onChangeText={handleSearch}
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#5e3a1e" />
//       ) : (
//         <FlatList
//           data={filtered}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 30 }}
//         />
//       )}
      
//       <TouchableOpacity
//         style={styles.addBtn}
//         onPress={() => navigation.navigate("FarmerRegister")}
//       >
//         <Text style={styles.addText}>+ Add Farmer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#333",
//   },
//   search: {
//     backgroundColor: "#f2f2f2",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   card: {
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   sub: {
//     color: "#777",
//     marginTop: 3,
//   },
//   addBtn: {
//     backgroundColor: "#5e3a1e",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   addText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// // src/screens/A_FarmerListScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import farmerService from "../services/farmers/farmers.service";
// import FarmerCard from "../components/FarmerCard";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/RootNavigator";





// export default function A_FarmerListScreen() {
//   const navigation = useNavigation<NavProp>();
//   const [farmers, setFarmers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   type NavProp = NativeStackNavigationProp<RootStackParamList, "FarmerList">;
//   useEffect(() => {
//     loadFarmers();
//   }, []);

//   const loadFarmers = async () => {
//     try {
//       const data = await farmerService.getAll("/farmers");
//       setFarmers(data);
//     } catch (e) {
//       console.log("Failed fetching farmers", e);
//     }
//     setLoading(false);
//   };

//   const goToRegister = () => navigation.navigate("FarmerRegister" as never);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmers</Text>

//       <TouchableOpacity style={styles.addButton} onPress={goToRegister}>
//         <Text style={styles.addText}>+ Register Farmer</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Dashboard")}>
//         <Text style={styles.addText}>Go to Dashboard</Text>
//         </TouchableOpacity>

//       {loading ? (
//         <ActivityIndicator size="large" color={colors.primary} />
//       ) : (
//         <FlatList
//           data={farmers}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <FarmerCard
//               farmer={item}
//                onPress={() =>
//                 navigation.navigate("FarmerProfile", { farmerId: item.id })
//               }
//             />
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: spacing.lg, backgroundColor: "#fff" },
//   title: { fontSize: 28, fontWeight: "bold", marginBottom: spacing.md },
//   addButton: {
//     backgroundColor: colors.primary,
//     padding: spacing.md,
//     borderRadius: 10,
//     marginBottom: spacing.md,
//   },
//   addText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
// });