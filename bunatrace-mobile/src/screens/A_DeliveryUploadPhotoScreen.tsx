// src/screens/A_DeliveryUploadPhotoScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function A_DeliveryUploadPhotoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [hasPhoto, setHasPhoto] = useState(false);

  const params = route.params || {};

  const handleTakePhoto = () => {
    // later integrate camera or image picker
    Alert.alert("Photo capture", "Camera integration coming soon.");
    setHasPhoto(true);
  };

  const handleNext = () => {
    navigation.navigate("A_DeliveryConfirmScreen", {
      ...params,
      hasPhoto,
      // photo: someUriWhenImplemented
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Delivery Photo</Text>
      <Text style={styles.subtitle}>
        Capture the cherry delivery as proof at the washing station.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Delivery Photo</Text>
        <Text style={styles.cardText}>
          Take a photo of the cherry bags and farmer at the station.
        </Text>

        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Text style={styles.cameraText}>
            {hasPhoto ? "Retake Photo (stub)" : "Take Photo (stub)"}
          </Text>
        </TouchableOpacity>

        {hasPhoto && (
          <Text style={styles.photoInfo}>✅ Photo selected (placeholder)</Text>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryText}>Next: Confirm Delivery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#333" },
  cardText: { fontSize: 14, color: "#555", marginBottom: 16 },
  cameraButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cameraText: { color: "#FFF", fontWeight: "600" },
  photoInfo: {
    marginTop: 10,
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    alignItems: "center",
    gap: 10,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryText: { color: "#1B5E20", fontWeight: "600" },
  primaryButton: {
    flex: 1,
    backgroundColor: "#1B5E20",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
});

// // src/screens/A_DeliveryUploadPhotoScreen.tsx
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function A_DeliveryUploadPhotoScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const params = route.params || {};

//   const [photoUri, setPhotoUri] = useState<string | null>(null);

//   const handleTakePhoto = async () => {
//     // Ask for permissions
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission required", "Camera access is needed.");
//       return;
//     }

//     // Launch camera
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setPhotoUri(result.assets[0].uri);
//     }
//   };

//   const handleNext = () => {
//     navigation.navigate("A_DeliveryConfirmScreen", {
//       ...params,
//       photo: photoUri,
//       hasPhoto: !!photoUri,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Upload Delivery Photo</Text>
//       <Text style={styles.subtitle}>
//         Capture the cherry delivery as proof at the washing station.
//       </Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Delivery Photo</Text>
//         <Text style={styles.cardText}>
//           Take a photo of the cherry bags and farmer at the station.
//         </Text>

//         {!photoUri ? (
//           <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
//             <Text style={styles.cameraText}>Take Photo</Text>
//           </TouchableOpacity>
//         ) : (
//           <>
//             <Image source={{ uri: photoUri }} style={styles.previewImage} />

//             <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
//               <Text style={styles.cameraText}>Retake Photo</Text>
//             </TouchableOpacity>

//             <Text style={styles.photoInfo}>✅ Photo captured</Text>
//           </>
//         )}
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.secondaryText}>Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.primaryButton,
//             !photoUri && { backgroundColor: "#9E9E9E" },
//           ]}
//           disabled={!photoUri}
//           onPress={handleNext}
//         >
//           <Text style={styles.primaryText}>Next: Confirm Delivery</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
//   title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
//   subtitle: {
//     fontSize: 14,
//     color: "#444",
//     marginTop: 4,
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     padding: 16,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
//   cardText: { fontSize: 14, color: "#555", marginBottom: 16 },
//   cameraButton: {
//     backgroundColor: "#1B5E20",
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   cameraText: { color: "#FFF", fontWeight: "600" },
//   previewImage: {
//     width: "100%",
//     height: 240,
//     borderRadius: 12,
//     marginBottom: 14,
//   },
//   photoInfo: {
//     marginTop: 8,
//     fontSize: 13,
//     color: "#2E7D32",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 24,
//     alignItems: "center",
//     gap: 10,
//   },
//   secondaryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   secondaryText: { color: "#1B5E20", fontWeight: "600" },
//   primaryButton: {
//     flex: 1,
//     backgroundColor: "#1B5E20",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   primaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
// });


// // src/screens/A_DeliveryUploadPhotoScreen.tsx
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function A_DeliveryUploadPhotoScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const [hasPhoto, setHasPhoto] = useState(false);

//   const params = route.params || {};

//   const handleTakePhoto = () => {
//     // Later we integrate expo-image-picker / camera
//     Alert.alert("Photo capture", "Camera integration coming soon.");
//     setHasPhoto(true);
//   };

//   const handleNext = () => {
//     navigation.navigate("A_DeliveryConfirmScreen", {
//       ...params,
//       hasPhoto,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Upload Delivery Photo</Text>
//       <Text style={styles.subtitle}>
//         Capture the cherry delivery as proof at the washing station.
//       </Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Delivery Photo</Text>
//         <Text style={styles.cardText}>
//           Take a photo of the cherry bags and farmer at the station.
//         </Text>

//         <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
//           <Text style={styles.cameraText}>
//             {hasPhoto ? "Retake Photo (stub)" : "Take Photo (stub)"}
//           </Text>
//         </TouchableOpacity>

//         {hasPhoto && (
//           <Text style={styles.photoInfo}>✅ Photo selected (placeholder)</Text>
//         )}
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.secondaryText}>Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
//           <Text style={styles.primaryText}>Next: Confirm Delivery</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
//   title: { fontSize: 24, fontWeight: "700", color: "#1B5E20" },
//   subtitle: {
//     fontSize: 14,
//     color: "#444",
//     marginTop: 4,
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     padding: 16,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#333" },
//   cardText: { fontSize: 14, color: "#555", marginBottom: 16 },
//   cameraButton: {
//     backgroundColor: "#1B5E20",
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   cameraText: { color: "#FFF", fontWeight: "600" },
//   photoInfo: {
//     marginTop: 10,
//     fontSize: 13,
//     color: "#2E7D32",
//     fontWeight: "600",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 24,
//     alignItems: "center",
//     gap: 10,
//   },
//   secondaryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   secondaryText: { color: "#1B5E20", fontWeight: "600" },
//   primaryButton: {
//     flex: 1,
//     backgroundColor: "#1B5E20",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   primaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
// });
