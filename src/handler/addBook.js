const {nanoid} = require('nanoid');
const books = require('../books');

/* ************ Adding New Book ************ */

const addBook = (request, h) => {
  const {name=null, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const id = nanoid(8);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  // new object book
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };


  // if 'name' unfilled
  if (name===null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;

    // if 'readPage' value bigger than 'pageCount' value
  } else if (readPage>pageCount) {
    const response = h.response({
      status: 'fail',
      message:
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // storing new book to the array
  books.push(newBook);
  // checking success
  const isSuccess = books.filter((book) => book.id === id).length > 0;


  // SUCCESS
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        'bookId': newBook.id,
      },
    });
    response.code(201);
    return response;

    // generic error
  } else {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};


module.exports = addBook;
