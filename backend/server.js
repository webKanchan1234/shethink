const app = require("./app")
const dotenv = require("dotenv")
const dbConnection = require("./config/database")
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
//dotenv--------------------------
dotenv.config({path:"./backend/config/config.env"})

//connection database-------------------
dbConnection()

const PORT = process.env.PORT || 4000


const server = app.listen(PORT,()=>{
    console.log("server is running",PORT)
})
// console.log(youtube)
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });