// src/screens/A_FarmerSavedSuccessScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import spacing from "../theme/spacing";
import colors from "../theme/colors";

export default function A_FarmerSavedSuccessScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Registered Successfully 🎉</Text>

      {/* FIXED BUTTON — PrimaryButton uses children */}

      <PrimaryButton onPress={() => navigation.navigate("A_DashboardScreen")}>
        Go to Dashboard
      </PrimaryButton>

      <PrimaryButton
        onPress={() => navigation.navigate("A_FarmerListScreen")}
        style={{ backgroundColor: colors.secondary }}
      >
        Register Another Farmer
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: spacing.md,
    textAlign: "center",
    color: colors.textDark,
  },
});


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import spacing from "../theme/spacing";
// import colors from "../theme/colors";

// export default function A_FarmerSavedSuccessScreen({ navigation }: any) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmer Registered Successfully 🎉</Text>

//       <PrimaryButton label="Go to Dashboard"
//          onPress={() => navigation.navigate("Dashboard")}
//       />

//       <PrimaryButton
//         label="Register Another Farmer"
//         onPress={() => navigation.navigate("A_FarmerListScreen")}
//         style={{ backgroundColor: colors.secondary }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: spacing.lg,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: spacing.xs,
//     textAlign: "center",
//     color: colors.textDark,
//   },
// });
