import * as React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

const SAY_HELLO = gql`
  query {
    hello
  }
`;


const App = () => {
  const { loading, error, data } = useQuery(SAY_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <p>{JSON.stringify(data)}</p>
}

const AppWithApollo = () => {
  return <ApolloProvider client={client}>
    <h1>Hello World</h1>
    <App />
  </ApolloProvider>
}

export default AppWithApollo
