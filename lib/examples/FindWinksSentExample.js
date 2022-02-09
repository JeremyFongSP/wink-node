import dotenv from "dotenv";
dotenv.config();

import findWinksSent from "../resources/FindWinksSent.js";

var response = await findWinksSent({
  api: process.env.API_KEY,
});

console.log(response);
