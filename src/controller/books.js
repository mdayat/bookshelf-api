import { v4 as uuidv4 } from "uuid";
import { books } from "../data/books.js";

const createBook = (req, h) => {
  const payload = req.payload ?? {};

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
    finished: payload.readPage === payload.pageCount,
    reading: payload.reading,
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
  res.code(201);
  return res;
};

const updateBook = (req, h) => {
  const payload = req.payload ?? {};

  if (Object.hasOwn(payload, "name") === false) {
    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }

  if (payload.readPage > payload.pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }

  const bookId = req.params.bookId;
  const oldBookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (oldBookIndex === -1) {
    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    res.code(404);
    return res;
  }

  const oldBook = books[oldBookIndex];
  const newBook = {
    id: oldBook.id,
    name: payload.name,
    year: payload.year,
    author: payload.author,
    summary: payload.summary,
    publisher: payload.publisher,
    pageCount: payload.pageCount,
    readPage: payload.readPage,
    finished: payload.readPage === payload.pageCount,
    reading: payload.reading,
    insertedAt: oldBook.insertedAt,
    updatedAt: new Date().toISOString(),
  };

  books.splice(oldBookIndex, 1, newBook);

  const res = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  return res;
};

const getBooks = (_, h) => {
  const res = h.response({
    status: "success",
    data: {
      books: [
        ...books.map((book) => {
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };
        }),
      ],
    },
  });

  return res;
};

const getBook = (req, h) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (bookIndex === -1) {
    const res = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    res.code(404);
    return res;
  }

  const book = books[bookIndex];

  const res = h.response({
    status: "success",
    data: {
      book,
    },
  });
  return res;
};

const deleteBook = (req, h) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (bookIndex === -1) {
    const res = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    res.code(404);
    return res;
  }

  books.splice(bookIndex, 1);

  const res = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  return res;
};

export { createBook, updateBook, getBooks, getBook, deleteBook };
