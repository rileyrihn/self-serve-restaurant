import Vue from "vue";
import Vuex from "vuex";
import FoodItem from "../models/FoodItem";
import CartItem from "../models/CartItem";
import foodItemsData from "../models/FoodItemsData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foodItems: new Array<FoodItem>(),
    cart: new Array<CartItem>(),
  },
  mutations: {
    INITIALIZE_FOOD_ITEMS(state, foodItems) {
      state.foodItems = foodItems;
    },
    ADD_FOOD_ITEM(state, foodItem) {
      state.foodItems.push(foodItem);
    },
    EDIT_FOOD_ITEM(state, foodItem) {
      const index = state.foodItems.findIndex((val) => val.id === foodItem.id);
      Vue.set(state.foodItems, index, foodItem);
    },
    DELETE_FOOD_ITEM(state, index) {
      state.foodItems.splice(index, 1);
    },
    ADD_ITEM_TO_CART(state, id) {
      const index = state.cart.findIndex((val) => val.foodId === id);
      if (index === -1) {
        const newCartItem: CartItem = {
          foodId: id,
          count: 1,
        };
        state.cart.push(newCartItem);
      } else {
        const cartItem: CartItem = {
          foodId: id,
          count: state.cart[index].count + 1,
        };
        Vue.set(state.cart, index, cartItem);
      }
    },
    DELETE_ITEM_FROM_CART(state, id) {
      const index = state.cart.findIndex((val) => val.foodId === id);
      Vue.delete(state.cart, index);
    },
  },
  actions: {
    initializeFoodItems({ commit }) {
      const foodItems = foodItemsData;
      commit("INITIALIZE_FOOD_ITEMS", foodItems);
    },
    addFoodItem({ commit }, foodItem) {
      commit("ADD_FOOD_ITEM", foodItem);
    },
    editFoodItem({ commit }, foodItem) {
      commit("EDIT_FOOD_ITEM", foodItem);
    },
    deleteFoodItem({ commit }, index): Promise<void> {
      const deleteSuccess = true;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (deleteSuccess) {
            commit("DELETE_FOOD_ITEM", index);
            resolve();
          } else {
            reject();
          }
        }, 10000);
      });
    },
    addToCart({ commit }, id) {
      commit("ADD_ITEM_TO_CART", id);
    },
    deleteFromCart({ commit }, id) {
      commit("DELETE_ITEM_FROM_CART", id);
    },
  },
  modules: {},
});
