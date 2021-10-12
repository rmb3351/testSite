// 这里专门负责对主页的网络请求进行处理
// 先把网络请求的request导入，然后从函数里导出对应数据
import {request} from "./request"

export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
  })
}

export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    // 这里params里的参数直接作为？后的url参数格式填入
    params:{
      type,
      page
    }
  })
}