import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
})

service.interceptors.response.use(
  response => {
    const {data: res, status} = response;
    let message;
    console.log(response);
    return new Promise((resolve, reject) => {
      if (status == 404) {
        message = res.message || '请求找不到';
      } else if (status == 500 || status == 503) {
        message = res.message || '服务器错误';
      } else if (res.code != 1) {
        message = res.message || res.errorMessage || '未知异常'
      } 
      res.ok = res.code === 1;
      if(message != undefined) {
        resolve(message);
      } else {
        resolve(res);
      }
    });
  },
  error => {
    console.error({ message: error.message })
    return Promise.reject(error.message)
  }
)

export default service
