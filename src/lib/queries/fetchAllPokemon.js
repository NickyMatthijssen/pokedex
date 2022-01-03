import { gql } from "@apollo/client";

const fetchAllPokemon = gql`
  query FetchAllPokemon {
    species: pokemon_v2_pokemonspecies(order_by: { id: asc }) {
      id
      name
      order
      pokemon: pokemon_v2_pokemons {
        height
        weight
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
      names: pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
      ) {
        name
      }
    }
  }
`;

export default fetchAllPokemon;
