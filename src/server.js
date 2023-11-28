import { server } from "./lib/hapi.js";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "./controller/books.js";

server.route({
  method: "POST",
  path: "/books",
  handler: createBook,
});

server.route({
  method: "GET",
  path: "/books",
  handler: getBooks,
});

server.route({
  method: "GET",
  path: "/books/{bookId}",
  handler: getBook,
});

server.route({
  method: "PUT",
  path: "/books/{bookId}",
  handler: updateBook,
});

server.route({
  method: "DELETE",
  path: "/books/{bookId}",
  handler: deleteBook,
});

server.start().then(() => {});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise);
  console.error("Unhandled Reason is: ", reason);
  process.exit(1);
});
