import { shallowMount } from "@vue/test-utils";

import App from "@/App.vue";

describe("App component", () => {
  test("should match with the snapshot", () => {
    const wrapper = shallowMount(App);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
