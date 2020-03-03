import Axios from 'axios';
import store from '../store';
import router from '../router';
import { locationCityCache } from '@/assets/js/cache';
import { Toast } from 'vant';

/**
 * 数据请求 | 封装 axios
 */
const config = {
  baseURL: '',
  timeout: 600000, 
  withCredentials: true, //是否允许跨域
  headers: {'Content-Type': 'application/json;charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest','X-AUTH-TOKEN':'05051:128f11e465144d0086aa9f334dc3bd4b'},
  //返回数据类型
  responseType: 'json'
}
// axios.defaults.timeout = 600000; // 默认超时设置 10s
// axios.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证
// // axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/v1' : '/api'; // 相对路径设置
const axios= Axios.create(config)
axios.interceptors.request.use(config => {
   //若是有做鉴权token , 就给头部带上token
   if (window.localStorage.getItem('loginToken')) {
    config.headers.Authorization = `${window.localStorage.getItem('loginToken')}`;
  }
  if (window.sessionStorage.getItem('token')) {
       config.headers['X-AUTH-TOKEN']= window.sessionStorage.getItem('token')
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  return Promise.resolve(response);
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: console.log('错误请求'); break;
      case 401: 
        store.dispatch('deleteUserToken'); 
        break;
      default: console.log(`连接错误${ error.response.status }`);
    }
  } else {
    console.log('连接到服务器失败');
  }
  return Promise.reject(error);
});

/**
 * 封装 get 方法
 * @param {String} url
 * @param {Object} params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        if (res.status === 200) {
          if (res.data || !res.data.code) {
            // 请求成功
               resolve(res.data);
          } else {
            // 请求错误
              reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch(error => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}

/** 
 * 封装 post 方法
 * @param {String} url
 * @param {Object} params
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        if (res.status === 200) {
          if (res.data || !res.data.code) {
            // 请求成功
            resolve(res.data);
          } else {
            // 请求错误
            reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch(error => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}