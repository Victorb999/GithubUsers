import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home", () => {
  
  it('Should renders the component', () => {
    // arrange
    const wrapper = shallowMount(Home)
    
    // assert
    expect(wrapper.html()).toMatchSnapshot()
  });
  
  it('Should renders Title', () => {
    // arrange
    const wrapper = shallowMount(Home)
    const text = wrapper.find('h1')

    expect(text.text()).toContain('Github Users')
  });


});
