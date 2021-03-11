<template>
  <div class="home">
    <h1>Hello</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home"
});
</script>

<style lang="scss" scoped>
.home {
  font-family: var(--font-2);
  font-size: 2rem;
}
</style>
