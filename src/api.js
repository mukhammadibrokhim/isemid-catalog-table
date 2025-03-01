import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const getApiUrl = () => localStorage.getItem("api_url") || "http://localhost:8081/v1/catalog";
const getToken = () => localStorage.getItem("auth_token") || "";

export const api = {
  async fetchCatalogs(params) {
    try {
      const response = await axios.get(`${getApiUrl()}/all`, {
        params,
        
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
        const errorMessage = error.response
        ? `Ma'lumotlarni yuklashda xatolik! (${error.response.status}): ${error.response.data.message || error.message}`
        : "Server bilan bog‘lanib bo‘lmadi!";
      toast.error(errorMessage);
      throw error;
    }
  },

  async createCatalog(data) {
    console.log(data)
    try {
      await axios.post(getApiUrl(), data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("Katalog muvaffaqiyatli yaratildi!");
    } catch (error) {
        const errorMessage = error.response
        ? `Yaratishda xatolik! (${error.response.status}): ${error.response.data.message || error.message}`
        : "Server bilan bog‘lanib bo‘lmadi!";
      toast.error(errorMessage);
      throw error;
    }
  },

  async updateCatalog(id, data) {
    try {
      await axios.put(`${getApiUrl()}/${id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("Katalog muvaffaqiyatli yangilandi!");
    } catch (error) {
        const errorMessage = error.response
        ? `Yangilashda xatolik! (${error.response.status}): ${error.response.data.message || error.message}`
        : "Server bilan bog‘lanib bo‘lmadi!";
      toast.error(errorMessage);
      throw error;
    }
  },

  async deleteCatalog(id) {
    try {
      await axios.delete(`${getApiUrl()}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    //   toast.success("Katalog muvaffaqiyatli o‘chirildi!");
    } catch (error) {
        const errorMessage = error.response
        ? `O‘chirishda xatolik! (${error.response.status}): ${error.response.data.message || error.message}`
        : "Server bilan bog‘lanib bo‘lmadi!";
      toast.error(errorMessage);
      throw error;
    }
  },

  async getCatalogTypes() {
    try {
      const response = await axios.get(`${getApiUrl()}/types`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      toast.error(this.formatError(error, "Type ma'lumotlarini olishda xatolik!"));
      return [];
    }
  },
};
