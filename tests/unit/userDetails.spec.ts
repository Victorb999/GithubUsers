import { nextTick } from "vue";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import UserDetails from "@/components/UserDetails.vue";

describe("User Details", () => {
  let wrapper: VueWrapper<any>;
  const user = "victorb999";

  beforeAll(() => {
    wrapper = shallowMount(UserDetails, {
      props: { user: user }
    });
  });

  it("renders user", () => {
    expect(wrapper.props('user')).toBe(user)
  });
});
