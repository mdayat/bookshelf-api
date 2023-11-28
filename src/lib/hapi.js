import Hapi from "@hapi/hapi";

const server = Hapi.server({
  port: 9000,
  host: "localhost",
});

export { server };
