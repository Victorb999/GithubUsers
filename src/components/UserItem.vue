<template>
  <div class="userContainer">
    <div class="userHeader" @click="state.details = !state.details">
      <div class="perfil">
        <img :src="props.user.avatar_url" alt="avatar" class="avatar" />
        <span>{{ props.user.login }}</span>
      </div>
      <button class="btn-primary">
        <a :href="props.user.html_url" alt="link perfil github" target="_blank">
          Visite o perfil
        </a>
      </button>
    </div>
    <user-details v-if="state.details" :user="props.user.login" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Users } from "@/api/InterfacesGithubUsers";
import UserDetails from "./UserDetails.vue";

export default defineComponent({
  name: "UserItem",
  components: { UserDetails },
  props: {
    user: {
      type: Object as PropType<Users>,
      required: true
    }
  },
  setup(props) {
    interface Data {
      details: boolean;
    }
    const state = reactive({
      details: false
    }) as Data;

    return { props, state };
  }
});
</script>

<style lang="scss">
.userContainer {
  margin: var(--size-2) 0;
  border-radius: var(--size-1);
  border-left: var(--size-1) solid var(--primary);
  width: 80vw;
  box-shadow: 0 1px var(--size-1) var(--gray-2);
  transition: all 0.3s;
  .userHeader {
    padding: var(--size-2);
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    .perfil {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    span {
      margin-left: var(--size-2);
    }
    &:hover {
      background-color: var(--aux);
      span {
        color: var(--white);
      }
      .btn-primary {
        background-color: var(--primary-dark);
        &:hover {
          background-color: var(--dark);
        }
      }
    }
  }
}
.theme-dark {
  .userContainer {
    box-shadow: 0 0px var(--size-1) #111;
    background-color: darken(#1f1b24, 10%);
  }
}
@media (min-width: 1366px) {
  .userContainer {
    width: 50vw;
  }
}
@media (max-width: 400px) {
  .userContainer {
    .userHeader {
      display: block;
    }
  }
}
</style>
