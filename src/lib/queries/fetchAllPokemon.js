import { gql } from "@apollo/client";

const fetchAllPokemon = gql`
  query FetchAllPokemon {
    pokemon: pokemon_v2_pokemon(where: { is_default: { _eq: true } }) {
      name
      is_default
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      specy: pokemon_v2_pokemonspecy {
        name
        order
        names: pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
        ) {
          name
        }
      }
    }
  }
`;

export default fetchAllPokemon;
