require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/post.route");
const fileUpload = require("express-fileupload");
const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database is connected"))
  .catch((err) => {
    console.log(err);
  });

// app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Middleware
app.use(express.json());
app.use("/api/post", postRoute);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT} `)
);
