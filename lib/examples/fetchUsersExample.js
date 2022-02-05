import dotenv from "dotenv";
dotenv.config();

import { fetchUsers } from "../queries/WinkQueries.js";

var response = await fetchUsers({
  api: process.env.API_KEY,
});

console.log(response);
