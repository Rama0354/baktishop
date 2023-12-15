import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const BASE_URL = process.env.BACKEND_API

export default axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'}
})

export const  axiosAuth = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'}
})


export const axiosAuthServer = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers:{'Content-Type':'application/json'}
});


// Request interceptor
axiosAuthServer.interceptors.request.use(
  async (config) => {
    // return ()=>{
    //     axiosAuth.interceptors.request.eject(requestIntercept)
    // }
    // Modify the request config here (add headers, authentication tokens)
        const session = await getServerSession(options)
        const accessToken = session?.accessToken

        if(!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config

  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
// axiosAuthServer.interceptors.response.use(
//   (response) => {
//     // Modify the response data here

//     return response;
//   },
//   (error) => {
//     // Handle response errors here

//     return Promise.reject(error);
//   }
// );
// // End of Response interceptor