import pokemonApi from "@/api/pokemonApi";

export const getPokemons = () => {
  const pokemons = Array.from(Array(650));

  return pokemons.map((_, index) => index + 1);
};

export const getPokemonNames = async ([
  pokemon1Id,
  pokemon2Id,
  pokemon3Id,
  pokemon4Id,
] = []) => {
  const promiseArr = [
    pokemonApi.get(`${pokemon1Id}`),
    pokemonApi.get(`${pokemon2Id}`),
    pokemonApi.get(`${pokemon3Id}`),
    pokemonApi.get(`${pokemon4Id}`),
  ];

  const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all(
    promiseArr
  );

  return [
    { name: pokemon1.data.name, id: pokemon1.data.id },
    { name: pokemon2.data.name, id: pokemon2.data.id },
    { name: pokemon3.data.name, id: pokemon3.data.id },
    { name: pokemon4.data.name, id: pokemon4.data.id },
  ];
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemons;
};

export default getPokemonOptions;
