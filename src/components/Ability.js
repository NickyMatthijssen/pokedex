import _ from "lodash";
import { useMemo } from "react";

const Ability = ({ ability, is_hidden }) => {
  const { names, effects } = ability;

  const name = useMemo(() => {
    const { name } = names[0];

    return name;
  }, [names]);

  const effect = useMemo(() => {
    if (!effects || effects.length < 1) return null;

    const { effect } = effects[0];

    return effect;
  }, [effects]);

  return (
    <li className="mb-4">
      <h4 className="font-medium mb-1">
        {name} {is_hidden && <span>(hidden)</span>}
      </h4>

      <p className="paragraph">{effect}</p>
    </li>
  );
};

export default Ability;
