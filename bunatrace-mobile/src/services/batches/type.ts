// src/services/batches/types.ts
export interface Batch {
  id: string;
  batchCode: string;
  stationName: string;
  processType: string;
  fermentationStart: string;
  fermentationEnd: string;
  dryingStart: string;
  dryingEnd: string;
  totalCherryKg: number;
  parchmentKg: number;
  status: string;
}

export interface BatchRequest {
  stationId: string;
  processType: string;
  totalCherryKg: number;
}
