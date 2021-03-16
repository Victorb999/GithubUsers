<template>
  <div v-if="!state.loading && !state.error" class="containerDetails">
    <ul>
      <li>
        <h1>{{ state.user.name }}</h1>
      </li>
      <li v-if="state.user.company">
        <strong>Empresa:</strong> {{ state.user.company }}
      </li>
      <li v-if="state.user.location">
        <strong>Local:</strong> {{ state.user.location }}
      </li>
      <li v-if="state.user.blog">
        <strong>Site: </strong>
        <a :href="state.user.blog">{{ state.user.blog }}</a>
      </li>
      <li v-if="state.user.followers">
        <strong>Seguidores:</strong> {{ state.user.followers }}
      </li>
      <li v-if="state.user.following">
        <strong>Seguindo:</strong> {{ state.user.following }}
      </li>
      <li v-if="state.user.created_at">
        <strong>Usuário desde:</strong> {{ dateFormat(state.user.created_at) }}
      </li>
    </ul>
  </div>
  <div v-else-if="state.error" class="containerMsg">
    Ops, Ocorreu um erro ao buscar esse usuário. =(
    <img
      :src="require('@/assets/image/illustration/undraw_error.png')"
      alt="error"
    />
  </div>
  <div v-else class="containerMsg">
    Aguarde estamos carregando...
    <img
      :src="require('@/assets/image/base/loading.gif')"
      alt="loading"
      class="loading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { User } from "@/api/InterfacesGithubUsers";
import { getUser } from "@/api/ApiGithub";

export default defineComponent({
  Name: "UserDetails",
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    interface DataDetails {
      user: User;
      error: boolean;
      loading: boolean;
    }
    const state = reactive({
      user: {} as User,
      error: false,
      loading: false
    }) as DataDetails;

    async function getUserGithub() {
      state.loading = true;
      await getUser(props.user)
        .then(response => {
          state.user = response;
        })
        .catch(() => {
          state.error = true;
        })
        .finally(() => {
          state.loading = false;
        });
    }
    function dateFormat(criado: Date) {
      const data = new Date(criado);
      const dia = data.getDate().toString();
      const diaF = dia.length == 1 ? "0" + dia : dia;
      const mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      const mesF = mes.length == 1 ? "0" + mes : mes;
      const anoF = data.getFullYear();
      return diaF + "/" + mesF + "/" + anoF;
    }

    onMounted(async () => {
      await getUserGithub();
    });
    return { state, dateFormat };
  }
});
</script>

<style lang="scss" scoped>
.containerDetails {
  display: flex;
  margin: var(--size-3);
  ul {
    list-style: none;
    li:last-child {
      margin-bottom: var(--size-3);
    }
    a {
      color: var(--secondary);
    }
    h1 {
      font-weight: 600;
    }
  }
}
</style>
