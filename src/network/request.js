// 在这里导入网络模块，如果以后要用的网路模块改变，可以只改封装文件就可以让整个项目的网络模块全改
import axios from "axios"
// 方法一:完全自己封装
// export function request(config,success,failure){
//   // 创建axios的实例时，create里放的是对象类型的config
//   const instance1=axios.create({
//     // 公共根url
//     baseURL:"http://123.207.32.32:8000",
//     // 5秒内完成请求，超时则视为请求失败
//     timeout:5000
//   })
// // 由于axios创建的其实就是promise实例的一种，所以可以直接用then和catch分别处理成功和失败
//   instance1(config)
//   .then(res => {
//     // 把成功请求的数据返回给传过来的success函数
//     success(res);
//   })
//   .catch(err => {
//     // 把请求失败的错误信息返回给传过来的failure函数
//     failure(err);
//   })
// }
// 方法二：直接返回axios实例，因为自带catch和then方法
export function request(config) {
  // 由于就一个实例，所以省略了常量接收环节
  // return axios.create({
  //   baseURL:"http://123.207.32.32:8000",
  //   timeout:5000
  // })(config);
  const instance1 = axios.create({
    // baseURL: "http://152.136.185.210:7878/api/m5",
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000
  })

  // 请求拦截器，用来对数据做预处理等，里面参数填两个函数，分别是成功和失败执行的函数
  instance1.interceptors.request.use(config => {
    // console.log("request拦截器");
    // console.log(config);
    // 这里把拦截到的请求要返回，否则真正需要请求那边就取不到了
    return config;
  }, err => {
    // console.log(err);
  })

    // 响应拦截器和请求拦截器基本一致
    instance1.interceptors.response.use(res => {
      // console.log("response拦截器");
      // console.log(res);
      // 在响应拦截器里一般return.data就行
      return res.data;
    }, err => {
      // console.log(err);
    })

  // 注意记得把axios实例返回
  return instance1(config);
}