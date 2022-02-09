import winkClient from "./winkClient.js";

export default async (query, variables) => {
  console.log("Fetching...");
  const response = await winkClient.query({
    query: query,
    variables: variables,
  });

  return response;
};
