import axios from "axios";

const axiosClient = axios.create({
    // ${import.meta.env.VITE_API_BASE_URL}
    baseURL: `http://localhost:8000/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axiosClient.interceptors.request.use((response) => {
    return response;
}, (error) => {
    try {
        const {response} = error;
        if(response == 401){
            localStorage.removeItem('ACCES_TOKEN');
        }
    }catch(e){
        console.error(e);
    }

    throw error;
});

export default axiosClient;