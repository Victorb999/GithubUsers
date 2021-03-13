import { createStore } from "vuex";
export default createStore({
  state: {
    numberUsers: 0,
    pageNumber: 1,
    userPerPage: 5,
    pages: 1
  },
  mutations: {
    setNumberUsers(state, payload) {
      state.numberUsers = payload;
      state.pages = Math.ceil(state.numberUsers / state.userPerPage);
    },
    setPageNumber(state, payload) {
      state.pageNumber = payload;
    },
    setUserPerPage(state, payload) {
      state.userPerPage = payload;
    },
    setPages(state, payload) {
      state.pages = payload;
    }
  },
  actions: {
    changeNumberUsers: ({ commit }, payload) => {
      commit("setNumberUsers", payload);
    },
    changePageNumber: ({ commit }, payload) => {
      commit("setPageNumber", payload);
    },
    changeUserPerPage: ({ commit }, payload) => {
      commit("setUserPerPage", payload);
    },
    changePages: ({ commit }, payload) => {
      commit("setPages", payload);
    }
  },
  modules: {}
});
