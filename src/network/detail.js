// 这个是类似于home.js一样，处理detail页面的网络请求
import { request } from "./request";
// 请求详情页展示的数据
export function getDetails(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}
// 请求详情页最下端推荐部分展示的数据
export function getRecommend(){
  return request({
    url:"/recommend"
  })
}
// 把所有商品封装成一个类，类里面包含商品详情页需要的信息
// 这样到时候每个商品的信息都可以从对应的类实例中获取
export class Goods{
  // 类的构造器格式
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    // 这里的desc和realPrice都是在购物车里展示才用到的
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.realPrice=itemInfo.lowNowPrice
    this.discount=itemInfo.discountDesc
    this.columns=columns
    this.services=services
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cGoods
  }
}

export class GoodsParam{
  constructor(info,rule){
    this.image=info.images ? info.images[0] : ""
    this.infos=info.set
    this.sizes=rule.tables
  }
}