<template>
  <div class="userContainer">
    <img :src="props.user.avatar_url" alt="avatar" class="avatar" />
    <span>{{ props.user.login }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Users } from "@/api/InterfacesGithubUsers";

export default defineComponent({
  name: "UserItem",
  props: {
    user: {
      type: Object as PropType<Users>,
      required: true
    }
  },
  setup(props) {
    return { props };
  }
});
</script>

<style lang="scss">
.userContainer {
  display: flex;
  align-items: center;
  padding: var(--size-2);
  margin: var(--size-2) 0;
  border-radius: var(--size-1);
  border-left: var(--size-1) solid var(--primary);
  width: 80vw;
  box-shadow: 0 0 var(--size-1) rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  span {
    margin-left: var(--size-2);
  }
  &:hover {
    background-color: var(--gray-2);
  }
}
</style>
