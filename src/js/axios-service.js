import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

service.interceptors.response.use(
  response => {
    const {data: res, status} = response;
    let message;

    return new Promise((resolve, reject) => {
      if (res.code != 1) {
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
    let{status} = error.response;
    let message;
    console.log()
    if (status == 404) {
      message = '请求找不到';
    } else 
    if (status == 401) {
      window.location.hash = 'login';
      message = '未登陆授权';
    } 
    else if (status == 500 || status == 503) {
      message = '服务器错误';
    } 
    console.error({ message })
    return Promise.reject(error);
  }
)

export default service
