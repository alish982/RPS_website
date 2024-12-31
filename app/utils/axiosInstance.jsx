import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : process.env.NEXT_PUBLIC_RPS_API_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {

           if (config.headers) config.headers.Authorization = `Bearer ` + accessToken
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); 

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance


