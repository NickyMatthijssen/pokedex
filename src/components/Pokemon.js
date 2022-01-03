import { XIcon } from "@heroicons/react/outline";
import { Link, Redirect } from "@reach/router";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import Stat from "./Stat";
import Ability from "./Ability";
import { AnimatePresence, motion } from "framer-motion";
import { fetchPokemon } from "../lib/queries";
import _ from "lodash";
import Moves from "./Moves";
import Types from "./Types";
import { useEffect, useState } from "react";

const section = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
    },
  },
  exit: {
    y: 20,
  },
};

const Pokemon = ({ pokemon }) => {
  const { loading, data, error } = useQuery(fetchPokemon, {
    variables: {
      pokemon,
    },
  });

  const [form, setForm] = useState(0);

  useEffect(() => {
    setForm(0);
  }, [pokemon]);

  if (loading) return <Spinner />;

  if (!data.specy[0] || error) return <Redirect to="/" />;

  const {
    names,
    id,
    capture_rate,
    base_happiness,
    hatch_counter,
    pokemon: pokemon_object,
  } = data.specy[0];

  const {
    id: pokemon_id,
    types,
    height,
    weight,
    abilities,
    pokemon_stats,
    pokemon_moves,
  } = pokemon_object[form];

  const name = names[0].name;

  return (
    <AnimatePresence exitBeforeEnter initial>
      <div className="overflow-y-scroll max-h-screen" key={pokemon}>
        <div className="py-4 sticky top-0 bg-gray-300 z-50">
          <div className="container flex justify-between items-center ">
            <motion.h2
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              className="text-4xl font-semibold"
            >
              {name}
            </motion.h2>

            <Link to="/">
              <XIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pokemon_object.length > 1 && (
            <div className="w-full bg-gray-200">
              <div className="lg:container flex flex-wrap flex-grow">
                {pokemon_object.map((pokemon, index) => (
                  <button
                    key={`form-${index}`}
                    className="relative w-full lg:w-auto block"
                    onClick={() => setForm(index)}
                  >
                    <span className="block py-2.5 px-4">
                      {index === 0 ? name : pokemon.forms[0].names[0].name}
                    </span>

                    {index === form && (
                      <motion.div
                        layoutId="form-divider"
                        className="h-full lg:h-1 w-1 lg:w-full bg-slate-900 absolute bottom-0 lg:rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="container">
            <div className=" py-4 flex flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-16">
              <div className="flex-1">
                <div className="w-72 h-72 m-auto">
                  <motion.img
                    initial={{ opacity: 0, left: -100 }}
                    animate={{ opacity: 1, left: 0 }}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon_id}.png`}
                    alt={`Official ${name} artwork`}
                    className="object-contain relative"
                    key={pokemon_id}
                  />
                </div>
              </div>

              <motion.section {...section}>
                <h2 className="section__title">Pokedex data</h2>

                <table className="details details--pokemon">
                  <tbody>
                    <tr>
                      <th>National #</th>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>
                        <Types types={types} />
                      </td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{height / 10} m</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{weight / 10} kg</td>
                    </tr>
                  </tbody>
                </table>
              </motion.section>

              <motion.section {...section}>
                <h2 className="section__title">Training</h2>

                <table className="details details--pokemon">
                  <tbody>
                    <tr>
                      <th>Catch rate</th>
                      <td>{capture_rate}</td>
                    </tr>
                    <tr>
                      <th>Base hapiness</th>
                      <td>{base_happiness}</td>
                    </tr>
                    <tr>
                      <th>Hatch counter</th>
                      <td>{hatch_counter}</td>
                    </tr>
                  </tbody>
                </table>
              </motion.section>
            </div>
          </div>

          <div className="border-t py-4">
            <div className="container flex flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-16">
              <motion.section {...section}>
                <h3 className="section__title">Base stats</h3>

                {pokemon_stats.map((pokemon_stat) => (
                  <Stat
                    pokemonStat={pokemon_stat}
                    key={pokemon_stat.stat.name}
                  />
                ))}
              </motion.section>

              <motion.section {...section}>
                <h3 className="section__title">Abilities</h3>

                <ul>
                  {abilities.nodes.map(({ id, ...props }) => (
                    <Ability key={`ability-${id}`} {...props} />
                  ))}
                </ul>
              </motion.section>

              <motion.section {...section} className="lg:col-span-2">
                <h3 className="section__title">Moves</h3>

                <Moves pokemonMoves={pokemon_moves} />
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Pokemon;
