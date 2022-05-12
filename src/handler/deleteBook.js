const books = require('../books');

/* ************ Deleting an Existing Book ************ */

const deleteBook = (request, h) => {
  const {id} = request.params;

  // finding the index
  const index = books.findIndex((x) => x.id === id);

  // SUCCESS
  if (index!==-1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;

  // if book not found
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = deleteBook;
