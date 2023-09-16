const Book = require("../models/bookModel");
// Add books
exports.addBooks = async(req,res)=>{

  
  try{
    const book = await  Book.create({
     author : req.body.author,
      title: req.body.title,
      review: req.body.review,
    
    
    })
    console.log(book.review);
    res.json({status: 'ok'})
  }catch(err){
    res.json({status: "fail"})
  }
}
// getallBooks
exports.getallBooks = async(req,res)=>{
  const books = await Book.find();
  const formattedData = {
    books: {},
  };

  books.forEach((book, index) => {
    formattedData.books[index + 1] = book.toObject();
  });

 
 
  res.send(formattedData)
}
// getDetailsISBN
exports.getDetailsISBN = async (req, res) => {
    try {
        const isbn = parseInt(req.params.index);
        const books = await Book.find({});
    
        if (isbn >= 1 && isbn <= books.length) {
          const book = books[isbn - 1].toObject();
          res.status(200).json({ status: "ok", book });
        } else {
          res.status(404).json({ error: "Book not found" });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  };
  // getBooksByAuthor

  exports.getBooksByAuthor = async (req, res) => {
    try {
      const authorName = req.params.authorName;
      const books = await Book.find({ author: authorName });
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for the author' });
      }
  
      res.status(200).json({ status: 'ok', books }); // Add 'status: 'ok'' here
    } catch (error) {
      console.error('Error fetching books by author:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  // getBooksByTitle

exports.getBooksByTitle = async (req, res) => {
    try {
      const titleName = req.params.title;
      const books = await Book.find({ title: titleName });
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for the title' });
      }
  
      res.status(200).json({ status: 'ok', books });
    } catch (error) {
      console.error('Error fetching books by title:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  // getBooksByReview
exports.getBooksByReview = async (req, res) => {
    try {
        const review = req.params.review;
        const books = await Book.find({ review : review });
    
        if (books.length === 0) {
          return res.status(404).json({ message: 'No books found for the review' });
        }
    
        res.status(200).json({ status: 'ok', books });
      } catch (error) {
        console.error('Error fetching books by title:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

// deletereview
  exports.deletereview = async (req, res) => {

        try {
          const isbn = req.params.isbn; // Assuming ISBN is used to identify books
          
          // Use the ISBN to find the book
          const book = await Book.findOne({ isbn });
      
          if (!book) {
            return res.status(404).json({ error: "Book not found" });
          }
      
          // Remove the book
          await book.remove();
      
          res.json({ status: `The Review for the book with ISBN ${isbn} has been deleted` });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
  
      // reviewadded

  exports.reviewadded = async (req, res) => {
    try {
      const isbn = req.params.isbn; // Assuming ISBN is used to identify books
  
      // Use the ISBN to find the book
      const book = await Book.findOne({ isbn });
  
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      // Update the review field in the book document
      book.review = req.body.review; // Assuming the review data is sent in the request body
  
      // Save the updated book
      await book.save();
  
      res.send({ status: `The Review For the book with ISBN ${isbn} has been added/updated` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "fail" });
    }
  };
  