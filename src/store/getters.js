export default {
  // 这里的方法还是需要把state传进来
  cartLength(state) {
    return state.cartList.length
  },
  cart(state) {
    return state.cartList
  }
}