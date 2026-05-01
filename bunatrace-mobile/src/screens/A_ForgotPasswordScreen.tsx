import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function A_ForgotPasswordScreen({ navigation }: any) {
  const [username, setUsername] = useState("");

  const handleSendOTP = () => {
    if (!username.trim()) {
      Alert.alert("Missing Username", "Please enter your username.");
      return;
    }

    // Later we will call: POST /api/auth/forgot
    Alert.alert("OTP Sent!", "Check your phone/email for the reset code.");

    navigation.navigate("ResetOTP", { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your username to receive a reset code.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSendOTP}>
        <Text style={styles.btnText}>Send OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------- Styles ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
    color: "#3C2F2F",
  },

  subtitle: {
    color: "#777",
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#6B4F27",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  backBtn: { alignItems: "center", marginTop: 5 },

  backText: {
    color: "#6B4F27",
    fontSize: 15,
  },
});
