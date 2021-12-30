import _ from "lodash";
import { useMemo, useState } from "react";
import "./MovesList.css";

/** TODO:: Fetch tm/tr/hm data from api. */

const MovesList = ({ moves, method }) => {
  const isLevelUp = method === "level-up";
  const isMachine = method === "machine";
  const isTutor = method === "tutor";

  const defaultOrder = useMemo(() => {
    if (isLevelUp) return "level";

    if (isMachine) return "move.names[0].name";

    if (isTutor) return "move.names[0].name";
  }, [method]);

  const [order, setOrder] = useState(defaultOrder);

  const orderedMoves = useMemo(() => _.orderBy(moves, order), [order]);

  return (
    <div className="move-table">
      <table className="move-table__table">
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
              <td>{move.names[0].name}</td>
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
