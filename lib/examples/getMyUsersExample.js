import dotenv from "dotenv";
dotenv.config();

import getMyUsers from "../resources/getMyUsers.js";

var response = await getMyUsers({
  api: process.env.API_KEY,
});

console.log(response);
