import getPokemonOptions, {
  getPokemons,
  getPokemonNames,
} from "@/helpers/getPokemonOptions";

import { pokemonsMock } from "../mocks";

describe("getPokemonOptions helpers", () => {
  test("should return an array of numbers", () => {
    const pokemons = getPokemons();

    expect(pokemons.length).toBe(650);

    pokemons.every((id) => expect(typeof id).toBe("number"));
  });

  test("should return an array of 4 items with pokemon names", async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4]);

    expect(pokemons.length).toBe(4);
    expect(pokemons).toStrictEqual(pokemonsMock);
  });

  test("getPokemonOptions should return an array with mixed pokemons", async () => {
    const pokemons = await getPokemonOptions();

    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
    ]);
  });
});
