import dotenv from "dotenv";
dotenv.config();

import { getMyUsers } from "../queries/WinkQueries.js";

var response = await getMyUsers({
  api: process.env.API_KEY,
});

console.log(response);
