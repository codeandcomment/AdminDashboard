import axios from 'axios';

const api = axios.create({baseURL:'http://localhost:3002/api/v1'});

api.interceptors.request.use(
    (config)=>{

        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    }
)

api.interceptors.response.use(
    (response) => response, // Return response if it's successful
    async (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Token expired, trying to refresh...");
  
        try {
          // Request a new access token using the refresh token
          const refreshToken = localStorage.getItem("refreshToken");
          const res = await axios.post("http://localhost:3002/api/v1/refresh", {
            refreshToken,
          });
  
          const newAccessToken = res.data.accessToken;
  
          // Store the new token
          localStorage.setItem("accessToken", newAccessToken);
  
          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error("Refresh token expired, logging out...");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

export default api;