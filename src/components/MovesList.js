import _ from "lodash";
import { useMemo, useState } from "react";
import { normalize } from "../lib/helpers";

const MovesList = ({ moves, method }) => {
  const isLevelUp = method.name === "level-up";
  const isMachine = method.name === "machine";
  const isTutor = method.name === "tutor";

  const defaultOrder = useMemo(() => {
    if (isLevelUp) return "level";

    if (isMachine) return "move.names[0].name";

    if (isTutor) return "move.names[0].name";
  }, [method]);

  const [order] = useState(defaultOrder);

  const orderedMoves = useMemo(() => _.orderBy(moves, order), [order]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="details details--moves">
        <thead>
          <tr>
            {isLevelUp && <th>LV.</th>}
            <th>Move</th>
            <th>Type</th>
            <th>Cat.</th>
            <th>Power</th>
            <th>Acc.</th>
          </tr>
        </thead>
        <tbody>
          {orderedMoves.map(({ move, level, learn_methods }, index) => (
            <tr key={`move-${index}`}>
              {isLevelUp && <th>{level}</th>}
              <td className="capitalize">{normalize(move.name)}</td>
              <td>
                <img
                  src={`/move-${move.damange_class.name}.png`}
                  className="w-8"
                />
              </td>
              <td>{move.power ?? "-"}</td>
              <td>{move.pp ?? "-"}</td>
              <td>{move.accuracy ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovesList;
