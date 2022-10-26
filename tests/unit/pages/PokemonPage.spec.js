import { shallowMount, mount } from "@vue/test-utils";

import PokemonPage from "@/pages/PokemonPage";

import { pokemonsMock } from "../mocks";

describe("PokemonPage component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should call mixPokemonArray when the component is mounted", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );
    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalledTimes(1);
  });

  test("should match snapshot when pokemons are loaded", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemonsMock,
          pokemon: pokemonsMock[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should display PokemonPictures and PokemonOptions components", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemonsMock,
          pokemon: pokemonsMock[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(picture.attributes("pokemonid")).toBe("1");
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("should test checkAnswer method", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemonsMock,
          pokemon: pokemonsMock[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(`Correct, ${pokemonsMock[0].name}`);

    await wrapper.vm.checkAnswer(2);
    expect(wrapper.find("h2").text()).toBe(
      `Ups, it was ${pokemonsMock[0].name}`
    );
  });
});
