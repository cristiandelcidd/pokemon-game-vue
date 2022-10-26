import { shallowMount } from "@vue/test-utils";

import PokemonPicture from "@/components/PokemonPicture";

describe("Pokemon picture", () => {
  test("should match with the snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 1, showPokemon: false },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should be show the hidden image and the pokemon 100", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: false },
    });

    const [image1, image2] = wrapper.findAll("img");

    expect(image1.exists()).toBeTruthy();
    expect(image2).toBe(undefined);
    expect(image1.classes("hidden-pokemon")).toBeTruthy();
    expect(image1.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );

    // expect(image1.attributes().src).toBe(
    //   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    // );
  });

  test("should show the pokemon if showPokemon=true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: true },
    });

    const image = wrapper.find("img");

    expect(image.exists()).toBeTruthy();
    expect(image.classes("hidden-pokemon")).toBeFalsy();
    expect(image.classes("fade-in")).toBeTruthy();
  });
});
