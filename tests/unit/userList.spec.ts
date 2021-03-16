import { shallowMount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";
import { createStore } from "vuex";

describe("Home", () => {
  const store = createStore({
    state() {
      return {
        query: ["location:BRASIL", "location:BRAZIL"],
        userPerPage: 20,
        pages: 50,
      };
    },
    mutations: {
      changeQuery(state: any, payload: any) {
        state.query = payload;
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
    const wrapper = shallowMount(UserList, {
      global: {
        plugins: [store]
      }
    });
    return wrapper;
  };

  it('renders the component', () => {
    // arrange
    const wrapper = build();
    
    // assert
    expect(wrapper.html()).toMatchSnapshot()
  });
  

});
