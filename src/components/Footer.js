import { useMemo } from "react";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-gray-100 text-sm">
      <div className="container text-center text-gray-600 py-4">
        <p>
          Pokémon images {"&"} names © 1995-{year} Nintendo/Game Freak.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
