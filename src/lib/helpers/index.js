import _ from "lodash";

/**
 *
 * @param {Array} pokemonMoves Array with all the moves a pokémon can learn.
 * @returns {Array} Array with moves by generation and learn method.
 */
export const movesByGenAndVersion = (pokemonMoves) => {
  // Create a temporary array.
  const array = [];

  // Loop over all pokémon moves.
  for (let pokemonMove of pokemonMoves) {
    // Get the versiongroup of a move learn method.
    let versiongroupLearnMethods =
      pokemonMove.learn_methods.versiongroup_learn_methods;
    // Get the learn method.
    let learnMethod = pokemonMove.learn_methods.name;

    // Loop over the learn methods.
    for (let versiongroupLearnMethod of versiongroupLearnMethods) {
      // Assign the version and generation id because we need those.
      let version = versiongroupLearnMethod.versiongroups.name;
      let generation_id = versiongroupLearnMethod.versiongroups.generation_id;

      // Check if there is an array item with the generation id.
      // If there is no array item, create one with the generation and an array of versions.
      if (!array[generation_id]) {
        array[generation_id] = {
          generation: generation_id,
          versions: [],
        };
      }

      // Check if there is an object with the version in the array.
      let versionObject = _.find(array[generation_id].versions, { version });

      // If not, create a version object, with an array for a list of different move learning methods.
      if (!versionObject) {
        versionObject = {
          version,
          methods: [],
        };

        // Push the version object into the array of versions.
        array[generation_id].versions.push(versionObject);
      }

      // After retrieving or creating the version object we check if the version object has a learnMethod object with the corresponding method.
      let learnMethodObject = _.find(versionObject.methods, {
        method: learnMethod,
      });

      // If there is no learn method found, we create the object for it with an empty moves array.
      if (!learnMethodObject) {
        learnMethodObject = {
          method: learnMethod,
          moves: [],
        };

        // Push the object onto the methods array.
        versionObject.methods.push(learnMethodObject);
      }

      // Check if move with learn method already exists in list.
      let moveAlreadyAdded = !_.find(learnMethodObject.moves, {
        level: pokemonMove.level,
        learn_methods: {
          name: pokemonMove.learn_methods.name,
        },
        move: {
          name: pokemonMove.move.name,
        },
      });

      if (moveAlreadyAdded) {
        // Push the move into the array of moves inside of the corresponding version -> method.
        learnMethodObject.moves.push(pokemonMove);
      }
    }
  }

  return array;
};
