import { shallowMount } from "@vue/test-utils";
import FilterUsers from "@/components/FilterUsers.vue";
import { createStore } from "vuex";

describe("Filter Users", () => {
  const store = createStore({
    state() {
      return {
        query: ["location:BRASIL", "location:BRAZIL"]
      };
    },
    mutations: {
      changeQuery(state: any, payload: any) {
        state.query = payload;
      }
    }
  });

  const build = () => {
    const wrapper = shallowMount(FilterUsers, {
      global: {
        plugins: [store]
      }
    });
    return wrapper;
  };
  it("renders the component", () => {
    // arrange
    const wrapper = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders filter", () => {
    // arrange
    const wrapper = build();
    const filter = wrapper.find(".filterContainer");
    expect(filter.exists()).toBe(true);
  });

  // it("filter less 3 caracters", async () => {
  //   const wrapper = build();
  //   const textInput = wrapper.find('input[type="text"]');
  //   await textInput.setValue("12");
  //   await wrapper.find("button").trigger("click");

  // });
});
