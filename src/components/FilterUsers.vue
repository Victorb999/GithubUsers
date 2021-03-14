<template>
  <div class="filterContainer">
    <form @submit.prevent="setFilter">
      <input
        type="text"
        name="search"
        placeholder="Escreva aqui o nome de um usuário"
        v-model="state.name"
      />
      <button type="submit" class="btn-primary">Buscar</button>

      <span>{{ state.nameValidation }}</span>
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
    }

    const state = reactive({
      name: "",
      nameValidation: ""
    }) as Data;

    function setFilter() {
      if (state.name.length > 3) {
        state.nameValidation = "";
        const filter = [state.name + " in:login"];
        store.dispatch("changeQuery", filter);
      } else {
        state.nameValidation =
          "Tente digitar um nome de usuário com mais que 3 letras.";
      }
    }

    return { state, setFilter };
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
  }
}
.theme-dark {
  .filterContainer {
    input[type="text"] {
      box-shadow: 0.5px 0.5px var(--size-1) var(--aux);
      background-color: darken(#1f1b24, 10%);
      color: var(--white);
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
