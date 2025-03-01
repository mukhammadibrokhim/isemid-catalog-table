<template>
    <div class="">
        <div class="d-flex justify-content-end mb-2">
            <button class="btn btn-primary" @click="showAddModal = true"><i class="bi bi-plus-lg mx-1"></i>Qo'shish</button>
          </div>
        <!-- <button class="btn btn-primary mb-2" @click="showAddModal = true">+ Yangi qo‘shish</button> -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Type</th>
            <th>Code</th>
            <th>Parent Code</th>
            <th>Name Uz</th>
            <th>Name Uz Cyril</th>
            <th>Name Ru</th>
            <th>Name Kaa</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in catalogs" :key="item.id">
            <td>{{ item.type }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.parentCode }}</td>
            <td>{{ item.nameUz }}</td>
            <td>{{ item.nameUzCyril }}</td>
            <td>{{ item.nameRu }}</td>
            <td>{{ item.nameKaa }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editCatalog(item)"><i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-danger btn-sm" @click="confirmDelete(item.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <Pagination :total="total" :perPage="10" :currentPage="currentPage" @page-changed="loadPage" />
      <AddCatalogModal
      v-if="showAddModal"
        @save="createCatalog"
        @close="showAddModal = false"
        />


     <!-- Edit Catalog Modal -->
     <EditCatalogModal
     v-if="showEditModal"
     :editedCatalog="editedCatalog"
     @save="updateCatalog"
     @close="showEditModal = false"
     />
  
      <!-- Confirm Delete Modal -->
      <div v-if="showDeleteModal" class="modal">
        <div class="modal-content">
          <h4>Rostdan ham o‘chirmoqchimisiz?</h4>
          <div class="modal-buttons">
            <button class="btn btn-danger" @click="deleteCatalog">Ha, o‘chirish</button>
            <button class="btn btn-secondary" @click="showDeleteModal = false">Bekor qilish</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  import Pagination from "./Pagination.vue";
  import EditCatalogModal from "./EditCatalogModal.vue";
  import AddCatalogModal from "./AddCatalogModal.vue";

  import { useToast } from "vue-toastification";
  
  export default {
    components: { Pagination,EditCatalogModal ,AddCatalogModal },
    data() {
      return {
        showEditModal: false,
        showDeleteModal: false,
        showAddModal: false, 
        editedCatalog: {},
        catalogToDelete: null,
        toast: useToast(),
      };
    },
    computed: {
      ...mapState(["catalogs", "total", "currentPage"]),
    },
    methods: {
      ...mapActions(["loadCatalogs", "updateCatalog", "deleteCatalog","createCatalog"]),
  
      loadPage(page) {
        this.$store.commit("SET_PAGE", page);
        this.loadCatalogs();
      },
  
      editCatalog(item) {
        this.editedCatalog = { ...item };
        this.showEditModal = true;
      },
  
      async updateCatalog() {
        try {
          await this.$store.dispatch("updateCatalog", {
            id: this.editedCatalog.id,
            data: this.editedCatalog,
          });
          this.showEditModal = false;
          this.loadCatalogs();
        } catch (error) {
          this.toast.error("Yangilashda xatolik yuz berdi!");
        }
      },
  
      confirmDelete(id) {
        this.catalogToDelete = id;
        this.showDeleteModal = true;
      },
  
      async deleteCatalog() {
        try {
          await this.$store.dispatch("deleteCatalog", this.catalogToDelete);
          this.toast.success("Katalog o‘chirildi!");
        } catch (error) {
          this.toast.error("O‘chirishda xatolik yuz berdi!");
        }
        this.showDeleteModal = false;
        this.loadCatalogs();
      },
     
      async createCatalog(newCatalog) {
        console.log("Jo‘natilayotgan data:", newCatalog); 
        try {
            await this.$store.dispatch("createCatalog", newCatalog);
            this.showAddModal = false;
            this.loadCatalogs();
        } catch (error) {
            console.log(error)
        }
       },
    },
    mounted() {
      this.loadCatalogs();
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
    width: 400px;
    text-align: center;
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
  