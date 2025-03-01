<template>
    <TokenConfig/>
    <div class="row my-3 py-2 shadow">
      <div class="col-md-2" v-for="(value, key) in filters" :key="key">
        <input v-model="filters[key]" @input="applyFilters" class="form-control" :placeholder="key" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: {
          type: "",
          code: "",
          nameUz: "",
          nameUzCyril: "",
          nameRu: "",
          nameKaa: ""
        }
      };
    },
    methods: {
      applyFilters() {
        this.$emit("filter-changed", this.filters);
      }
    }
  };
  </script>
  