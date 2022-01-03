import { Link } from "@reach/router";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Types from "./Types";

const Entry = ({ specy }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <Link to={`/${specy.name}`} className="border-b block">
        <div className="container flex items-center space-x-8">
          <div>
            <LazyLoadImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${specy.id}.png`}
              className="w-32 h-32"
              loading="lazy"
              alt={`Official ${specy.name} artwork`}
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold">{specy.names[0].name}</h2>
            <h3 className="text-black/50 mb-0 text-base">#{specy.id}</h3>

            <Types types={specy.pokemon[0].types} />
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

export default Entry;
