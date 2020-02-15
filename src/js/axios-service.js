import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  // baseURL: '',
  withCredentials: false,
})

service.interceptors.response.use(
  response => {
    const res = response.data;
    let message;
    console.log(response);
    console.log(res);
    return new Promise((resolve, reject) => {
      if (res.status == 404) {
        message = res.message || '请求找不到';
      } else if (res.status == 500 || res.status == 503) {
        message = res.message || '服务器错误';
      } else if (res.code != 0) {
        message = res.message || res.errorMessage || '未知异常'
      } 
      res.ok = res.code === 1;
      if(message != undefined) {
        resolve(message);
        console.error({ message })
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
