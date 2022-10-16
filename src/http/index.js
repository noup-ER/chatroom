import axios from "axios"

const http = axios.create({
    baseURL:"http://localhost:3032"
})

http.interceptors.request.use((config)=>{
    return config
},err=>{
    ElMessage({type:"error",message:"发生了请求错误"})
    return Promise.reject(err);
})

http.interceptors.response.use(response=>{
    return response.data;
},err=>{
    ElMessage({type:"error",message:"发生了请求错误"})
    return Promise.reject(err)
})



export default http;