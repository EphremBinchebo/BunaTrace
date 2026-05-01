// src/mock/mock.const.ts

export type Farmer = {
  id: string;
  name: string;
  region: string;
};

export type Farm = {
  id: string;
  name: string;
  kebele: string;
  elevation: number;
};

export type Station = {
  id: string;
  name: string;
  location: string;
};

// ----------------------------------------------
// MOCK FARMERS (With VALID UUIDs)
// ----------------------------------------------
export const MOCK_FARMERS: Farmer[] = [
  {
    id: "9d3e5a2a-5625-47e6-9e18-0dd0b6428001",
    name: "Farmer Abe",
    region: "Guji, Oromia",
  },
  {
    id: "3be4979f-a18a-4f56-b47b-e0b8cd280002",
    name: "Farmer Sara",
    region: "Sidama, SNNPR",
  },
];

// ----------------------------------------------
// MOCK FARMS (With VALID UUIDs)
// ----------------------------------------------
export const MOCK_FARMS: Farm[] = [
  {
    id: "f6820b81-02bb-45ec-a860-78ab238a1001",
    name: "Abe Farm",
    kebele: "Kebele 03",
    elevation: 1950,
  },
  {
    id: "7261d51e-704d-43ef-9b64-d2c81d0a2002",
    name: "Sara Farm",
    kebele: "Kebele 02",
    elevation: 1850,
  },
];

// ----------------------------------------------
// MOCK STATIONS (With VALID UUIDs)
// ----------------------------------------------
export const MOCK_STATIONS: Station[] = [
  {
    id: "49c911bb-c859-4f8e-aead-cfbc33e10001",
    name: "Hambela Washing Station",
    location: "Guji",
  },
  {
    id: "8f2b0acd-d237-4a52-a02d-99a6f65d0002",
    name: "Yirgacheffe WS",
    location: "Yirgacheffe",
  },
];
