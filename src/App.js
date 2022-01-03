import { Router } from "@reach/router";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Pokedex path="/">
          <Pokemon path="/:pokemon" />
        </Pokedex>
      </Router>
    </ApolloProvider>
  );
}

export default App;
