

// src/components/FarmerCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";



export type FarmerCardProps = {
  farmer: {
    id: number;
    name: string;
    phone?: string;
  };
  onPress: () => void;
};

export default function FarmerCard({ farmer, onPress }: FarmerCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{farmer.name}</Text>
      {farmer.phone && <Text style={styles.phone}>{farmer.phone}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#222" },
  phone: { fontSize: 14, color: "#555", marginTop: 4 },
});


// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export type FarmerCardProps = {
//   farmer: {
//     id: number;
//     name: string;
//     phone?: string;
//   };
//   onPress: () => void;
// };

// export default function FarmerCard({ farmer, onPress }: FarmerCardProps) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Text style={styles.name}>{farmer.name}</Text>
//       {farmer.phone && <Text style={styles.phone}>{farmer.phone}</Text>}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 14,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   name: { fontSize: 18, fontWeight: "600" },
//   phone: { fontSize: 14, color: "#555" },
// });
