<template>
  <div class="paginationContainer">
    <span>Total de registros {{ state.numberUsers }}</span>
    <button @click="searchPage(1)">Primeira</button>
    <button v-for="num in state.pages" :key="num" @click="searchPage(num)">
      {{ num }}
    </button>
    <button @click="searchPage(state.pages)">Última</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Pagination",
  setup() {
    const store = useStore();
    interface Pagination {
      numberUsers: number;
      pageNumber: number;
      userPerPage: number;
      pages: number;
    }
    const state = reactive({
      numberUsers: computed(() => store.state.numberUsers),
      pageNumber: computed(() => store.state.pageNumber),
      userPerPage: computed(() => store.state.userPerPage),
      pages: computed(() => store.state.pages)
    }) as Pagination;

    function searchPage(page: number) {
      console.log(page);
      store.dispatch("changePageNumber", page);
    }

    return { state, searchPage };
  }
});
</script>
