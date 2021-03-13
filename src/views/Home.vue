<template>
  <div class="home">
    <header>
      <h1 class="title">Github Users</h1>
    </header>
    <div v-if="!state.loading" class="containerUsers">
      <div v-for="user in state.users.items" :key="user.id">
        <user-item :user="user" />
      </div>
      <pagination />
    </div>
    <div v-else>
      Aguarde estamos carregando...
    </div>
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
  name: "Home",
  setup() {
    const store = useStore();

    interface Data {
      users: Users;
      error: boolean;
      loading: boolean;
      perPage: number;
      page: number;
    }
    const state = reactive({
      users: {} as Users,
      error: false,
      loading: false,
      perPage: computed(() => store.state.userPerPage),
      page: computed(() => store.state.pageNumber)
    }) as Data;

    async function getUsersGithub() {
      state.loading = true;
      await getUsers("location:BRAZIL", state.page, "", "", state.perPage)
        .then(response => {
          state.users = response;
          let total; //"Only the first 1000 search results are available"
          if (response.total_count > 1000) {
            total = 1000;
          } else {
            total = response.total_count;
          }
          store.dispatch("changeNumberUsers", total);
        })
        .catch(() => {
          state.error = true;
        })
        .finally(() => {
          state.loading = false;
          console.log(store.state);
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

    return { state };
  }
});
</script>

<style lang="scss" scoped>
.home {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: var(--size-5);
    .title {
      font-family: var(--font-1);
      font-size: 4rem;
      color: var(--primary);
    }
  }
  .containerUsers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
