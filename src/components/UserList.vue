<template>
  <div v-if="!state.loading && !state.error" class="containerUsers">
    <div v-for="user in state.users.items" :key="user.id">
      <user-item :user="user" />
    </div>
    <pagination />
  </div>
  <div v-else-if="state.error" class="containerMsg">
    {{ state.errorMsg }}
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
import { defineComponent, reactive, onMounted, computed, watch } from "vue";
import { Users } from "@/api/InterfacesGithubUsers";
import { getUsers } from "@/api/ApiGithub";
import UserItem from "@/components/UserItem.vue";
import { useStore } from "vuex";
import Pagination from "@/components/Pagination.vue";

export default defineComponent({
  components: { UserItem, Pagination },
  name: "UserList",
  setup() {
    const store = useStore();

    interface Data {
      users: Users;
      error: boolean;
      errorMsg: string;
      loading: boolean;
      perPage: number;
      page: number;
      q: Array<string>;
    }
    const state = reactive({
      users: {} as Users,
      error: false,
      errorMsg: "",
      loading: false,
      perPage: computed(() => store.state.userPerPage),
      page: computed(() => store.state.pageNumber),
      q: computed(() => store.state.query)
    }) as Data;

    async function getUsersGithub() {
      state.loading = true;
      await getUsers(state.q, state.page, "", "", state.perPage)
        .then(response => {
          state.users = response;
          let total; //"Only the first 1000 search results are available"
          if (Object.keys(response).length === 0) {
            state.error = true;
            state.errorMsg =
              "Ops, ocorreu um problema ao buscarmos os usuários, tente novamente mais tarde. =(";
          }
          if (response.total_count > 1000) {
            state.error = false;
            total = 1000;
          } else if (response.total_count == 0) {
            state.error = true;
            state.errorMsg = "Não encontramos nenhum registro para você. =(";
          } else {
            state.error = false;
            total = response.total_count;
          }
          store.dispatch("changeNumberUsers", total);
        })
        .catch(err => {
          state.error = true;
          state.errorMsg = err;
        })
        .finally(() => {
          state.loading = false;
          //console.log(store.state);
        });
    }

    onMounted(() => {
      getUsersGithub();
    });

    watch(
      () => state.page,
      () => {
        getUsersGithub();
      }
    );
    watch(
      () => state.q,
      () => {
        store.dispatch("changePageNumber", 1);
        getUsersGithub();
      }
    );

    return { state };
  }
});
</script>

<style lang="scss">
.containerUsers {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: var(--size-5);
}
.containerMsg {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: var(--size-5);
  img {
    height: 60vh;
  }
  .loading {
    margin-top: var(--size-4);
    height: auto;
  }
}
</style>
