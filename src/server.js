import Hapi from "@hapi/hapi";

const server = Hapi.server({
  port: 9000,
  host: "localhost",
});

server.route({
  method: "GET",
  path: "/",
  handler: () => {
    return "HELLO FROM HAPI";
  },
});

server.start().then(() => {});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise);
  console.error("Unhandled Reason is: ", reason);
  process.exit(1);
});
