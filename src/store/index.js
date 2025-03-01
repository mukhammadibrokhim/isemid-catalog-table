import { createStore } from "vuex";
import { api } from "../api";


export default createStore({
  state: {
    catalogs: [],
    total: 0,
    currentPage: 1,
    filters: {}
  },
  mutations: {
    SET_CATALOGS(state, { data, total }) {
      state.catalogs = data;
      state.total = total;
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_FILTERS(state, filters) {
      state.filters = filters;
    },
    REMOVE_CATALOG(state, id) {
      state.catalogs = state.catalogs.filter(item => item.id !== id);
    },
    UPDATE_CATALOG(state, updatedCatalog) {
      const index = state.catalogs.findIndex(catalog => catalog.id === updatedCatalog.id);
      if (index !== -1) {
        state.catalogs[index] = { ...updatedCatalog }; // Yangi obyekt yaratish
      }
    },    
    ADD_CATALOG(state, newCatalog) {
        state.catalogs.push(newCatalog);
    },
  },
  actions: {
    async loadCatalogs({ commit, state }) {
      const isFilterActive = Object.keys(state.filters).some(key => state.filters[key]); // Agar filter bor bo‘lsa, `true` qaytaradi
      const params = isFilterActive ? { ...state.filters } : { ...state.filters, page: state.currentPage };
  
      const result = await api.fetchCatalogs(params, isFilterActive);
      commit("SET_CATALOGS", { data: result.data, total: result.total });
    },
    async deleteCatalog({ commit, dispatch }, id) {
      await api.deleteCatalog(id);
      commit("REMOVE_CATALOG", id);
      dispatch("loadCatalogs");
    },
    async updateCatalog({ commit }, updatedCatalog) {
      try {
        console.log("SendignData: ", updatedCatalog)
          await api.updateCatalog(updatedCatalog.id, updatedCatalog);
          commit("UPDATE_CATALOG", updatedCatalog);
      } catch (error) {
          console.log("Update error: ", error);
      }
    },  
    async createCatalog({ commit }, newCatalog) {
        console.log("Vuex action createCatalog ga kelgan data:", newCatalog);
        try {
          const response = await api.createCatalog(newCatalog);
          commit("ADD_CATALOG", response.data);
        } catch (error) {
          console.error("Create error: ", error);
        }
    },
      
  }
});
