import { gql } from "@apollo/client";

const fetchPokemon = gql`
  query fetchPokemon($pokemon: String!) {
    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $pokemon } }) {
      is_default
      pokemon_moves: pokemon_v2_pokemonmoves {
        level
        order
        move: pokemon_v2_move {
          name
          accuracy
          power
          pp
          damange_class: pokemon_v2_movedamageclass {
            name
          }
          names: pokemon_v2_movenames(
            where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
          ) {
            name
          }
        }
        learn_methods: pokemon_v2_movelearnmethod {
          name
          versiongroup_learn_methods: pokemon_v2_versiongroupmovelearnmethods {
            versiongroups: pokemon_v2_versiongroup {
              generation_id
              name
            }
          }
        }
      }
      specy: pokemon_v2_pokemonspecy {
        id
        name
        order
        names: pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { iso639: { _eq: "en" } } }
        ) {
          name
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
    }
  }
`;

export default fetchPokemon;
