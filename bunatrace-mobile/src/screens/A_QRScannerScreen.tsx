import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

// ✅ IMPORTANT: update this import to your axios instance path
// Example: import api from "../services/api";
import api from "../services/api"; // <-- change if your file is elsewhere

type Delivery = {
  id: string;
  receiptNumber?: string;
  cherryKg?: number;
  deliveryTime?: string;
  farmerName?: string;
  farmName?: string;
  washingStationName?: string;
  batch?: any; // if exists => already batched
};

export default function A_QRScannerScreen() {
  const navigation: any = useNavigation();

  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [draftDeliveries, setDraftDeliveries] = useState<Delivery[]>([]);
  const [lastScanned, setLastScanned] = useState<string>("");

  // scan lock to avoid multiple fires from camera
  const scanningRef = useRef<boolean>(true);
  const lastScanTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission, requestPermission]);

  const canScan = () => {
    const now = Date.now();
    // throttle scans (700ms)
    if (now - lastScanTimeRef.current < 700) return false;
    lastScanTimeRef.current = now;
    return true;
  };

  const addDeliveryToDraft = (delivery: Delivery) => {
    setDraftDeliveries((prev) => {
      if (prev.some((d) => d.id === delivery.id)) {
        Alert.alert("Duplicate Scan", "This delivery is already added.");
        return prev;
      }
      return [delivery, ...prev];
    });
  };

  const onScan = async (raw: string) => {
    const data = (raw || "").trim();
    if (!data) {
      Alert.alert("Invalid QR", "QR code is empty or unreadable.");
      return;
    }

    // prevent double scanning
    if (!scanningRef.current) return;
    if (!canScan()) return;

    // simple "same code" filter
    if (data === lastScanned) return;
    setLastScanned(data);

    scanningRef.current = false;
    setLoading(true);

    try {
      const res = await api.get(`/deliveries/qr/${encodeURIComponent(data)}`);
      const delivery: Delivery = res.data;

      if (!delivery?.id) {
        Alert.alert("Invalid QR", "This QR does not match a delivery.");
        return;
      }

      if (delivery.batch) {
        Alert.alert("Already Batched", "This delivery is already in a batch.");
        return;
      }

      addDeliveryToDraft(delivery);
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 404) {
        Alert.alert("Invalid QR", "Delivery not found.");
      } else if (status === 401 || status === 403) {
        Alert.alert("Unauthorized", "Please login again.");
      } else if (status === 500) {
        Alert.alert("Server Error", "Backend error. Try again.");
      } else {
        Alert.alert("Network Error", "Cannot reach server. Check connection.");
      }
    } finally {
      setLoading(false);
      // re-enable scanning after a short delay
      setTimeout(() => {
        scanningRef.current = true;
      }, 500);
    }
  };

  const goCreateBatch = () => {
    if (draftDeliveries.length === 0) {
      Alert.alert("No deliveries", "Scan at least 1 delivery to create a batch.");
      return;
    }

    // ✅ navigate to your batch create screen with scanned IDs
    // Change the route name if yours is different:
    navigation.navigate("A_BatchCreateScreen", {
      deliveryIds: draftDeliveries.map((d) => d.id),
    });
  };

  const removeFromDraft = (id: string) => {
    setDraftDeliveries((prev) => prev.filter((d) => d.id !== id));
  };

  const permissionStatus = permission?.granted;

  if (permissionStatus === undefined) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.smallText}>Loading camera permission…</Text>
      </View>
    );
  }

  if (!permissionStatus) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera permission required</Text>
        <Text style={styles.smallText}>
          Enable camera permission to scan QR codes.
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
          <Text style={styles.primaryText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera */}
      <View style={styles.cameraWrap}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"], // scan QR only
          }}
          onBarcodeScanned={({ data }) => onScan(String(data))}
        />

        {/* Overlay */}
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Scan Delivery QR</Text>
          <Text style={styles.overlaySub}>
            Point the camera at the QR on the delivery receipt/tag.
          </Text>

          {loading && (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.loadingText}>Checking QR…</Text>
            </View>
          )}
        </View>
      </View>

      {/* Draft list */}
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Scanned Deliveries</Text>
          <Text style={styles.sheetCount}>{draftDeliveries.length}</Text>
        </View>

        <FlatList
          data={draftDeliveries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 14 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No deliveries scanned yet. Scan a QR to add it here.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.rowCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>
                  {item.receiptNumber ? `Receipt: ${item.receiptNumber}` : item.id}
                </Text>
                <Text style={styles.rowSub}>
                  {item.cherryKg != null ? `Cherry: ${item.cherryKg} KG` : "Cherry: —"}
                  {"  •  "}
                  {item.washingStationName ? `Station: ${item.washingStationName}` : "Station: —"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromDraft(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Action */}
        <TouchableOpacity style={styles.createBatchBtn} onPress={goCreateBatch}>
          <Text style={styles.createBatchText}>Create Batch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GREEN = "#2f5d3a";
const GREEN_DARK = "#234a2e";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },

  cameraWrap: { height: "52%", backgroundColor: "#000" },
  camera: { flex: 1 },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingTop: Platform.OS === "android" ? 42 : 55,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  overlayTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  overlaySub: { color: "rgba(255,255,255,0.9)", marginTop: 6 },

  loadingRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  loadingText: { color: "#fff", marginLeft: 10, fontWeight: "700" },

  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  sheetHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sheetTitle: { fontSize: 18, fontWeight: "800", flex: 1 },
  sheetCount: {
    backgroundColor: "#EAF2EC",
    color: GREEN_DARK,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "800",
  },

  empty: { color: "#777", paddingVertical: 12 },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  rowTitle: { fontWeight: "800", fontSize: 14, marginBottom: 3 },
  rowSub: { color: "#666" },

  removeBtn: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeText: { color: "#444", fontWeight: "700" },

  createBatchBtn: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  createBatchText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  backBtn: {
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F1F1F1",
  },
  backText: { color: "#333", fontWeight: "800" },

  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  smallText: { color: "#666", marginTop: 8, textAlign: "center" },

  primaryBtn: {
    marginTop: 12,
    backgroundColor: GREEN,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  primaryText: { color: "#fff", fontWeight: "900" },
});


// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, requestPermission] = useCameraPermissions();
//   const [locked, setLocked] = useState(false);

//   useEffect(() => {
//     if (!permission) requestPermission();
//   }, [permission]);

//   if (!permission) return <Text>Requesting permission...</Text>;
//   if (!permission.granted) return <Text>No camera access</Text>;

//   const onBarcodeScanned = async ({ data }: { data: string }) => {
//     if (locked) return;
//     setLocked(true);

//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch {
//       alert("Invalid QR / batch not found");
//       setLocked(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <CameraView
//         style={{ flex: 1 }}
//         barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//         onBarcodeScanned={onBarcodeScanned}
//       />
//     </View>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useNavigation } from "@react-navigation/native";
// import { fetchBatchByQr } from "../services/batches/batches.service";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     if (!permission) {
//       requestPermission();
//     }
//   }, []);

//   if (!permission) {
//     return <ActivityIndicator />;
//   }

//   if (!permission.granted) {
//     return <Text>No camera access</Text>;
//   }

//   const handleScan = async ({ data }: { data: string }) => {
//     if (scanned) return;

//     setScanned(true);

//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch {
//       alert("Invalid QR code");
//       setScanned(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <CameraView
//         style={{ flex: 1 }}
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr"],
//         }}
//         onBarcodeScanned={handleScan}
//       />
//     </View>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useNavigation } from "@react-navigation/native";
// import { fetchBatchByQr } from "../services/batches/batches.service";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     if (!permission) {
//       requestPermission();
//     }
//   }, []);

//   if (!permission) {
//     return <ActivityIndicator />;
//   }

//   if (!permission.granted) {
//     return <Text>No camera access</Text>;
//   }

//   const handleScan = async ({ data }: { data: string }) => {
//     if (scanned) return;

//     setScanned(true);

//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch {
//       alert("Invalid QR code");
//       setScanned(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <CameraView
//         style={{ flex: 1 }}
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr"],
//         }}
//         onBarcodeScanned={handleScan}
//       />
//     </View>
//   );
// }

//  import * as React from "react";
//  import { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, setPermission] = useState<boolean | null>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setPermission(status === "granted");
//     })();
//   }, []);

//   if (permission === null)
//     return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

//   if (permission === false)
//     return <Text>No Camera Access</Text>;

//   const handleScan = async ({ data }: any) => {
//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch {
//       alert("Invalid QR code or batch not found");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }


//  import * as React from "react";
//  import { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const handleScan = async ({ data }: any) => {
//     if (scanned) return;
//     setScanned(true);

//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch (e) {
//       alert("Invalid QR or Batch Not Found");
//       setScanned(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={StyleSheet.absoluteFillObject}
//       />
//     </View>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, setPermission] = useState<boolean | null>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setPermission(status === "granted");
//     })();
//   }, []);

//   if (permission === null) return <Text>Requesting permission...</Text>;
//   if (permission === false) return <Text>No access to camera</Text>;

//   const handleScan = async ({ data }: any) => {
//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch (error) {
//       alert("Invalid QR or batch not found");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }


// import * as React from "react";
// import { useEffect, useState } from "react";

// import { View, Text, ActivityIndicator } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, setPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setPermission(status === "granted");
//     })();
//   }, []);

//   if (permission === null)
//     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

//   if (permission === false)
//     return <Text>No access to camera</Text>;

//   const handleScan = async ({ data }) => {
//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch (err) {
//       alert("Invalid QR or batch not found");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, setPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setPermission(status === "granted");
//     })();
//   }, []);

//   if (permission === null)
//     return <Text style={styles.text}>Requesting camera permission…</Text>;

//   if (permission === false)
//     return <Text style={styles.text}>No access to camera</Text>;

//   const handleScan = async ({ data }: any) => {
//     if (scanned) return; // prevent multiple scans
//     setScanned(true);

//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch (err) {
//       alert("❌ Invalid QR or batch not found");
//       setScanned(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={{ flex: 1 }}
//       />

//       {scanned && (
//         <Text style={styles.scanAgain} onPress={() => setScanned(false)}>
//           Tap to scan again
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     marginTop: 100,
//     textAlign: "center",
//     fontSize: 18,
//   },
//   scanAgain: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//     textAlign: "center",
//     fontSize: 18,
//     color: "#fff",
//     backgroundColor: "#0008",
//     padding: 12,
//   },
// });


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { fetchBatchByQr } from "../services/batches/batches.service";
// import { useNavigation } from "@react-navigation/native";
// import QRCodeScanner from "react-native-qrcode-scanner";

// export default function A_QRScannerScreen() {
//   const navigation = useNavigation<any>();
//   const [permission, setPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setPermission(status === "granted");
//     })();
//   }, []);

//   if (permission === null) return <Text>Requesting permission…</Text>;
//   if (permission === false) return <Text>No access to camera</Text>;

//   const handleScan = async ({ data }: any) => {
//     try {
//       const batch = await fetchBatchByQr(data);
//       navigation.navigate("A_BatchDetailScreen", { batchId: batch.id });
//     } catch (err) {
//       alert("Invalid QR or batch not found");
//     }
//   };
  
//   <QRCodeScanner
//   onRead={(e) => console.log(e.data)}
//   reactivate={true}
// />

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={handleScan}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }
