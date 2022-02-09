import query from "../utils/query.js";
import * as queryString from "./GraphQLStrings.js";

export var getMyUsers = async function (specs) {
  var response = await query(queryString.fetchUsersQuery, {
    api: specs.api,
  }).catch((err) => {
    if (err instanceof TypeError) {
      throw err;
    } else if (err.graphQLErrors.length != 0) {
      // console.log(`Error: ${err.graphQLErrors[0].message}`);
      throw new Error("Is it the right API key? Did you create any users?");
    } else if (err.networkError.length != 0) {
      // console.log(`Error: ${err.networkError.result.errors[0].message}`);
      throw new Error("A Network error has occurred");
    } else if (err.clientErrors.length != 0) {
      // console.log(`Error: ${err.clientErrors.result.errors[0].message}`);
      throw new Error("A Client side error occurred");
    } else {
      // console.log(`Error: unknown error occurred while fetching users`);
      throw new Error("An Unknown error occurred while fetching users");
    }
  });

  return response["data"]["fetchUsers"];
};
