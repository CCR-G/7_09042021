import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      username: '',
      email: ''
    }
  },
  mutations: {
    mutateUser(state, user) {
      state.user.id = user.user_id;
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
