import { v4 as uuidv4 } from "uuid";
import { books } from "../data/books.js";

const createBook = (req, h) => {
  const payload = req.payload;

  if (Object.hasOwn(payload, "name") === false) {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }

  if (payload.readPage > payload.pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }

  const book = {
    id: uuidv4(),
    name: payload.name,
    year: payload.year,
    author: payload.author,
    summary: payload.summary,
    publisher: payload.publisher,
    pageCount: payload.pageCount,
    readPage: payload.readPage,
    finished: false,
    reading: false,
    insertedAt: new Date().toISOString(),
    updatedAt: null,
  };

  books.push(book);

  const res = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: book.id,
    },
  });
  return res;
};

const updateBook = () => {
  return "UPDATE BOOK";
};

const getBooks = (_, h) => {
  const res = h.response({
    status: "success",
    data: {
      books,
    },
  });

  return res;
};

const getBook = () => {
  return "GET BOOK";
};

const deleteBook = () => {
  return "DELETE BOOK";
};

export { createBook, updateBook, getBooks, getBook, deleteBook };
