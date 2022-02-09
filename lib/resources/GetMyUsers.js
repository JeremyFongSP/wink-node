import query from "../utils/query.js";
import * as queryString from "./GraphQLStrings.js";

export var getMyUsers = async function (specs) {
  var response = await query(queryString.fetchUsersQuery, {
    api: specs.api,
  }).catch((err) => {
    // No api-key was provided
    if (err instanceof TypeError) {
      throw err;
    } else if (err.graphQLErrors.length != 0) {
      throw new Error("Is it the right API key? Did you create any users?");
    } else if (err.networkError.length != 0) {
      throw new Error("A Network error has occurred");
    } else if (err.clientErrors.length != 0) {
      throw new Error("A Client side error occurred");
    } else {
      throw new Error("An Unknown error occurred while fetching users");
    }
  });

  return response["data"]["fetchUsers"];
};
