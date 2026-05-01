// src/services/batches/batches.service.ts
import api from "../api";
import { BatchRequest, Batch } from "./type";

export async function fetchBatches(): Promise<Batch[]> {
  const res = await api.get("/batches");
  return res.data;
}

export async function fetchBatch(id: string): Promise<Batch> {
  const res = await api.get(`/batches/${id}`);
  return res.data;
}

export async function createBatch(payload: BatchRequest): Promise<Batch> {
  const res = await api.post("/batches", payload);
  return res.data;
}

export async function fetchBatchByQr(qr: string) {
  const res = await api.get(`/batches/qr/${qr}`);
  return res.data;
}


