import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";
import { createStore } from "vuex";

describe("Filter Users", () => {
  const store = createStore({
    state() {
      return {
        numberUsers: 1000,
        pageNumber: 1,
        userPerPage: 20,
        pages: 50,
      };
    },
    mutations: {
      setNumberUsers(state: any, payload: any)  {
        state.numberUsers = payload;
        state.pages = Math.ceil(state.numberUsers / state.userPerPage);
      },
      setPageNumber(state, payload) {
        state.pageNumber = payload;
      },
      setUserPerPage(state, payload) {
        state.userPerPage = payload;
      },
      setPages(state, payload) {
        state.pages = payload;
      },
    }
  });

  const build = () => {
    const wrapper = shallowMount(Pagination, {
      global: {
        plugins: [store]
      }
    });
    return wrapper;
  };

  it("click next", async () => {
    const wrapper = build();
    const next = wrapper.find("#next");
    await next.trigger("click");
    expect(wrapper.html()).toContain("6");
  });

  it("click last", async () => {
    const wrapper = build();
    const last = wrapper.find("#last");
    await last.trigger("click");
    expect(wrapper.html()).toContain("50");
  });

  it("first not show", async () => {
    const wrapper = build();
    const first = wrapper.find("#first");
    expect(first.exists()).toBe(false);
  });

  it("first show", async () => {
    const wrapper = build();
    const next = wrapper.find("#next");
    await next.trigger("click");
    const first = wrapper.find("#first");
    expect(first.exists()).toBe(true);
  });

  it("previous not show", async () => {
    const wrapper = build();
    const previous = wrapper.find("#previous");
    expect(previous.exists()).toBe(false);
  });

  it("previous show", async () => {
    const wrapper = build();
    const next = wrapper.find("#next");
    await next.trigger("click");
    const previous = wrapper.find("#previous");
    expect(previous.exists()).toBe(true);
  });

});
