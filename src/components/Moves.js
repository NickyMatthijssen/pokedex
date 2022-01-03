import _ from "lodash";
import { useMemo } from "react";
import { movesByGenAndVersion, normalize } from "../lib/helpers";
import MovesList from "./MovesList";
import { Tab as MyTab, TabGroup, TabList, TabPanel, TabPanels } from "./Tab";

const Moves = ({ pokemonMoves }) => {
  const generations = useMemo(
    () => movesByGenAndVersion(pokemonMoves),
    [pokemonMoves]
  );

  return (
    <div>
      <TabGroup>
        <TabList>
          {generations.map(({ generation }) => (
            <MyTab key={`generation-${generation}-tab`} layoutId="generation">
              Generation {generation}
            </MyTab>
          ))}
        </TabList>

        <TabPanels>
          {generations.map(({ generation, group }) => (
            <TabPanel key={`generation-${generation}-panel`}>
              <TabGroup>
                <TabList>
                  {group.map(({ group, versions }) => (
                    <MyTab key={`generation-${group}-tab`} layoutId="version">
                      {versions.map(
                        (version, index) =>
                          `${normalize(version.name)} ${
                            index + 1 < versions.length ? "/" : ""
                          } `
                      )}
                    </MyTab>
                  ))}
                </TabList>

                <TabPanels>
                  {group.map(({ group, methods }) => (
                    <TabPanel key={`generation-${group}-panel`}>
                      <div className="flex flex-col space-y-12">
                        {methods.map(({ method, moves }) => (
                          <div key={`generation-${group}-${method.name}`}>
                            <div className="mb-4">
                              <h4 className="text-lg font-semibold mb-1 capitalize">
                                {normalize(method.name)}
                              </h4>

                              <p className="paragraph">
                                {method.descriptions[0].description}
                              </p>
                            </div>

                            <MovesList moves={moves} method={method} />
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Moves;
