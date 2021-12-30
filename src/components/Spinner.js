import { motion } from "framer-motion";

const spinner = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Spinner = () => (
  <motion.div
    variants={spinner}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex justify-center items-center w-full h-screen"
  >
    <div className="border-8 border-transparent border-t-red-400 animate-spin w-24 h-24 rounded-full" />
  </motion.div>
);

export default Spinner;
