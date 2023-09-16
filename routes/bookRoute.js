const express = require("express");

const bookController = require('../controllers/bookController.js')
const router = express.Router()

router.post('/addBook',bookController.addBooks)
router.get('/books',bookController.getallBooks)
router.get('/books/isbn/:index',bookController.getDetailsISBN)
router.delete('/book/isbn/:isbn',bookController.deletereview)
router.get('/book/author/:author', bookController.getBooksByAuthor);
router.get('/book/title/:title', bookController.getBooksByTitle);
router.get('/book/review/:review', bookController.getBooksByReview);
router.put('/book/isbn/:isbn',bookController.reviewadded)


module.exports = router