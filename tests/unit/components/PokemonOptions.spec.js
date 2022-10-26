import { shallowMount } from "@vue/test-utils";

import PokemonOptions from "@/components/PokemonOptions";
import { pokemonsMock } from "../mocks";

describe("PokemonOptions component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: pokemonsMock,
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
    // expect(wrapper.html()).toMatchInlineSnapshot(`
    //   <div class="options-container">
    //     <ul>
    //       <li>bulbasaur</li>
    //       <li>ivysaur</li>
    //       <li>venusaur</li>
    //       <li>charmander</li>
    //     </ul>
    //   </div>
    // `);
  });

  test("should display all 4 options correctly", () => {
    const liTags = wrapper.findAll("li");
    expect(liTags.length).toBe(4);

    const [pokemon1, pokemon2, pokemon3, pokemon4] = wrapper.findAll("li");

    expect(pokemon1.text()).toBe("bulbasaur");
    expect(pokemon2.text()).toBe("ivysaur");
    expect(pokemon3.text()).toBe("venusaur");
    expect(pokemon4.text()).toBe("charmander");
  });

  test("should emit selection with their respective parameters on click", () => {
    const [pokemon1, pokemon2, pokemon3, pokemon4] = wrapper.findAll("li");

    pokemon1.trigger("click");
    pokemon2.trigger("click");
    pokemon3.trigger("click");
    pokemon4.trigger("click");

    // console.log(wrapper.emitted("selection")); // [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ]
    expect(wrapper.emitted("selection").length).toBe(4);
    expect(wrapper.emitted("selection")[0]).toEqual([1]);
    expect(wrapper.emitted("selection")[1]).toEqual([2]);
    expect(wrapper.emitted("selection")[2]).toEqual([3]);
    expect(wrapper.emitted("selection")[3]).toEqual([4]);
  });
});
