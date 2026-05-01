// src/components/FormInput.tsx
import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
};

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 6,
  },
  input: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    fontSize: 16,
  },
});
