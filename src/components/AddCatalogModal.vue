<template>
    <div class="modal" @click.self="closeModal">
      <div class="modal-content">
        <h4 class="modal-title">Yangi katalog qo‘shish</h4>
        
        <!-- Type tanlash -->
      <div class="form-group">
        <label>Type:</label>
        <select v-model="newCatalog.type" class="form-control">
          <option value="" disabled>Tanlang...</option>
          <option v-for="type in typeList" :key="type.id" :value="type.code">
            {{ type.display }} ({{ type.code }})
          </option>
        </select>
      </div>

        
        
        <div class="form-group">
          <label>Code:</label>
          <input v-model="newCatalog.code" class="form-control" />
        </div>
        <div class="form-group">
          <label>Parent Code:</label>
          <input v-model="newCatalog.parentCode" class="form-control" />
        </div>
        <div class="form-group">
          <label>Name Uz:</label>
          <textarea v-model="newCatalog.nameUz" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Name Uz Cyril:</label>
          <textarea v-model="newCatalog.nameUzCyril" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Name Ru:</label>
          <textarea v-model="newCatalog.nameRu" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Name Kaa:</label>
          <textarea v-model="newCatalog.nameKaa" class="form-control"></textarea>
        </div>
        <div class="modal-buttons">
          <button class="btn btn-success" @click="saveChanges">Saqlash</button>
          <button class="btn btn-secondary" @click="closeModal">Bekor qilish</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

import { api } from "../api.js";

export default {
  data() {
    return {
      newCatalog: {
        type: "",
        code: "",
        parentCode: "",
        nameUz: "",
        nameUzCyril: "",
        nameRu: "",
        nameKaa: "",
      },
      typeList: [],
    };
  },
  watch: {
    // Type tanlanganda avtomatik code qo‘yish
    "newCatalog.type"(newValue) {
      this.newCatalog.code = newValue;
    },
  },
  methods: {
    async fetchTypes() {
      this.typeList = await api.getCatalogTypes();
    },
    saveChanges() {
      this.$emit("save", this.newCatalog);
    },
    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.fetchTypes(); // Modal ochilganda Type listni yuklash
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  text-align: center;
}
.modal-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}
.form-group {
  margin-bottom: 10px;
  text-align: left;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>