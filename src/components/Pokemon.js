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

const titles = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

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
  const { loading, data } = useQuery(fetchPokemon, {
    variables: {
      pokemon,
    },
  });

  if (loading) return <Spinner />;

  if (!data.pokemon[0]) return <Redirect to="/" />;

  const {
    specy: { names, id, order },
    abilities,
    pokemon_stats,
    pokemon_moves,
  } = data.pokemon[0];

  const name = names[0].name;

  return (
    <AnimatePresence initial={true}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-y-scroll max-h-screen"
        layoutId="pokemon"
      >
        <div className="py-4 border-b sticky top-0 bg-gray-300 z-50">
          <div className="container flex justify-between items-center ">
            <motion.h2
              variants={titles}
              animate="animate"
              initial="initial"
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

        <div className="container">
          <div className=" py-4 grid grid-cols-1 xl:grid-cols-2 gap-x-8">
            <div className="flex-1">
              <div className="w-72 h-72 m-auto">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  className="object-contain"
                />
              </div>
            </div>

            <section>
              <table>
                <tbody>
                  <tr>
                    <td>National #</td>
                    <td>{order}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                  </tr>
                  <tr>
                    <td>Species</td>
                  </tr>
                  <tr>
                    <td>Height</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>

        <div className="border-t py-4">
          <div className="container flex flex-col xl:grid xl:grid-cols-2 gap-16">
            <motion.section
              variants={section}
              initial="initial"
              animate="animate"
              className="section"
            >
              <h3 className="section__title">Base stats</h3>

              {pokemon_stats.map((pokemon_stat) => (
                <Stat pokemonStat={pokemon_stat} key={pokemon_stat.stat.name} />
              ))}
            </motion.section>

            <motion.section
              variants={section}
              initial="initial"
              animate="animate"
              className="section"
            >
              <h3 className="section__title">Abilities</h3>

              <ul>
                {abilities.nodes.map(({ id, ...props }) => (
                  <Ability key={`ability-${id}`} {...props} />
                ))}
              </ul>
            </motion.section>

            <motion.section
              variants={section}
              initial="initial"
              animate="animate"
              className="section lg:col-span-2"
            >
              <h3 className="section__title">Moves</h3>

              <Moves pokemonMoves={pokemon_moves} />
            </motion.section>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Pokemon;
