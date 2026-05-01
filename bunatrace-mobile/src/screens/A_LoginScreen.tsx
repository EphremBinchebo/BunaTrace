import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function A_LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing Fields", "Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://nonconjunctively-untethering-bell.ngrok-free.dev/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", json.token);
        navigation.replace("A_DashboardScreen");
      } else {
        Alert.alert("Login Failed", json.message || "Invalid credentials");
      }
    } catch {
      Alert.alert("Network Error", "Cannot connect to backend.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* LOGO / TITLE */}
        <Text style={styles.logoTop}>BunaTrace</Text>

        {/* INPUTS */}
        <TextInput
          style={styles.input}
          placeholder="Login"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        {/* FORGOT */}
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  logoTop: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2F5D3A",
    textAlign: "center",
    letterSpacing: 1,
  },

  logoBottom: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2F5D3A",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1,
  },

  input: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },

  loginBtn: {
    backgroundColor: "#2F5D3A",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },

  forgotBtn: {
    marginTop: 18,
    alignItems: "center",
  },

  forgotText: {
    color: "#333",
    fontSize: 14,
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function A_LoginScreen({ navigation }: any) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert("Missing Fields", "Please enter username and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://10.0.2.2:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const json = await response.json();

//       if (response.ok) {
        
//         await AsyncStorage.setItem("token", json.token);
//         navigation.replace("A_DashboardScreen");
//       } else {
//         Alert.alert("Login Failed", json.message || "Invalid credentials");
//       }
//     } catch (error) {
//       Alert.alert("Network Error", "Cannot connect to backend.");
//     }

//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>BunaTrace</Text>
//       <Text style={styles.subtitle}>Login to your account</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="#999"
//         autoCapitalize="none"
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.loginText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => navigation.navigate("ForgotPassword")}
//         style={{ marginTop: 16 }}
//       >
//         <Text style={{ color: "#6b4f27" }}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 30, justifyContent: "center", backgroundColor: "#fff" },
//   title: { fontSize: 34, fontWeight: "bold", marginBottom: 10, color: "#2d2d2d" },
//   subtitle: { fontSize: 16, color: "#777", marginBottom: 40 },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: "#f2f2f2",
//   },
//   loginBtn: {
//     backgroundColor: "#5e3a1e",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   loginText: { color: "#fff", fontSize: 17, fontWeight: "600" },
// });
