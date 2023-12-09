const mongoose = require("mongoose");

// * This is the mongodb Atlas connection link
const dbConnect =
  "mongodb+srv://shehzaib:A0mc2WcJmWBPGCSe@cluster0.ybuyc.mongodb.net/?retryWrites=true&w=majority";

// * Theses are the parameters

// * This is the mongodb Atlas connection
mongoose
  .connect(dbConnect)
  .then(() => {
    console.log("MongoDB connection successfully established ");
  })
  .catch((err) => {
    console.log("MongoDB is not connected :(", err);
  });
