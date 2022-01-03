import { useQuery } from "@apollo/client";
import { useMatch } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";
import { fetchAllPokemon } from "../lib/queries";
import Entry from "./Entry";
import Footer from "./Footer";
import Pokeball from "./Pokeball";

const Pokedex = ({ children }) => {
  const selectedPokemon = useMatch("/:pokemon");

  const { loading, data } = useQuery(fetchAllPokemon);

  return (
    <AnimatePresence>
      {loading ? (
        <Pokeball />
      ) : (
        <motion.div key="pokedex" className="flex justify-between">
          <motion.div
            initial={{ x: 0 }}
            className="flex-1 overflow-x-hidden max-h-screen overflow-scroll"
          >
            <ul>
              {data.species.map((specy) => (
                <Entry specy={specy} key={`specy-${specy.id}`} />
              ))}
            </ul>

            <Footer />
          </motion.div>

          <AnimatePresence exitBeforeEnter initial={false}>
            {selectedPokemon && (
              <motion.div
                initial={{ x: "100%", position: "fixed" }}
                animate={{ x: 0, position: "relative" }}
                exit={{ x: "100%", position: "fixed" }}
                className="md:max-w-[50vw] w-full bg-gray-100 right-0 min-h-screen"
                transition={{ type: "spring", bounce: 0, damping: 20 }}
                key={selectedPokemon}
              >
                <div className="sticky top-0">{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Pokedex;
