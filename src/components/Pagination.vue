<template>
  <div class="paginationContainer">
    <span id="numUser" v-if="state.numberUsers > 0"
      >Total de registros: <strong> {{ state.numberUsers }}</strong></span
    >
    <button
      id="first"
      v-if="state.pages > state.limitFixed && state.pageLimit > 5"
      @click="state.pageLimit = state.limitFixed"
    >
      Primeira
    </button>
    <button
      id="previous"
      v-if="state.pageLimit > state.limitFixed"
      @click="pagePrevious"
    >
      anterior
    </button>
    <button
      v-for="num in state.limitFixed > state.pages
        ? state.pages
        : state.limitFixed"
      :key="num"
      :class="state.pageNumber == calcPage(num) ? 'active' : num"
      @click="searchPage(calcPage(num))"
    >
      {{ calcPage(num) }}
    </button>
    <button
      id="next"
      v-if="state.pages > state.limitFixed && state.pageLimit < state.pages"
      @click="state.pageLimit += 5"
    >
      próxima
    </button>
    <button
      id="last"
      v-if="state.pages > state.limitFixed"
      @click="state.pageLimit = state.pages"
    >
      Última
    </button>
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
      pageLimit: number;
      limitFixed: number;
    }
    const state = reactive({
      numberUsers: computed(() => store.state.numberUsers),
      pageNumber: computed(() => store.state.pageNumber),
      userPerPage: computed(() => store.state.userPerPage),
      pages: computed(() => store.state.pages),
      pageLimit: 5,
      limitFixed: 5
    }) as Pagination;

    function searchPage(page: number) {
      store.dispatch("changePageNumber", page);
    }

    function calcPage(page: number) {
      if (state.pageLimit === state.limitFixed) {
        return page;
      } else {
        return state.pageLimit - state.limitFixed + page;
      }
    }

    function attPageList() {
      if (state.pageNumber > state.limitFixed) {
        state.pageLimit = state.pageNumber;
      }
    }

    function pagePrevious() {
      state.pageLimit > 5 ? (state.pageLimit -= 5) : (state.pageLimit = 5);
    }

    attPageList();

    return { state, searchPage, calcPage, attPageList, pagePrevious };
  }
});
</script>

<style lang="scss" scoped>
.paginationContainer {
  span {
    margin-right: var(--size-3);
  }
  button {
    background-color: var(--gray-1);
    border: none;
    border-radius: 5px;
    padding: var(--size-1) var(--size-2);
    margin: var(--size-2) var(--size-1);
    min-width: var(--size-4);
    transition: all 0.3s;
    &:hover {
      background-color: var(--gray-2);
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background-color: var(--primary);
    color: var(--white);
  }
}
.theme-dark {
  button {
    background-color: darken(#1f1b24, 10%);
    color: var(--white);
    &:hover {
      background-color: lighten(#1f1b24, 10%);
    }
    &:focus {
      outline: none;
    }
  }
}
</style>
