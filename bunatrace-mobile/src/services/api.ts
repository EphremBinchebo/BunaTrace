//
import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      // ✅ SAFE for Axios v1+
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// src/services/api.ts
// import axios, { InternalAxiosRequestConfig } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "./config";

// //Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });
// // api.interceptors.request.use(
// //   async (config) => {
// //     try {
// //       const token = await AsyncStorage.getItem("token");

// //       // Ensure headers object exists and is correctly typed
// //       config.headers = {
// //         ...(config.headers || {}),
// //       };

// //       if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //       }
// //     } catch (error) {
// //       console.log("JWT attach error:", error);
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );
// // api.interceptors.request.use(
// //   async (config) => {
// //     const token = await AsyncStorage.getItem("token");

// //     // Ensure headers exist & maintain Axios types
// //     if (!config.headers) {
// //       config.headers = {};
// //     }

// //     // Safely assign Authorization header
// //     if (token) {
// //       (config.headers as any).Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");

//   config.headers = {
//     ...(config.headers as any),
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };

//   return config;
// },

//  (error) => Promise.reject(error)
// );

// export default api;

// import axios, { InternalAxiosRequestConfig } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "./config";

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });

// // Add Authorization token to all requests
// api.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       if (!config.headers) {
//         config.headers = {};
//       }

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.log("JWT attach error:", error);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

// // src/services/api.ts
// import axios, { InternalAxiosRequestConfig } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "./config";

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });

// // Add Authorization token to all requests
// api.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       if (!config.headers) {
//         config.headers ={};
//       }

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.log("JWT attach error:", error);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


// // // src/services/api.ts

// // import axios from "axios";
// // import { API_URL } from "./config";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const api = axios.create({
// //   baseURL: API_URL,
// // });

// // api.interceptors.request.use(async (config) => {
// //   try {
// //     const token = await AsyncStorage.getItem("token");

// //     if (!config.headers) {
// //       config.headers = {}; // ensure object exists
// //     }

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   } catch (err) {
// //     console.log("Error reading token", err);
// //     return config;
// //   }
// // });

// import axios from "axios";
// // import { API_URL } from "./config";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const api = axios.create({
// //   baseURL: API_URL,
// // });
// import { AxiosRequestConfig } from "axios";

// api.interceptors.request.use(async (config: AxiosRequestConfig) => {
//   const token = await AsyncStorage.getItem("token");

//   if (token) {
//     config.headers = {
//       ...(config.headers || {}),
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   return config;
// });


// export default api;

// 🔐 Attach JWT automatically
// api.interceptors.request.use(async (config) => {
//   try {
//     const token = await AsyncStorage.getItem("token");

//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//   } catch (err) {
//     console.log("Error reading token", err);
//   }

//   return config;
// });

// export default api;

// // src/services/api.ts
// import axios from "axios";
// import { API_URL } from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Attach JWT automatically
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

// import axios from "axios";
// import { API_URL } from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Automatically attach JWT token
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


// import axios from "axios";
// import { API_URL } from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Automatically attach JWT token
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


// import axios from "axios";
// import { API_URL } from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Automatically attach JWT token
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


// // src/services/api.ts
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const API_URL = "http://10.0.2.2:8080/api"; // <-- WORKS IN ANDROID

// const api = axios.create({
//   baseURL: API_URL,
// });

// // ⬇ Add token to every request automatically
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// // src/services/api.ts
// import axios from "axios";
// import { API_URL } from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Add token automatically for every request
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


// const api = axios.create({
//   baseURL: "http://10.0.2.2:8080/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatically attach JWT token on every request
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

