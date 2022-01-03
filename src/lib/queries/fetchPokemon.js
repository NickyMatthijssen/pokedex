import { gql } from "@apollo/client";

const fetchPokemon = gql`
  query fetchPokemon($pokemon: String!) {
    specy: pokemon_v2_pokemonspecies(where: { name: { _eq: $pokemon } }) {
      id
      name
      capture_rate
      base_happiness
      hatch_counter
      names: pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
      ) {
        name
      }
      pokemon: pokemon_v2_pokemons {
        id
        name
        is_default
        height
        weight
        pokemon_moves: pokemon_v2_pokemonmoves {
          method: pokemon_v2_movelearnmethod {
            name
            descriptions: pokemon_v2_movelearnmethoddescriptions(
              where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
            ) {
              description
            }
          }
          versions: pokemon_v2_versiongroup {
            name
            generation_id
            version: pokemon_v2_versions {
              name
            }
          }
          level
          move: pokemon_v2_move {
            name
            accuracy
            power
            pp
            damange_class: pokemon_v2_movedamageclass {
              name
            }
          }
        }
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities_aggregate {
          nodes {
            id
            is_hidden
            ability: pokemon_v2_ability {
              effects: pokemon_v2_abilityeffecttexts(
                where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
              ) {
                effect
              }
              names: pokemon_v2_abilitynames(
                where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
              ) {
                name
              }
            }
          }
        }
        pokemon_stats: pokemon_v2_pokemonstats {
          base_stat
          effort
          stat: pokemon_v2_stat {
            name
            names: pokemon_v2_statnames(
              where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
            ) {
              name
            }
          }
        }
        forms: pokemon_v2_pokemonforms {
          names: pokemon_v2_pokemonformnames(
            where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
          ) {
            name
          }
        }
      }
    }
  }
`;

export default fetchPokemon;
