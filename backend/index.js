require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const router = require("./router");

// Config
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

//Use Router
app.use("/api", router);

// // Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
