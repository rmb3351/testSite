import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"
export default {
  // context是肯定要的参数，但是如果要用state里的东西，还是需要加state，形如context.state
  addToCart(context, goods) {
    // vuex里的actions要和外界通信还要有先后执行顺序的话最好是返回promise，外界再then
    return new Promise((resolve, reject) => {
      // find是数组方法，即查找满足参数函数条件的item，并把item返回给purchase
      let purchase = context.state.cartList.find(item => item.iid == goods.iid)
      if (purchase) {
        // 如果商品列表里已经有这件商品，那么数量+1
        // purchase.count += 1
        context.commit(ADD_COUNTER, purchase)
        resolve("商品数量+1")
      } else {
        // 如果无，那就添加
        // state.cartList.push(goods)
        goods.count = 1
        context.commit(ADD_TO_CART, goods)
        resolve("添加新商品")
      }
      // state.cartList.push(goods)
      // console.log(context.state.cartList);
    })
  }
}