const books = require('../books');


/* ************ Getting All Books ************ */

const getAllBooks = (request, h) => {
  const {reading, finished, name} = request.query;
  // if 'books' has no item
  if (books.length==0) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    });
    response.code(200);
    return response;

  // if 'books' has any item
  } else {
    let readingBookList = [];

    const isReading = () => {
      if (reading==0) {
        const list = books.filter((x) => x.reading === false);
        return list;
      } else if (reading==1) {
        const list = books.filter((x) => x.reading === true);
        return list;
      }
    };
    const isFinished = () => {
      if (finished==0) {
        const list = books.filter((x) => x.finished === false);
        return list;
      } else if (finished==1) {
        const list = books.filter((x) => x.finished === true);
        return list;
      }
    };
    const whichNameIs = () => {
      const search = new RegExp(name, 'i');
      const list = books.filter((x) => x.name.search(search)!=-1);
      return list;
    };

    // filtering whether book(s) are read or not
    if (reading) {
      readingBookList = isReading();
    // filtering whether book(s) are finished or not
    } else if (finished) {
      readingBookList = isFinished();
    // filtering book(s) by its name
    } else if (name) {
      readingBookList = whichNameIs();
    } else {
      readingBookList = books;
    }

    const bookList = readingBookList.map((val) => {
      const {id, name, publisher} = val;
      return {id, name, publisher};
    });


    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }
};

module.exports = getAllBooks;
