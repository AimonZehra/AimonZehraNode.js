const app = require("./app")

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Config
dotenv.config({path: "backend/config/config.env"});

connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });



  //Unhandled Promise Rejection
  process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.msg}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
      process.exit(1);
    });
  });