import { motion } from "framer-motion";

const Stat = ({ pokemonStat }) => {
  const name = pokemonStat.stat.names[0].name;

  return (
    <div className="flex space-x-4 items-center">
      <div className="w-32">
        <p>{name}</p>
      </div>

      <div className="flex-1">
        <div className="rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="w-full h-2.5 bg-green-300 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${Math.ceil((pokemonStat.base_stat / 200) * 100)}%`,
            }}
          />
        </div>
      </div>

      <p>{pokemonStat.base_stat} / 200</p>
    </div>
  );
};

export default Stat;
