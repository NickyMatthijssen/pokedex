import _ from "lodash";
import { useMemo } from "react";
import { movesByGenAndVersion } from "../lib/helpers";
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
          {generations.map(({ generation, versions }) => (
            <TabPanel key={`generation-${generation}-panel`}>
              <TabGroup>
                <TabList>
                  {versions.map(({ version }) => (
                    <MyTab key={`generation-${version}-tab`} layoutId="version">
                      {version}
                    </MyTab>
                  ))}
                </TabList>

                <TabPanels>
                  {versions.map(({ version, methods }) => (
                    <TabPanel key={`generation-${version}-panel`}>
                      <div className="flex flex-col space-y-12">
                        {methods.map(({ method, moves }) => (
                          <div key={`generation-${version}-${method}`}>
                            <div className="mb-4">
                              <h4 className="text-lg font-semibold mb-1">
                                {method}
                              </h4>

                              <p className="paragraph">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse elit dolor,
                                condimentum eu ultricies id.
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
