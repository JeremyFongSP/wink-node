import { WINK_GRAPHQL_URL } from "../../config/url.js";
import fetch from "cross-fetch";
import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache, HttpLink } = pkg;

const client = new ApolloClient({
  link: new HttpLink({ uri: WINK_GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});

export default async (query, variables) => {
  const response = await client.query({
    query: query,
    variables: variables,
  });

  return response;
};
