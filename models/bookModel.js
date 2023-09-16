const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

  author: String,
  title: String,
  review: {
    type: Object,
    default: {} 
  }
});

module.exports = mongoose.model("Book", bookSchema); 
