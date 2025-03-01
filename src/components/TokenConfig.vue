<template>
    <div class="modal fade show" :class="{ 'd-block': isOpen }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">API Sozlamalari</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">API URL</label>
              <input v-model="apiUrl" type="text" class="form-control" placeholder="http://localhost:8081/v1/catalog" />
            </div>
            <div class="mb-3">
              <label class="form-label">Token</label>
              <input v-model="token" type="text" class="form-control" placeholder="Tokenni kiriting" />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="saveSettings" class="btn btn-primary">Saqlash</button>
            <button @click="closeModal" class="btn btn-secondary">Yopish</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="modal-backdrop fade show"></div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  import { useToast } from "vue-toastification";
  
  export default {
    props: { isOpen: Boolean },
    emits: ["close"],
    setup(props, { emit }) {
      const toast = useToast();
      const apiUrl = ref(localStorage.getItem("api_url") || "http://localhost:8081/v1/catalog");
      const token = ref(localStorage.getItem("auth_token") || "");
  
      const saveSettings = () => {
        if (!apiUrl.value || !token.value) {
          toast.warning("API URL va Tokenni kiriting!");
          return;
        }
        localStorage.setItem("api_url", apiUrl.value);
        localStorage.setItem("auth_token", token.value);
        toast.success("Sozlamalar saqlandi!");
        setTimeout(() => window.location.reload(), 1000); // Sahifani yangilash
      };
  
      const closeModal = () => emit("close");
  
      watch(() => props.isOpen, (newVal) => {
        if (newVal) {
          apiUrl.value = localStorage.getItem("api_url") || "http://localhost:8081/v1/catalog";
          token.value = localStorage.getItem("auth_token") || "";
        }
      });
  
      return { apiUrl, token, saveSettings, closeModal };
    },
  };
  </script>
  