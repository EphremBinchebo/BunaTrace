

// RootNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// AUTH
import LoginScreen from "../screens/A_LoginScreen";
import ForgotPasswordScreen from "../screens/A_ForgotPasswordScreen";
import ResetOTPScreen from "../screens/A_ResetOTPScreen";

// DASHBOARD
import A_DashboardScreen from "../screens/A_DashboardScreen";

// FARMERS
import A_FarmerListScreen from "../screens/A_FarmerListScreen";
import A_FarmerSearchScreen from "../screens/A_FarmerSearchScreen";
import A_FarmerRegisterScreen from "../screens/A_FarmerRegisterScreen";
import A_FarmerProfileScreen from "../screens/A_FarmerProfileScreen";
import A_FarmerSavedSuccessScreen from "../screens/A_FarmerSavedSuccessScreen";

// FARMS
import A_FarmListScreen from "../screens/A_FarmListScreen";
import A_FarmAddScreen from "../screens/A_FarmAddScreen";
import A_FarmDetailScreen from "../screens/A_FarmDetailScreen";
import FarmGPSCaptureScreen from "../screens/A_FarmGPSCaptureScreen";
import FarmPolygonMappingScreen from "../screens/A_FarmPolygonMappingScreen";
import FarmSavedSuccessScreen from "../screens/A_FarmSavedSuccessScreen";

// DELIVERY
import DeliveryChooseFarmerScreen from "../screens/A_DeliveryChooseFarmerScreen";
import A_DeliveryChooseFarmScreen from "../screens/A_DeliveryChooseFarmScreen";
import A_DeliveryChooseStationScreen from "../screens/A_DeliveryChooseStationScreen";
import A_DeliveryEntryScreen from "../screens/A_DeliveryEntryScreen";
import A_DeliveryUploadPhotoScreen from "../screens/A_DeliveryUploadPhotoScreen";
import A_DeliveryConfirmScreen from "../screens/A_DeliveryConfirmScreen";

//Batch
// import A_BatchCreateProcessingScreen from "../screens/A_BatchCreateProcessingScreen";
import A_BatchListScreen from "../screens/A_BatchListScreen";
import A_BatchDetailScreen from "../screens/A_BatchDetailScreen";
import A_BatchCreateScreen from "../screens/A_BatchCreateScreen";

//QRCode
import A_QRScannerScreen from "../screens/A_QRScannerScreen";

import A_StationCreateScreen from "../screens/A_StationCreateScreen";

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetOTP: undefined;

  A_DashboardScreen: undefined;
  A_BatchCreateProcessingScreen: undefined;

  A_FarmerListScreen: undefined;
  A_FarmerSearchScreen: undefined;
  A_FarmerRegisterScreen: undefined;

  A_FarmerProfileScreen: { farmer: any };
  A_FarmerSavedSuccessScreen: undefined;

  A_FarmListScreen: { farmerId: string; farmer: any };
  A_FarmAddScreen: { farmerId: string; farmer: any };
  A_FarmDetailScreen: { farmId: string };

  FarmGPS: { farmId: string };
  FarmPolygon: { farmId: string };
  FarmSaved: undefined;

  A_DeliveryChooseFarmerScreen: undefined;
  A_DeliveryChooseFarmScreen: { farmerId: string };
  A_DeliveryChooseStationScreen: { farmId: string };
  A_DeliveryEntryScreen: { stationId: string };
  A_DeliveryUploadPhotoScreen: { deliveryId: string };
  A_DeliveryConfirmScreen: { deliveryId: string };

  A_BatchListScreen: { deliveryId: string };
  A_BatchDetailScreen: { deliveryId: string };
  A_BatchCreateScreen: { deliveryId: string };

  A_QRScannerScreen: undefined;
  A_StationCreateScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* AUTH */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetOTP" component={ResetOTPScreen} />

        {/* MAIN */}
        <Stack.Screen name="A_DashboardScreen" component={A_DashboardScreen} />
        {/* <Stack.Screen name="A_BatchCreateProcessingScreen" component={A_BatchCreateProcessingScreen} */}


        {/* FARMERS */}
        <Stack.Screen name="A_FarmerListScreen" component={A_FarmerListScreen} />
        <Stack.Screen name="A_FarmerSearchScreen" component={A_FarmerSearchScreen} />
        <Stack.Screen name="A_FarmerRegisterScreen" component={A_FarmerRegisterScreen} />
        <Stack.Screen name="A_FarmerProfileScreen" component={A_FarmerProfileScreen} />
        <Stack.Screen name="A_FarmerSavedSuccessScreen" component={A_FarmerSavedSuccessScreen} />

        {/* FARMS */}
        <Stack.Screen name="A_FarmListScreen" component={A_FarmListScreen} />
        <Stack.Screen name="A_FarmAddScreen" component={A_FarmAddScreen} />
        <Stack.Screen name="A_FarmDetailScreen" component={A_FarmDetailScreen} />
        <Stack.Screen name="FarmGPS" component={FarmGPSCaptureScreen} />
        <Stack.Screen name="FarmPolygon" component={FarmPolygonMappingScreen} />
        <Stack.Screen name="FarmSaved" component={FarmSavedSuccessScreen} />

        {/* DELIVERY */}
        <Stack.Screen name="A_DeliveryChooseFarmerScreen" component={DeliveryChooseFarmerScreen} />
        <Stack.Screen name="A_DeliveryChooseFarmScreen" component={A_DeliveryChooseFarmScreen} />
        <Stack.Screen name="A_DeliveryChooseStationScreen" component={A_DeliveryChooseStationScreen} />
        <Stack.Screen name="A_DeliveryEntryScreen" component={A_DeliveryEntryScreen} />
        <Stack.Screen name="A_DeliveryUploadPhotoScreen" component={A_DeliveryUploadPhotoScreen} />
        <Stack.Screen name="A_DeliveryConfirmScreen" component={A_DeliveryConfirmScreen} />

        {/* Batch */}
        <Stack.Screen name="A_BatchListScreen" component={A_BatchListScreen} />
        {/* <Stack.Screen name="A_BatchDetailScreen" component={A_BatchDetailScreen} /> */}
        <Stack.Screen name="A_BatchCreateScreen" component={A_BatchCreateScreen} />
        <Stack.Screen name="A_QRScannerScreen" component={A_QRScannerScreen} />

        <Stack.Screen name="A_BatchDetailScreen" component={A_BatchDetailScreen} />
        <Stack.Screen name="A_StationCreateScreen" component={A_StationCreateScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
