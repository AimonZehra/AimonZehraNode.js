const express = require("express");
const app = express();
const cors = require('cors');

const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const errorMiddleware = require("./middleware/error")
//Route Imports

const user = require("./routes/userRoute");
const book = require("./routes/bookRoute");
app.use("/api/v1", user);
app.use("/api/v1",book);
//middleware for errors
app.use(errorMiddleware);
module.exports = app