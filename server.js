require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const router = require("./server/routes");

/** Instantiate Server */
const app = express();

/** Load routes */
app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

/** Setup Server Routes */
app.use(router);

const PORT = process.env.PORT || 4040;

/** Start Http Server */
app.listen(PORT, (res, err) => {
  if (err) {
    console.log(`could not start server`, err);
  } else {
    console.log(`server started on port ${PORT}`);
  }
});

module.exports = app;
