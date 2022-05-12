const books = require('../books');

/* ************ Editing an Existing Book ************ */

const editBook = (request, h) => {
  const {id} = request.params;
  const {name=null, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const finished = readPage === pageCount;

  // finding index of book based on 'id' params
  const index = books.findIndex((x) => x.id === id);

  // if 'name' unfilled
  if (name===null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;

    // if 'readPage' value bigger than 'pageCount' value
  } else if (readPage>pageCount) {
    const response = h.response({
      status: 'fail',
      message:
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;

    // if no book match to 'id' params
  } else if (index===-1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;

    // SUCCESS
  } else {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
};

module.exports = editBook;
