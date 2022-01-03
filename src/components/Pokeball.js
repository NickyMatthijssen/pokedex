import { motion } from "framer-motion";

const Pokeball = () => {
  return (
    <motion.div
      className="absolute top-0 z-50 w-screen h-screen"
      key="pokeball"
    >
      <motion.div
        exit={{
          y: "-150%",
          transition: {
            duration: 1,
          },
        }}
        className="h-[50vh] bg-red-500 w-full relative z-10"
      >
        <div className="z-40 absolute w-full h-2 -bottom-1 bg-black" />
        <div className="z-50 absolute h-32 w-32 rounded-full max-w-full max-h-full bg-white bottom-[-15%] left-[50%] transform translate-x-[-50%] border-8 border-black">
          <div />
        </div>
      </motion.div>
      <motion.div
        exit={{
          y: "150%",
          transition: {
            duration: 1,
          },
        }}
        className="h-[50vh] bg-white w-full relative z-5"
      />
    </motion.div>
  );
};

export default Pokeball;
