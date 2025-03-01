<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <h4 class="modal-title">Edit Catalog</h4>

      <!-- Type tanlash -->
      <div class="form-group">
        <label>Type:</label>
        <select v-model="localEditedCatalog.type" class="form-control">
          <option value="" disabled>Tanlang...</option>
          <option v-for="type in typeList" :key="type.id" :value="type.code">
            {{ type.display }} ({{ type.code }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Code:</label>
        <input v-model="localEditedCatalog.code" class="form-control large-input" />
      </div>
      <div class="form-group">
        <label>Parent Code:</label>
        <input v-model="localEditedCatalog.parentCode" class="form-control large-input" />
      </div>
      <div class="form-group">
        <label>Name Uz:</label>
        <textarea v-model="localEditedCatalog.nameUz" class="form-control large-textarea"></textarea>
      </div>
      <div class="form-group">
        <label>Name Uz Cyril:</label>
        <textarea v-model="localEditedCatalog.nameUzCyril" class="form-control large-textarea"></textarea>
      </div>
      <div class="form-group">
        <label>Name Ru:</label>
        <textarea v-model="localEditedCatalog.nameRu" class="form-control large-textarea"></textarea>
      </div>
      <div class="form-group">
        <label>Name Kaa:</label>
        <textarea v-model="localEditedCatalog.nameKaa" class="form-control large-textarea"></textarea>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-success" @click="saveChanges">Save</button>
        <button class="btn btn-secondary" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api.js";

export default {
props: {
  editedCatalog: Object,
},
data() {
  return {
    localEditedCatalog: {}, // Default bo'sh obyekt
    typeList: [],
  };
},
watch: {
  editedCatalog: {
    handler(newVal) {
      if (newVal) {
        this.localEditedCatalog = JSON.parse(JSON.stringify(newVal)); // Deep copy qilish
      }
    },
    immediate: true,
  },
},
methods: {
  async fetchTypes() {
    try {
      this.typeList = await api.getCatalogTypes();
    } catch (error) {
      console.error("Error fetching catalog types:", error);
    }
  },
  async saveChanges() {
    try {
      await this.$store.dispatch("updateCatalog", this.localEditedCatalog);
      this.$emit("close"); // Modalni yopish
    } catch (error) {
      console.error("Xatolik: ", error);
    }
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
/* Modal styles */
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

.large-input {
width: 100%;
padding: 8px;
font-size: 1.2rem;
}

.large-textarea {
width: 100%;
padding: 8px;
font-size: 1.1rem;
height: 60px;
resize: vertical;
}

.modal-buttons {
display: flex;
justify-content: space-between;
margin-top: 10px;
}

.modal-buttons button {
flex: 1;
margin: 5px;
}
</style>
