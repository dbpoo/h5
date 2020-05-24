const state = {
  isLogin: false
};

const mutations = {
  setLogin(state, payload) {
    state.isLogin = payload;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
