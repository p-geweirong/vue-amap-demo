import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({

  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    addcart (state, item) {
      console.log(state, item)
      state.cart.push({ key: item })
    }
  },
  getters: {
    cartTotal: state => {
      let sum = 0
      console.log(state.cart)

      state.cart.forEach(v => {
        sum += v.key
      })
      return sum
    }
  },
  actions: {
  },
  modules: {
  }
})
store.subscribe((mutations, state) => {
  localStorage.setItem('cart', JSON.stringify(state.cart))
})
export default store
