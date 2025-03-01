<template>
    <nav class="pagination-container">
      <p class="total-count"><b>Jami: {{ total }} ta</b></p>
      <ul class="pagination">
        <!-- Oldingi tugmasi -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">« Oldingi</button>
        </li>
  
        <!-- 1-sahifa har doim ko'rsatiladi -->
        <li class="page-item" :class="{ active: currentPage === 1 }">
          <button class="page-link" @click="changePage(1)">1</button>
        </li>
  
        <!-- "..." belgisini qo'shish agar kerak bo'lsa -->
        <li class="page-item disabled" v-if="startPage > 2">
          <span class="page-link">...</span>
        </li>
  
        <!-- Ko'rinadigan sahifalar -->
        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
  
        <!-- "..." belgisini qo'shish agar kerak bo'lsa -->
        <li class="page-item disabled" v-if="endPage < totalPages - 1">
          <span class="page-link">...</span>
        </li>
  
        <!-- Oxirgi sahifa har doim ko'rsatiladi -->
        <li class="page-item" v-if="totalPages > 1" :class="{ active: currentPage === totalPages }">
          <button class="page-link" @click="changePage(totalPages)">{{ totalPages }}</button>
        </li>
  
        <!-- Keyingi tugmasi -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">Keyingi »</button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      total: Number, // Jami elementlar soni
      perPage: Number, // Sahifadagi elementlar soni
      currentPage: Number // Hozirgi sahifa
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.perPage);
      },
      startPage() {
        return Math.max(2, this.currentPage - 2);
      },
      endPage() {
        return Math.min(this.totalPages - 1, this.currentPage + 2);
      },
      visiblePages() {
        const pages = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit("page-changed", page);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .total-count {
    font-size: 14px;
    color: #333;
    margin-right: 10px;
  }
  
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  .page-item {
    margin: 0 4px;
  }
  
  .page-item .page-link {
    border: 1px solid #ddd;
    padding: 6px 12px;
    cursor: pointer;
    background: white;
    border-radius: 5px;
    transition: all 0.2s;
  }
  
  .page-item.active .page-link {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .page-item.disabled .page-link {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-item .page-link:hover {
    background: #0056b3;
    color: white;
  }
  </style>
  