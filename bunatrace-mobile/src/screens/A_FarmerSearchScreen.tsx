import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import spacing from "../theme/spacing";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function A_FarmerSearchScreen({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search farmer..."
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  input: {
    padding: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
});


// // src/screens/A_FarmerSearchScreen.tsx
// import React, { useState } from "react";
// import { View, FlatList, StyleSheet } from "react-native";
// import FormInput from "../components/FormInput";
// import FarmerCard from "../components/FarmerCard";
// import farmerService from "../services/farmers/farmers.service";

// export default function A_FarmerSearchScreen() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);

//   const search = async (text: string) => {
//     setQuery(text);
//     if (text.length < 2) return;
//     const data = await farmerService.searchFarmers(text);
//     setResults(data);
//   };

//   return (
//     <View style={styles.container}>
//       <FormInput placeholder="Search farmers..." value={query} onChangeText={search} />

//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <FarmerCard farmer={item} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
// });
