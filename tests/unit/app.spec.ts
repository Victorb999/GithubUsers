import { shallowMount, flushPromises } from "@vue/test-utils";
import App from "@/App.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


describe("App.vue", () => {
  it("test the dark theme", async () => {
    router.push("/");
    await router.isReady();

    const wrapper = shallowMount(App, {
      global: {
        plugins: [router]
      }
    });
    await wrapper.find("#checkbox").trigger("click");

    expect(wrapper.classes("theme-dark")).toBe(true);
  });

});
