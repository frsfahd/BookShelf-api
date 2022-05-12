const addBook = require('./handler/addBook');
const getAllBooks = require('./handler/getAllBooks');
const getDetailBook = require('./handler/getDetailBook');
const editBook = require('./handler/editBook');
const deleteBook = require('./handler/deleteBook');


const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getDetailBook,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
  },
];


module.exports = routes;
