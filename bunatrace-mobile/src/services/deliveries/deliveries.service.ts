// src/services/delivery.service.ts
import api from "../api";
// // src/services/delivery.service.ts
// import api from "../api";

// ---------------------------------------------------------
// Delivery Payload (matches backend DeliveryRequest.java)
// ---------------------------------------------------------
export interface DeliveryPayload {
  farmerId: string;          // UUID
  farmId: string;            // UUID
  stationId: string;         // UUID
  cherryKg: number;          // renamed from kg
  receiptNumber: string;     // renamed from receipt
  photo?: string;            // optional Base64 or URL
}

// ---------------------------------------------------------
// SUBMIT DELIVERY
// ---------------------------------------------------------
export async function submitDelivery(data: DeliveryPayload) {
  try {
    console.log("Submitting delivery:", data);

    const response = await api.post("/deliveries", data);
    return response.data;
  } catch (error: any) {
    console.error("Delivery submit error:", error.response?.data || error);
    throw error;
  }
}

export type Delivery = {
  id: string;
  receiptNumber: string;
  cherryKg: number;
  deliveryTime: string;
  farmerName?: string;
  farmName?: string;
};

// export async function fetchDeliveriesByStation(stationId: string) {
//   // backend example: GET /api/deliveries/station/{stationId}
//   const res = await api.get(`/deliveries/station/${stationId}`);
//   return res.data as Delivery[];
// }
export async function fetchDeliveriesByStation(stationId: string) {
  try {
    const res = await api.get(`/deliveries/station/${stationId}`);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return []; // <-- NO DELIVERIES YET
    }
    throw err;
  }
}


// ---------------------------------------------------------
// GET DELIVERY BY ID
// ---------------------------------------------------------
export async function getDelivery(id: string) {   // UUID, not number
  try {
    const response = await api.get(`/deliveries/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Get delivery error:", error.response?.data || error);
    throw error;
  }
}

// ---------------------------------------------------------
// GET ALL DELIVERIES
// ---------------------------------------------------------
export async function getAllDeliveries() {
  try {
    const response = await api.get("/deliveries");
    return response.data;
  } catch (error: any) {
    console.error("Get all deliveries error:", error.response?.data || error);
    throw error;
  }
}

export default {
  submitDelivery,
  getDelivery,
  getAllDeliveries,
};


// TYPE (optional)
// export interface DeliveryPayload {
//   farmerId: number;
//   farmId: number;
//   stationId: number;
//   kg: number;
//   receipt: string;
//   photo?: string;   // Base64 or URL
// }
// export interface DeliveryPayload {
//   farmerId: string;     // UUID
//   farmId: string;
//   stationId: string;
//   cherryKg: number;     // FIXED
//   receiptNumber: string; // FIXED
//   photo?: string;
// }

// // ---------------------------------------------------------
// // SUBMIT DELIVERY
// // ---------------------------------------------------------
// export async function submitDelivery(data: DeliveryPayload) {
//   try {
//     const response = await api.post("/deliveries", data);
//     return response.data;
//   } catch (error: any) {
//     console.error("Delivery submit error:", error.response?.data || error);
//     throw error;
//   }
// }

// // ---------------------------------------------------------
// // GET DELIVERY BY ID
// // ---------------------------------------------------------
// export async function getDelivery(id: number) {
//   try {
//     const response = await api.get(`/deliveries/${id}`);
//     return response.data;
//   } catch (error: any) {
//     console.error("Get delivery error:", error.response?.data || error);
//     throw error;
//   }
// }

// // ---------------------------------------------------------
// // GET ALL DELIVERIES
// // ---------------------------------------------------------
// export async function getAllDeliveries() {
//   try {
//     const response = await api.get("/deliveries");
//     return response.data;
//   } catch (error: any) {
//     console.error("Get all deliveries error:", error.response?.data || error);
//     throw error;
//   }
// }

// export default {
//   submitDelivery,
//   getDelivery,
//   getAllDeliveries,
// };
