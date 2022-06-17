import axios from "axios";
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus'
// `timeout` 指定请求超时的毫秒数。
// 如果请求时间超过 `timeout` 的值，则请求会被中断
axios.defaults.timeout=5000; //默认为0，永不超时
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
//import.meta.env.ZMKT_HTTP_URL 自动识别开发和生产环境的url前缀
axios.defaults.baseURL=import.meta.env.ZMKT_HTTP_URL;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //每次发送请求判断是否右token如果有则携带上token
    //token保存在localStorage上
    if(localStorage.getItem('token')){
        config.headers.Authorization=`token ${localStorage.getItem('token')}`
    }
    return config;
  }, function (error) {
    console.log(error)
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let errorcontent;
    if(response.data && response.data.code){
      switch (response.data.code) {
        case 200: break;
        case 400: errorcontent = '请求错误(400)'; break;
        case 401: errorcontent = '未授权，请重新登录(401)'; break;
        case 403: errorcontent = '拒绝访问(403)'; break;
        case 404: errorcontent = '请求出错(404)'; break;
        case 408: errorcontent = '请求超时(408)'; break;
        case 500: errorcontent = '服务器错误(500)'; break;
        case 501: errorcontent = '服务未实现(501)'; break;
        case 502: errorcontent = '网络错误(502)'; break;
        case 503: errorcontent = '服务不可用(503)'; break;
        case 504: errorcontent = '网络超时(504)'; break;
        case 505: errorcontent = 'HTTP版本不受支持(505)'; break;
        default: errorcontent = `连接出错(${error.response.status})!`;
      }
      if(response.data.code!==200){
        ElMessage({
          message: errorcontent,
          type: 'error',
          showClose:true
        })
      }
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error && error.response) {
        switch (error.response.status) {
            case 400: error.message = '请求错误(400)'; break;
            case 401: error.message = '未授权，请重新登录(401)'; break;
            case 403: error.message = '拒绝访问(403)'; break;
            case 404: error.message = '请求出错(404)'; break;
            case 408: error.message = '请求超时(408)'; break;
            case 500: error.message = '服务器错误(500)'; break;
            case 501: error.message = '服务未实现(501)'; break;
            case 502: error.message = '网络错误(502)'; break;
            case 503: error.message = '服务不可用(503)'; break;
            case 504: error.message = '网络超时(504)'; break;
            case 505: error.message = 'HTTP版本不受支持(505)'; break;
            default: error.message = `连接出错(${error.response.status})!`;
        }
    } else {
        error.message = '连接服务器失败!'
    }
    ElMessage({
      message: error.message,
      type: 'error',
      showClose:true
    })
    return Promise.reject(error);
  });


export default axios