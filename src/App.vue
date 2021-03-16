<template>
  <div class="all" :class="state.themeDark ? 'theme-dark' : ''">
    <div class="tagget">
      <input
        class="checkbox"
        type="checkbox"
        name="checkbox"
        id="checkbox"
        @click="state.themeDark = !state.themeDark"
      />
      <label for="checkbox" class="label">
        <div class="moon">🌙</div>
        <div class="sun">🌞</div>
        <div class="ball"></div>
      </label>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    interface Util {
      themeDark: boolean;
    }
    const state = reactive({
      themeDark: false
    }) as Util;
    return { state };
  }
});
</script>
<style lang="scss">
.tagget {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: var(--size-3);
  padding-bottom: 0;
}

.tagget .checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox:checked + .label .ball {
  transform: translateX(-24px);
}
.tagget .label {
  background-color: var(--gray-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  position: relative;
  padding: 6px;
  height: 32px;
  border: 3px solid;
  width: 56px;
}

.tagget .label .ball {
  background-color: var(--white);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 27px;
  height: 22px;
  width: 22px;
  transition: transform 0.2s linear;
}
.tagget .label .moon {
  margin: 0;
}

.tagget .label .sun {
  margin: 0;
}
</style>
