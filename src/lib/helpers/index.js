import _ from "lodash";

/**
 *
 * @param {Array} pokemonMoves Array with all the moves a pokémon can learn.
 * @returns {Array} Array with moves by generation and learn method.
 */
export const movesByGenAndVersion = (pokemonMoves) => {
  // Create a temporary array.
  const array = [];

  for (let pokemonMove of pokemonMoves) {
    let generation = pokemonMove.versions.generation_id;
    let group = pokemonMove.versions.name;
    let versions = pokemonMove.versions.version;
    let method = pokemonMove.method;

    let object = _.find(array, { generation });

    if (!object) {
      object = {
        generation,
        group: [],
      };

      array[generation] = object;
    }

    let object2 = _.find(object.group, { group });

    if (!object2) {
      object2 = {
        group,
        versions,
        methods: [],
      };

      object.group.push(object2);
    }

    let object3 = _.find(object2.methods, { method });

    if (!object3) {
      object3 = {
        method,
        moves: [],
      };

      object2.methods.push(object3);
    }

    object3.moves.push(pokemonMove);
  }

  return array;
};

/**
 *
 * @param {Array} array  The array with languages.
 * @param {String} locale The key of the current localization.
 * @returns {Object} The object of the selected language.
 */
export const getLanguage = (array, locale = "en") => {
  return (
    _.find(array, {
      language: {
        iso639: locale,
      },
    }) ?? null
  );
};

/**
 * Normalizes a string retrieved from the Pokeapi.
 *
 * @param {String} string String to normalize.
 * @returns {String} Normalized string.
 */
export const normalize = (string) => {
  return string.replace("-", " ");
};
