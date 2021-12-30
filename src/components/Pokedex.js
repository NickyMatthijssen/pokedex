import { useQuery } from "@apollo/client";
import { Link, useMatch } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import Spinner from "../components/Spinner";
import { fetchAllPokemon } from "../lib/queries";

const Pokedex = ({ children }) => {
  const selectedPokemon = useMatch("/:pokemon");

  const { loading, data } = useQuery(fetchAllPokemon);

  const renderPokemon = useCallback(
    (pokemon) => (
      <motion.li
        key={`pokemon-${pokemon.name}`}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Link to={`/${pokemon.name}`} className="border-b block">
          <div className="container flex items-center space-x-8">
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.specy.order}.png`}
                className="w-32 h-32"
              />
            </div>

            <div>
              <h2 className="text-3xl font-semibold">
                {pokemon.specy.names[0].name}
              </h2>
              <h3 className="text-black/50 mb-0 text-base">
                #{pokemon.specy.order}
              </h3>

              <ul className="flex flex-row space-x-2">
                {pokemon.types.map(({ type }) => (
                  <li
                    className="type-icon type-icon__poison"
                    key={`pokemon-${pokemon.name}-type-${type.name}`}
                  >
                    {type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      </motion.li>
    ),
    []
  );

  if (loading) return <Spinner />;

  return (
    <div className="flex justify-between">
      <motion.div
        initial={{ x: 0 }}
        className="flex-1 overflow-x-hidden max-h-screen overflow-scroll"
      >
        <ul>{data.pokemon.map((pokemon) => renderPokemon(pokemon))}</ul>
      </motion.div>

      <AnimatePresence exitBeforeEnter initial={false}>
        {selectedPokemon && (
          <motion.div
            initial={{ x: "100%", position: "fixed" }}
            animate={{ x: 0, position: "relative" }}
            exit={{ x: "100%", position: "fixed" }}
            className="md:max-w-[50vw] w-full bg-gray-100 right-0 min-h-screen"
            transition={{ type: "spring", bounce: 0, damping: 20 }}
          >
            <div className="sticky top-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pokedex;
