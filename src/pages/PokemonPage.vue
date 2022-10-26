<template>
  <h1 v-if="!pokemon">Please wait...</h1>

  <div v-else>
    <h1>Who is that Pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemons" @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonsOptions from "@/helpers/getPokemonOptions";

export default {
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      pokemons: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemons = await getPokemonsOptions();
      this.pokemon = this.pokemons[Math.floor(Math.random() * 4)];
    },
    checkAnswer(selectedPokemonId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (selectedPokemonId === this.pokemon.id) {
        this.message = `Correct, ${this.pokemon.name}`;
      } else {
        this.message = `Ups, it was ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemons = [];
      this.pokemon = null;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style></style>
