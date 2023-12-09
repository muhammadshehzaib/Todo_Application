const express = require("express");
const cors = require("cors");
const app = express();
require("./db/database");
const notesRouter = require("./routers/routes");

// * Connecting To Port
const port = 4000;
app.use(cors());

// * Automatically parse incoming JSON to an object so we access it in our request handlers
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Set CORS headers manually
// Add middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(notesRouter);

// * listening To Port
app.listen(port, () => {
  console.log(`This is the ${port} active port! Wait for DB Connection...`);
});
