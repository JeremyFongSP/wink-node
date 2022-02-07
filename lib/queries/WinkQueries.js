import { winkQuery } from "../utils/WinkClientRequest.js";
import * as queryString from "./GraphQLStrings.js";

export var getMyUsers = async function (specs) {
  var response = await winkQuery(queryString.fetchUsersQuery, {
    api: specs.api,
  });

  return response["data"]["fetchUsers"];
};
