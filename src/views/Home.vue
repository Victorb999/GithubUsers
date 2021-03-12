<template>
  <div class="home">
    <header>
      <h1 class="title">Github Users</h1>
    </header>
    <div class="containerUsers">
      total de registros: {{ state.users.total_count }}
      <div v-for="user in state.users.items" :key="user.id">
        <user-item :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { Users } from "@/api/InterfacesGithubUsers";
import { getUsers } from "@/api/ApiGithub";
import UserItem from "@/components/UserItem.vue";

export default defineComponent({
  components: { UserItem },
  name: "Home",
  setup() {
    interface Data {
      users: Users;
      error: boolean;
      loading: boolean;
    }
    const state = reactive({
      users: {} as Users,
      error: false,
      loading: false
    }) as Data;

    async function getUsersGithub() {
      state.loading = true;
      await getUsers("location:BRAZIL", 1)
        .then(response => {
          state.users = response;
        })
        .catch(() => {
          state.error = true;
        })
        .finally(() => {
          state.loading = false;
        });
    }

    onMounted(() => {
      getUsersGithub();
    });

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
