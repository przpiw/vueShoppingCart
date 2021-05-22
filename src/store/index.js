import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInCart: [],
  },
  mutations: {
    //mutation is updating the state
    loadProducts(state, products) {
      state.products = products
    },
    loadCart(state, products) {
      state.productsInCart = products
    },
    addToCart(state, product) {
      state.productsInCart.push(product)
      localStorage.setItem(
        'productsInCart',
        JSON.stringify(state.productsInCart)
      )
    },

    removeFromCart(state, productID) {
      var updatedCart = state.productsInCart.filter(
        (item) => productID != item.id
      )
      state.productsInCart = updatedCart
      localStorage.setItem(
        'productsInCart',
        JSON.stringify(state.productsInCart)
      )
    },
  }, //commit calling mutations

  actions: {
    //dispatch calling actions
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products').then((response) => {
        commit('loadProducts', response.data)
      })
    },

    loadCart({ commit }) {
      if (localStorage.getItem('productsInCart')) {
        commit('loadCart', JSON.parse(localStorage.getItem('productsInCart')))
      }
    },

    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, productID) {
      commit('removeFromCart', productID)
    },
  },
  modules: {},
})
