import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types"

export default {
  // 用来做方法名时记得加中括号
  [ADD_COUNTER](state,payload){
    payload.count +=1
  },
  [ADD_TO_CART](state,payload){
    // 加入购物车默认选中
    payload.checked=true
    state.cartList.push(payload)
  }
}