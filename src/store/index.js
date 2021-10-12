import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

const state={
  cartList: []
}

const store = new Vuex.Store({
  state,
  // 由于对于mutations的要求一般是简单且功能单一，所以这里重构一下
  mutations,
  actions,
  getters
})
export default store