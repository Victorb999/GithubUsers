<template>
  <div class="filterContainer">
    <form @submit.prevent="setFilter" class="form">
      <input
        type="text"
        name="search"
        placeholder="Escreva aqui o nome de um usuário"
        v-model="state.name"
      />
      <button type="submit" class="btn-primary">Buscar</button>

      <div class="filter">
        <span v-if="state.nameValidation != ''">{{
          state.nameValidation
        }}</span>
      </div>
      <div class="filter">
        <input
          type="checkbox"
          v-model="state.respositories"
          name="repositories"
        />
        <label for="repositories">
          Buscar somente quem tem mais de 20 repositórios</label
        >
      </div>
      <div class="filter">
        <input type="checkbox" v-model="state.followers" name="followers" />
        <label for="followers">
          Buscar somente quem tem mais de 20 seguidores</label
        >
      </div>
      <div class="resetFilter">
        <button
          type="button"
          title="Busca os 1000 primeiros brasileiros com mais followers"
          class="reset"
          @click="resetFilter"
        >
          🔃 resetar busca
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "FilterUsers",
  setup() {
    const store = useStore();

    interface Data {
      name: string;
      nameValidation: string;
      respositories: boolean;
      followers: boolean;
    }

    const state = reactive({
      name: "",
      nameValidation: "",
      respositories: false,
      followers: false
    }) as Data;

    function setFilter() {
      const MIN_SIZE_NAME = 3;
      const MIN_SIZE_FILTER = 20;
      if (state.name.length > MIN_SIZE_NAME) {
        state.nameValidation = "";
        let filter = [state.name + " in:login"];
        if (state.respositories === true) {
          filter = [...filter, `repos:>${MIN_SIZE_FILTER}`];
        }
        if (state.followers === true) {
          filter = [...filter, `followers:>=${MIN_SIZE_FILTER}`];
        }
        store.dispatch("changeQuery", filter);
      } else {
        state.nameValidation =
          "Tente digitar um nome de usuário com mais que 3 letras.";
      }
    }

    function resetFilter() {
      const filter = ["location:BRASIL", "location:BRAZIL"];
      state.name = "";
      state.nameValidation = "";
      state.respositories = false;
      state.followers = false;
      store.dispatch("changeQuery", filter);
    }

    return { state, setFilter, resetFilter };
  }
});
</script>

<style lang="scss" scoped>
.filterContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  input[type="text"] {
    border-radius: 5px;
    min-width: 30vw;
    border: none;
    border-radius: 5px;
    padding: var(--size-2) var(--size-3);
    margin: var(--size-2) var(--size-1);
    box-shadow: 0 0.5px var(--size-1) var(--gray-3);
    font-weight: 400;
    color: var(--dark);
    &:focus {
      outline: none;
    }
  }

  button {
    padding: var(--size-2) var(--size-3);
    margin: var(--size-2) var(--size-1);
  }
  span {
    display: flex;
    flex-wrap: wrap; // Quebra a linha
    flex-direction: row; //Direção que você deseja
    max-width: 90vw;
    margin-top: var(--size-3);
    color: var(--primary);
    font-weight: bold;
  }
  .filter {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    margin-top: var(--size-3);
    input {
      margin-right: var(--size-2);
    }
  }
  .reset {
    padding: var(--size-2) var(--size-3);
    margin: var(--size-2) var(--size-1);
    background: transparent;
    &:hover {
      background: var(--gray-2);
    }
  }
  .resetFilter {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: var(--size-3);
  }
}
.theme-dark {
  .filterContainer {
    input[type="text"] {
      box-shadow: 0.5px 0.5px var(--size-1) var(--aux);
      background-color: darken(#1f1b24, 10%);
      color: var(--white);
    }
    .reset {
      color: var(--white);
      transition: all 0.5s;
      &:hover {
        box-shadow: 0.5px 0.5px var(--size-1) var(--aux);
        background-color: darken(#1f1b24, 10%);
      }
    }
  }
}
@media (max-width: 900px) {
  .filterContainer {
    input[type="text"] {
      min-width: 50vw;
    }
  }
}
@media (max-width: 400px) {
  .filterContainer {
    form {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
    }
    input[type="text"] {
      min-width: 90vw;
    }
  }
}
</style>
