"use strict";

import Hapi from "@hapi/hapi";

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.route({
  method: "GET",
  path: "/",
  handler: (req, res) => {
    console.log(req, res);
    return "HELLO FROM HAPI";
  },
});

server.start().then(() => {
  console.log("Server running on: ", server.info.uri);
});
