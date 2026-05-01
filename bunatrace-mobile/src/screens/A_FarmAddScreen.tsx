// src/screens/A_FarmAddScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import spacing from "../theme/spacing";
import farmService from "../services/farms/farm.service";

export default function A_FarmAddScreen({ route, navigation }) {
  const { farmerId } = route.params;

  const [name, setName] = useState("");
  const [areaHa, setAreaHa] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [geoJson, setGeoJson] = useState("");

  const handleCreate = async () => {
    if (!name || !areaHa) {
      Alert.alert("Missing Required Fields", "Name and Area are required.");
      return;
    }

    try {
      await farmService.create({
        farmerId,
        name,
        areaHa: parseFloat(areaHa),
        woreda,
        kebele,
        geomGeoJson: geoJson,
      });

      navigation.goBack();
    } catch (err) {
      console.log("❌ Failed to create farm:", err);
      Alert.alert("Error", "Farm creation failed.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Farm</Text>
       {/* <PrimaryButton onPress={() => navigation.navigate("A_DashboardScreen")}>
              Go to Dashboard
            </PrimaryButton> */}

      <TextInput style={styles.input} placeholder="Farm Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Area (Ha)"
        value={areaHa}
        onChangeText={setAreaHa}
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="Woreda" value={woreda} onChangeText={setWoreda} />
      <TextInput style={styles.input} placeholder="Kebele" value={kebele} onChangeText={setKebele} />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="GeoJSON Polygon"
        multiline
        value={geoJson}
        onChangeText={setGeoJson}
      />

      <PrimaryButton label="Save Farm" onPress={handleCreate} />
       <PrimaryButton onPress={() => navigation.navigate("A_DashboardScreen")}>
              Go to Dashboard
            </PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: spacing.md },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
});


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import farmService from "../services/farms/farm.service";

// export default function A_FarmAddScreen({ route, navigation }) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleCreate = async () => {
//     if (!name || !areaHa) {
//       Alert.alert("Missing fields", "Name and Area are required.");
//       return;
//     }

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         geoJson,
//       });

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Failed to create farm.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Area (Ha)"
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Woreda"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kebele"
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         style={[styles.input, { height: 120 }]}
//         placeholder="GeoJSON"
//         multiline
//         value={geoJson}
//         onChangeText={setGeoJson}
//       />

//       <PrimaryButton label="Save Farm" onPress={handleCreate} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     backgroundColor: "#f4f4f4",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import farmService from "../services/farms/farm.service";

// export default function A_FarmAddScreen({ route, navigation }) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleCreate = async () => {
//     if (!name || !areaHa) {
//       Alert.alert("Missing fields", "Name and Area are required.");
//       return;
//     }

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         geoJson,
//       });

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Failed to create farm.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Area (Ha)"
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Woreda"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kebele"
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         style={[styles.input, { height: 120 }]}
//         placeholder="GeoJSON"
//         multiline
//         value={geoJson}
//         onChangeText={setGeoJson}
//       />

//       <PrimaryButton label="Save Farm" onPress={handleCreate} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     backgroundColor: "#f4f4f4",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import farmService from "../services/farms/farm.service";

// export default function A_FarmAddScreen({ route, navigation }) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleCreate = async () => {
//     if (!name || !areaHa) {
//       Alert.alert("Missing fields", "Name and Area are required.");
//       return;
//     }

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         geoJson,
//       });

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Failed to create farm.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Area (Ha)"
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Woreda"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kebele"
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         style={[styles.input, { height: 120 }]}
//         placeholder="GeoJSON"
//         multiline
//         value={geoJson}
//         onChangeText={setGeoJson}
//       />

//       <PrimaryButton label="Save Farm" onPress={handleCreate} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     backgroundColor: "#f4f4f4",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import farmService from "../services/farms/farm.service";

// export default function A_FarmAddScreen({ route, navigation }) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleCreate = async () => {
//     if (!name || !areaHa) {
//       Alert.alert("Missing fields", "Name and Area are required.");
//       return;
//     }

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         geoJson,
//       });

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Failed to create farm.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Area (Ha)"
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Woreda"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kebele"
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         style={[styles.input, { height: 120 }]}
//         placeholder="GeoJSON"
//         multiline
//         value={geoJson}
//         onChangeText={setGeoJson}
//       />

//       <PrimaryButton label="Save Farm" onPress={handleCreate} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     backgroundColor: "#f4f4f4",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";
// import farmService from "../services/farms/farm.service";

// export default function A_FarmAddScreen({ route, navigation }) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleCreate = async () => {
//     if (!name || !areaHa) {
//       Alert.alert("Missing fields", "Name and Area are required.");
//       return;
//     }

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         geoJson,
//       });

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Failed to create farm.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Area (Ha)"
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Woreda"
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kebele"
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         style={[styles.input, { height: 120 }]}
//         placeholder="GeoJSON"
//         multiline
//         value={geoJson}
//         onChangeText={setGeoJson}
//       />

//       <PrimaryButton label="Save Farm" onPress={handleCreate} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     backgroundColor: "#f4f4f4",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// // A_FarmAddScreen.tsx
// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import farmService from "../services/farms/farm.service";
// import spacing from "../theme/spacing";

// export default function A_FarmAddScreen({ navigation, route }) {
//   const farmerId = route?.params?.farmerId;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [geoJson, setGeoJson] = useState("");

//   const handleSave = async () => {
//     if (!name) return Alert.alert("Name required");

//     try {
//       await farmService.createFarm({
//         farmerId,
//         name,
//         areaHa: Number(areaHa),
//         kebele,
//         woreda,
//         geoJson,
//       });

//       Alert.alert("Success", "Farm saved successfully!");
//       navigation.goBack();
//     } catch (e) {
//       console.log(e);
//       Alert.alert("Error", "Farm could not be saved.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <TextInput
//         placeholder="Farm Name"
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         placeholder="Area (Ha)"
//         style={styles.input}
//         value={areaHa}
//         onChangeText={setAreaHa}
//         keyboardType="numeric"
//       />

//       <TextInput
//         placeholder="Woreda"
//         style={styles.input}
//         value={woreda}
//         onChangeText={setWoreda}
//       />

//       <TextInput
//         placeholder="Kebele"
//         style={styles.input}
//         value={kebele}
//         onChangeText={setKebele}
//       />

//       <TextInput
//         placeholder="GeoJSON (optional)"
//         style={[styles.input, { height: 80 }]}
//         value={geoJson}
//         onChangeText={setGeoJson}
//         multiline
//       />

//       <PrimaryButton label="Save Farm" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: spacing.md,
//   },
//   input: {
//     padding: 14,
//     backgroundColor: "#f4f4f4",
//     borderRadius: 8,
//     marginBottom: spacing.md,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import farmService from "../services/farms/farm.service";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmAddScreen({ navigation, route }: any) {
//   const { farmerId } = route.params;

//   const [name, setName] = useState("");
//   const [areaHa, setAreaHa] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");
//   const [variety, setVariety] = useState("");
//   const [elevationMasl, setElevationMasl] = useState("");
//   const [geomGeoJson, setGeomGeoJson] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");

//   const save = async () => {
//     try {
//       const data = {
//         farmerId,
//         name,
//         areaHa: parseFloat(areaHa),
//         woreda,
//         kebele,
//         variety,
//         elevationMasl: parseInt(elevationMasl),
//         geomGeoJson,
//         photoUrl,
//       };

//       await farmService.createFarm(data);
//       Alert.alert("Success", "Farm Registered!");
//       navigation.navigate("A_FarmListScreen", { farmerId });
//     } catch (e) {
//       console.log(e);
//       Alert.alert("Error", "Could not save farm");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Register New Farm</Text>

//       <TextInput placeholder="Farm Name" style={styles.input} value={name} onChangeText={setName} />
//       <TextInput placeholder="Area (Ha)" style={styles.input} value={areaHa}
//         onChangeText={setAreaHa} keyboardType="numeric" />
//       <TextInput placeholder="Woreda" style={styles.input} value={woreda} onChangeText={setWoreda} />
//       <TextInput placeholder="Kebele" style={styles.input} value={kebele} onChangeText={setKebele} />
//       <TextInput placeholder="Variety" style={styles.input} value={variety} onChangeText={setVariety} />
//       <TextInput placeholder="Elevation (masl)" style={styles.input}
//         value={elevationMasl} onChangeText={setElevationMasl} keyboardType="numeric" />
//       <TextInput placeholder="Farm Polygon (GeoJSON)" style={styles.inputBox}
//         value={geomGeoJson} onChangeText={setGeomGeoJson} multiline />
//       <TextInput placeholder="Photo URL" style={styles.input} value={photoUrl} onChangeText={setPhotoUrl} />

//       <PrimaryButton label="Save Farm" onPress={save} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: spacing.lg, backgroundColor: "#fff", flex: 1 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: spacing.md },
//   input: {
//     backgroundColor: "#F4F4F4",
//     padding: 14,
//     marginBottom: spacing.sm,
//     borderRadius: 10,
//   },
//   inputBox: {
//     height: 120,
//     backgroundColor: "#F4F4F4",
//     padding: 14,
//     marginBottom: spacing.sm,
//     borderRadius: 10,
//   },
// });


// // src/screens/A_FarmAddScreen.tsx
// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import FormInput from "../components/FormInput";
// import PrimaryButton from "../components/PrimaryButton";
// import { useNavigation } from "@react-navigation/native";
// import farmService from "../services/farms/farm.service";

// export default function FarmAddScreen() {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     name: "",
//     areaHa: "",
//     elevation: "",
//   });

//   const handleSave = async () => {
//     if (!form.name) return Alert.alert("Missing", "Farm name is required.");

//     await farmService.createFarm(form);
//     Alert.alert("Success", "Farm added.");
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Farm</Text>

//       <FormInput placeholder="Farm Name" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
//       <FormInput placeholder="Area (ha)" value={form.areaHa} onChangeText={(v) => setForm({ ...form, areaHa: v })} />
//       <FormInput placeholder="Elevation (masl)" value={form.elevation} onChangeText={(v) => setForm({ ...form, elevation: v })} />

//       <PrimaryButton title="Save Farm" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, backgroundColor: "#fff" },
//   title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
// });
