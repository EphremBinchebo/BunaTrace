// src/services/station/station.service.ts

import api from "../api";

// Type returned from backend
export interface Station {
  id: string;
  name: string;
  region?: string;
  zone?: string;
  woreda?: string;
  kebele?: string;
  latitude?: number;
  longitude?: number;
}

// Fetch washing stations
// export const fetchStations = async (): Promise<Station[]> => {
//   try {
//     const res = await api.get("/actors/washing-stations");
//     return res.data;
//   } catch (err) {
//     console.error("❌ Failed to load washing stations:", err);
//     throw err;
//   }

   export async function fetchStations(): Promise<Station[]> {
  // backend: GET /api/actors/stations
  const res = await api.get("/actors/stations");
  return res.data;
}
