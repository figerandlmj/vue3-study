import * as userApi from '../api/user';

export default {
  namespaced: true,
  state: {
    loading: false,
    user: null
  },
  mutations: {
    setLoading(state, param) {
      state.loading = param;
    },
    setUser(state, param) {
      state.user = param;
    }
  },
  actions: {
    async login({ commit }, { loginId, loginPwd }) {
      commit('setLoading', true);
      const user = await userApi.login(loginId, loginPwd);
      commit('setUser', user);
      commit('setLoading', false);
      return user;
    },
    async loginOut({ commit }) {
      commit('setLoading', true);
      await userApi.loginOut();
      commit('setUser', null);
      commit('setLoading', false);
    },
    async whoAmI({ commit }) {
      commit('setLoading', true);
      const user = await userApi.whoAmI();
      commit('setUser', user);
      commit('setLoading', false);
      return user;
    }
  }
}