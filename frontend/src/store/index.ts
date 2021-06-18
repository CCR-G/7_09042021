import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      username: "",
      email: "",
      admin: false,
    },
  },
  mutations: {
    mutateUser(state, user) {
      state.user.id = user.user_id;
      state.user.username = user.username;
      state.user.email = user.email;
      state.user.admin = user.admin;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("mutateUser", user);
    },

    clearUser({ commit }) {
      commit("mutateUser", { id: "", username: "", email: "", admin: false });
    },
  },
  modules: {},
});
