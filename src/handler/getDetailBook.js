const books = require('../books');

/* ************ Getting Book by ID ************ */

const getDetailBook = (request, h) => {
  const {id} = request.params;

  // matching 'id' from request with stored book
  const book = books.filter((x) => x.id === id)[0];

  // if 'book' found
  if (book!==undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: book,
      },
    });
    response.code(200);
    return response;

  // if 'book' not found
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = getDetailBook;
