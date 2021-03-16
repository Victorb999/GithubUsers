<template>
  <div class="home">
    <header>
      <h1 class="title">Github Users</h1>
    </header>
    <filter-users />
    <user-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterUsers from "@/components/FilterUsers.vue";
import UserList from "@/components/UserList.vue";

export default defineComponent({
  components: { FilterUsers, UserList },
  name: "Home"
});
</script>

<style lang="scss" scoped>
.home {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: var(--size-5);
    .title {
      font-family: var(--font-2);
      letter-spacing: var(--size-1);
      font-size: 4rem;
      color: var(--primary);
      font-weight: 900;
    }
  }
}
</style>
