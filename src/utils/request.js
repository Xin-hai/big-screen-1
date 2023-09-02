import axios from "axios";

const service = axios.create({
    baseURL: 'https://api.imooc-web.lgdsunday.club/api',
    timeout: 5000
})

// 拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.icode = 'input you icode'
        return config // 必须返回配置
    },
    (error) => {return Promise.reject(error)}
)

export default service