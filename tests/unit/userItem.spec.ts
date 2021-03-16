import { shallowMount, VueWrapper } from "@vue/test-utils";
import UserItem from "@/components/UserItem.vue";

describe("User Details", () => {
  let wrapper: VueWrapper<any>;
  const user = {
  avatar_url: "https://avatars.githubusercontent.com/u/48557502?v=4",
  html_url: "https://github.com/Victorb999",
  id: 48557502,
  login: "Victorb999",
  };

  beforeAll(() => {
    wrapper = shallowMount(UserItem, {
      props: { user: user }
    });
  });
  it('render link', () => {
    const link = wrapper.find("a");    
    expect(link.attributes('href')).toContain(user.html_url);
  })

  it("click in header, render details", async () => {
    const last = wrapper.find(".userHeader");
    await last.trigger("click");    
    expect(wrapper.html()).toContain("user-details");
  });

});
