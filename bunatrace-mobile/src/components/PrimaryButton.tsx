// // src/components/PrimaryButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";

type PrimaryButtonProps = {
  label?: string;                  // ✅ optional label
  children?: React.ReactNode;      // existing support
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function PrimaryButton({
  label,
  children,
  onPress,
  style,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.label, textStyle]}>
        {label ?? children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#2E7D32",
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 6,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// import React from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";

// interface PrimaryButtonProps {
//   label: string;
//   onPress: () => void | Promise<void>;
// }

// export default function PrimaryButton({
//   label,
//   onPress,
// }: PrimaryButtonProps) {
//   return (
//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Text style={styles.text}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#2F5D3A",
//     height: 52,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 16,
//   },
//   text: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//     letterSpacing: 1,
//   },
// });


// import React from "react";
// import {
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   GestureResponderEvent,
//   ViewStyle,
//   TextStyle,

// } from "react-native";

// type PrimaryButtonProps = {
//   label: string;
//   children: React.ReactNode;        // Button text
//   onPress: (event: GestureResponderEvent) => void;
//   style?: ViewStyle;                // Allow custom background styles
//   textStyle?: TextStyle;    
          
// };

// export default function PrimaryButton({
//   //   label,
//   children,
//   onPress,
//   style,
//   textStyle,
// }: PrimaryButtonProps) {
//   return (
//     <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
//       <Text style={[styles.label, textStyle]}>{children}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width: "100%",
//     paddingVertical: 14,
//     backgroundColor: "#2E7D32",
//     borderRadius: 6,
//     alignItems: "center",
//     marginVertical: 6,
//   },
//   label: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });


// import React from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import colors from "../theme/colors";
// import spacing from "../theme/spacing";

// type PrimaryButtonProps = {
//   label: string;
//   onPress: () => void;
//   style?: object;
// };

// export default function PrimaryButton({label, onPress, style }: PrimaryButtonProps) {
//   return (
//     <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
//       <Text style={styles.label}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: colors.primary,
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.xl,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: spacing.md,
//   },
//   label: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   }
// });
