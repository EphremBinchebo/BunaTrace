import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import spacing from "../theme/spacing";
import colors from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function A_FarmerRegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Session expired", "Please login again.");
      navigation.replace("Login");
      return;
    }

    if (!name) {
      Alert.alert("Missing Field", "Name is required.");
      return;
    }

    try {
      const res = await fetch("http://10.0.2.2:8080/api/actors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          type: "FARMER",
          region,
          zone,
          woreda,
          kebele,
          latitude: null,
          longitude: null
        }),
      });

      if (!res.ok) throw new Error("Failed to register farmer");

      navigation.navigate("A_FarmerSavedSuccessScreen");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not register farmer.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register Farmer</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Region" value={region} onChangeText={setRegion} />
      <TextInput style={styles.input} placeholder="Zone" value={zone} onChangeText={setZone} />
      <TextInput style={styles.input} placeholder="Woreda" value={woreda} onChangeText={setWoreda} />
      <TextInput style={styles.input} placeholder="Kebele" value={kebele} onChangeText={setKebele} />

      <PrimaryButton label="Save Farmer" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: colors.textDark,
  },
  input: {
    backgroundColor: "#f4f4f4",
    padding: 14,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
});


// import React, { useState } from "react";
// import { View, Text, TextInput, Alert, StyleSheet, ScrollView } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// export default function A_FarmerRegisterScreen({ navigation }: any) {
//   const [name, setName] = useState("");
//   const [region, setRegion] = useState("");
//   const [zone, setZone] = useState("");
//   const [woreda, setWoreda] = useState("");
//   const [kebele, setKebele] = useState("");

//   const handleRegister = async () => {

//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     const body = {
//       name,
//       type: "FARMER",
//       region,
//       zone,
//       woreda,
//       kebele,
//       latitude: 0.0,
//       longitude: 0.0
//     };

//     try {
//       const res = await fetch("http://10.0.2.2:8080/api/actors", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(body)
//       });

//       if (!res.ok) {
//         console.log(await res.text());
//         throw new Error("Failed");
//       }

//       navigation.navigate("A_FarmerSavedSuccessScreen");

//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Could not register farmer");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Register Farmer</Text>

//       <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />

//       <TextInput style={styles.input} placeholder="Region" value={region} onChangeText={setRegion} />

//       <TextInput style={styles.input} placeholder="Zone" value={zone} onChangeText={setZone} />

//       <TextInput style={styles.input} placeholder="Woreda" value={woreda} onChangeText={setWoreda} />

//       <TextInput style={styles.input} placeholder="Kebele" value={kebele} onChangeText={setKebele} />

//       <PrimaryButton label="Register Farmer" onPress={handleRegister} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: spacing.md },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: spacing.md,
//     color: colors.textDark,
//   },
//   input: {
//     backgroundColor: "#f2f2f2",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: spacing.sm,
//   },
// });


// // src/screens/A_FarmerRegisterScreen.tsx
// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import FormInput from "../components/FormInput";
// import PrimaryButton from "../components/PrimaryButton";
// import { useNavigation } from "@react-navigation/native";

// export default function A_FarmerRegisterScreen() {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     gender: "",
//   });

//   const handleNext = () => {
//     if (!form.name || !form.phone) {
//       Alert.alert("Missing fields", "Enter farmer name and phone.");
//       return;
//     }
//     navigation.navigate("FarmerRegisterExtra" as never, { form } as never);

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register Farmer</Text>

//       <FormInput placeholder="Full Name" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
//       <FormInput placeholder="Phone Number" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} />
//       <FormInput placeholder="Gender" value={form.gender} onChangeText={(v) => setForm({ ...form, gender: v })} />

//       <PrimaryButton title="Next" onPress={handleNext} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
// });
