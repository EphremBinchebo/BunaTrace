 // src/services/farmers/farmers.service.ts
import api from "../api";

export type Farmer = {
  id: string;
  name: string;
  phone?: string;
  region?: string;
  zone?: string;
  woreda?: string;
  kebele?: string;
};

const farmerService = {
  async getAll() {
    const res = await api.get("/farmers");
    return res.data;
  },

  async search(query: string) {
    const res = await api.get(`/farmers/search?q=${query}`);
    return res.data;
  },

  async getById(id: string) {
    const res = await api.get(`/farmers/${id}`);
    return res.data;
  },

  async create(payload: any) {
    const res = await api.post("/farmers", payload);
    return res.data;
  },
};

export default farmerService;


// // src/services/farmers/farmers.service.ts
// import api from "../api";

// export type Farmer = {
//   id: string;
//   name: string;
//   gender?: string;
//   age?: number;
//   phone?: string;
//   region?: string;
//   zone?: string;
//   woreda?: string;
//   kebele?: string;
// };

// const farmerService = {
//   // ----------------------------------------------------
//   // GET ALL FARMERS
//   // ----------------------------------------------------
//   async getAll(token: string) {
//     const res = await api.get("/farmers", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   },

//   // ----------------------------------------------------
//   // SEARCH FARMERS
//   // ----------------------------------------------------
//   async search(query: string, token: string) {
//     const res = await api.get(`/farmers/search?q=${query}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   },

//   // ----------------------------------------------------
//   // GET FARMER BY ID
//   // ----------------------------------------------------
//   async getById(id: string, token: string) {
//     const res = await api.get(`/farmers/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   },

//   // ----------------------------------------------------
//   // CREATE FARMER (REGISTER)
//   // ----------------------------------------------------
//   async create(data: any, token: string) {
//     const res = await api.post("/farmers", data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   },
// };

// export default farmerService;
