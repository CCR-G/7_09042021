import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      email: ''
    }
  },
  mutations: {
    mutateUser(state, user) {
      state.user.username = user.username;
      state.user.email = user.email;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('mutateUser', user)
    }
  },
  modules: {},
});
