import query from "../utils/query.js";
import { findWinksSentQuery } from "./GraphQLStrings.js";

export default async function (specs) {
  const api = specs.api;
  var user = null;

  if (specs["user"] !== undefined) {
    user = specs.user;
  }

  var response = await query(findWinksSentQuery, {
    api: api,
    user: user,
  }).catch((err) => {
    // No api-key was provided
    if (err instanceof TypeError) {
      throw err;
    } else if (err.graphQLErrors.length != 0) {
      throw new Error(err.graphQLErrors[0].message);
    } else if (err.networkError.length != 0) {
      throw new Error(err.networkError[0].message);
    } else if (err.clientErrors.length != 0) {
      throw new Error(err.clientErrors[0].message);
    } else {
      throw new Error("An Unknown error occurred while fetching winks");
    }
  });

  return response["data"]["findWinksSent"];
}
