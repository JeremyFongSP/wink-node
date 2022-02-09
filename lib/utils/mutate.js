import winkClient from "./winkClient.js";

export default async (mutation, variables) => {
  const response = await winkClient.mutate({
    mutation: mutation,
    variables: variables,
  });

  return response;
};
