import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import FilterUsers from "@/components/FilterUsers.vue";

describe("Home", () => {
  
  it('renders the component', () => {
    // arrange
    const wrapper = shallowMount(Home)
    
    // assert
    expect(wrapper.html()).toMatchSnapshot()
  });
  it('renders Title', () => {
    // arrange
    const wrapper = shallowMount(Home)
    const text = wrapper.find('h1')

    expect(text.text()).toContain('Github Users')
  });

  // it('renders filter', () => {
  //   // arrange
  //   const wrapper = shallowMount(Home)
  //   const filter = wrapper.find('.filterContainer')
  //   expect(filter.exists()).toBe(true)
  // });


});
