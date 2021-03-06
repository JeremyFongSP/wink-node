import dotenv from "dotenv";
dotenv.config();

import findWinksSent from "../resources/findWinksSent.js";

var response = await findWinksSent({
  api: process.env.API_KEY,
  user: { username: process.env.USERNAME },
});

console.log(response);
