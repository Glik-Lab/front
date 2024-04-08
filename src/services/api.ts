//import cookieCutter from 'cookie-cutter'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/',
  //  headers: {
  //   'Authorization': `Bearer ${cookieCutter.get("token")}`
  // }
})

// api.interceptors.request.use((request) => {
//   const token = cookieCutter.get("token");
//   if (token) {
//       request.headers['Authorization'] = `Bearer ${token}`
//   }
//   return request;
// });
