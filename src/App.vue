<template>
  <div class="container mt-4 shadow">
    <button class="btn btn-primary my-3" @click="isTokenConfigOpen = true"><i class="bi bi-gear mx-2"></i>API Config</button>

    <!-- TokenConfig Modal -->
    <TokenConfig :isOpen="isTokenConfigOpen" @close="isTokenConfigOpen = false" />

    <h2>Kataloglar</h2>

    <Filter @filter-changed="updateFilters" />
    <CatalogTable />
  </div>
</template>

<script>
import { ref } from "vue";
import Filter from "./components/Filter.vue";
import CatalogTable from "./components/CatalogTable.vue";
import TokenConfig from "./components/TokenConfig.vue";
import { useStore } from "vuex";

export default {
  components: { Filter, CatalogTable, TokenConfig },
  setup() {
    const isTokenConfigOpen = ref(false);
    const store = useStore();

    const updateFilters = (filters) => {
      store.commit("SET_FILTERS", filters);
      store.dispatch("loadCatalogs");
    };

    return { isTokenConfigOpen, updateFilters };
  },
};
</script>
