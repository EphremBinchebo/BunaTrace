// src/services/farms/farm.service.ts
import api from "../api";

const farmService = {
  async getFarmsByFarmer(farmerId: string) {
    const res = await api.get(`/farms/farmer/${farmerId}`);
    return res.data;
  },

  async getAll() {
    const res = await api.get("/farms");
    return res.data;
  },

  async getById(farmId: string) {
    const res = await api.get(`/farms/${farmId}`);
    return res.data;
  },

  async create(payload: any) {
    const res = await api.post("/farms", payload);
    return res.data;
  },
};

export default farmService;


// import api from "../api";

// const getFarmsByFarmer = async (farmerId: string) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// const getFarmById = async (farmId: string) => {
//   const res = await api.get(`/farms/${farmId}`);
//   return res.data;
// };

// const createFarm = async (payload: any) => {
//   const res = await api.post(`/farms`, payload);
//   return res.data;
// };

// export default {
//   getFarmsByFarmer,
//   getAllFarms,
//   getFarmById,
//   createFarm,
// };


// import api from "../api";

// const getFarmsByFarmer = async (farmerId: string) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// const getFarmById = async (farmId: string) => {
//   const res = await api.get(`/farms/${farmId}`);
//   return res.data;
// };

// const createFarm = async (payload: any) => {
//   const res = await api.post(`/farms`, payload);
//   return res.data;
// };

// export default {
//   getFarmsByFarmer,
//   getAllFarms,
//   getFarmById,
//   createFarm,
// };


// import api from "../api";

// const getFarmsByFarmer = async (farmerId: string) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// const getFarmById = async (farmId: string) => {
//   const res = await api.get(`/farms/${farmId}`);
//   return res.data;
// };

// const createFarm = async (payload: any) => {
//   const res = await api.post(`/farms`, payload);
//   return res.data;
// };

// export default {
//   getFarmsByFarmer,
//   getAllFarms,
//   getFarmById,
//   createFarm,
// };


// // src/services/farms/farm.service.ts
// import api from "../api";

// const getFarmsByFarmer = async (farmerId: string) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// const createFarm = async (data: any) => {
//   const res = await api.post(`/farms`, data);
//   return res.data;
// };

// const getFarmDetails = async (farmId: string) => {
//   const res = await api.get(`/farms/${farmId}`);
//   return res.data;
// };

// export default {
//   getFarmsByFarmer,
//   getAllFarms,
//   createFarm,
//   getFarmDetails,
// };


// // src/services/farm.service.ts
// import api from "../api";

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// const getFarmsByFarmer = async (farmerId: string) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getFarmDetails = async (farmId: string) => {
//   const res = await api.get(`/farms/${farmId}`);
//   return res.data;
// };

// const createFarm = async (data: any) => {
//   const res = await api.post(`/farms`, data);
//   return res.data;
// };

// export default {
//   getAllFarms,
//   getFarmsByFarmer,
//   getFarmDetails,
//   createFarm,
// };

// // src/services/farm.service.ts
// import { API_URL } from "../api";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const farmService = {
//   getFarms: async () => {
//     const token = await AsyncStorage.getItem("token");

//     const res = await fetch(`${API_URL}/farms`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load farms");
//     return await res.json();
//   },

//   createFarm: async (data: any) => {
//     const token = await AsyncStorage.getItem("token");

//     const res = await fetch(`${API_URL}/farms`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) throw new Error("Failed to create farm");
//     return await res.json();
//   },

//   getFarmsByFarmer: async (farmerId: string) => {
//     const token = await AsyncStorage.getItem("token");

//     const res = await fetch(`${API_URL}/farms/farmer/${farmerId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load farmer farms");
//     return await res.json();
//   },

//   getFarmDetails: async (farmId: string) => {
//     const token = await AsyncStorage.getItem("token");

//     const res = await fetch(`${API_URL}/farms/${farmId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load farm");
//     return await res.json();
//   },
// };

// // export default farmService;

// // // src/services/farm.service.ts
// import api from "../api";

// const getFarmsByFarmer = async (farmerId) => {
//   const res = await api.get(`/farms/farmer/${farmerId}`);
//   return res.data;
// };

// const getAllFarms = async () => {
//   const res = await api.get(`/farms`);
//   return res.data;
// };

// export default {
//   getFarmsByFarmer,
//   getAllFarms
// };
// export type FarmPayload = {
//   name: string;
//   size?: number;
//   farmerId?: number;
//   gpsPoints?: any[];
// };

// const farmService = {
//   // -----------------------------
//   // GET ALL FARMS
//   // -----------------------------
//   async getAll() {
//     const res = await api.get("/farms");
//     return res.data;
//   },

//   // -----------------------------
//   // GET ONE FARM
//   // -----------------------------
//   async get(id: number) {
//     const res = await api.get(`/farms/${id}`);
//     return res.data;
//   },

//   // -----------------------------
//   // CREATE NEW FARM   (✔ FIXED)
//   // -----------------------------
//   async createFarm(data: FarmPayload) {
//     const res = await api.post("/farms", data);
//     return res.data;
//   },

//   // -----------------------------
//   // UPDATE FARM
//   // -----------------------------
//   async update(id: number, data: Partial<FarmPayload>) {
//     const res = await api.put(`/farms/${id}`, data);
//     return res.data;
//   },

//   // -----------------------------
//   // DELETE FARM
//   // -----------------------------
//   async delete(id: number) {
//     const res = await api.delete(`/farms/${id}`);
//     return res.data;
//   }
// };

// export default farmService;
