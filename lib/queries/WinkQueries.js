import WinkClientRequest from "./WinkClientRequest.js";
import * as queryString from "./GraphQLStrings.js";

export var fetchUsers = async function (spec) {
  var response = await WinkClientRequest(queryString.fetchUsersQuery, {
    api: spec.api,
  });

  return response["data"]["fetchUsers"];
};
